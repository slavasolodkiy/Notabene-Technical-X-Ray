import {
  CMType,
  HMType,
  type HostMessage,
  type TransactionResponse,
  type ValidationError,
} from '../types';
import {
  type MessageCallback,
  MessageEventManager,
} from '../utils/MessageEventManager';

/**
 * An embedded Notabene component
 * @public
 */

export default class EmbeddedComponent<V, O> {
  private _url: string;
  private _value: Partial<V>;
  private _options?: O;
  private _errors: ValidationError[] = [];

  private iframe?: HTMLIFrameElement;
  private eventManager: MessageEventManager<V, O>;
  private modal?: HTMLDialogElement;
  private messageHandler?: (event: MessageEvent) => void;

  /**
   * Creates an instance of EmbeddedComponent.
   * @param url - The URL of the embedded component
   * @param value - The initial transaction value
   */

  constructor(url: string, value: Partial<V>, options?: O) {
    this._url = url;
    this._value = value;
    this._options = options;
    this.eventManager = new MessageEventManager<V, O>();
    this.on(CMType.INVALID, (message) => {
      if (message.type === CMType.INVALID) {
        this._errors = message.errors;
        this._value = message.value as V;
      }
    });
    this.on(CMType.RESIZE, (message) => {
      if (message.type === CMType.RESIZE) {
        if (this.iframe) this.iframe.style.height = `${message.height}px`;
      }
    });
  }
  /**
   * Gets the URL of the embedded component
   * @returns The URL of the embedded component
   */

  public get url(): string {
    return this._url;
  }
  /**
   * Gets the current transaction value
   * @returns The current transaction value
   */

  public get value(): Partial<V> {
    return this._value;
  }

  public get options(): O | undefined {
    return this._options;
  }

  public get errors(): ValidationError[] {
    return this._errors;
  }

  /**
   * Opens the component URL in the current window
   */

  public open() {
    document.location.href = this.url;
  }

  /**
   * Mounts the component to a parent element
   * @param parentId - The ID of the parent element
   * @throws Will throw an error if the parent element is not found
   */

  mount(parentId: string) {
    const parent = document.querySelector(parentId);
    if (!parent) throw new Error(`parentID ${parentId} not found`);
    this.embed(parent);
  }

  /**
   * Embeds the component into a parent element
   * @param parent - The parent element to embed the component into
   */
  embed(parent: Element, modal: boolean = false) {
    // console.log(this.url);
    this.removeEmbed();
    this.iframe = document.createElement('iframe');
    this.iframe.src = this.url + (!modal ? '&embedded=true' : '');
    this.iframe.allow = 'web-share; clipboard-write; hid; bluetooth;';
    this.iframe.style.width = '100%';
    this.iframe.style.height = '0px';
    this.iframe.style.border = 'none';
    this.iframe.style.overflow = 'hidden';
    this.iframe.scrolling = 'no';
    // this.iframe.setAttribute('allowtransparency', 'true');
    // this.iframe.style.backgroundColor = 'transparent';
    parent.appendChild(this.iframe);

    this.messageHandler = (event: MessageEvent) => {
      if (event.source !== this.iframe?.contentWindow) {
        return;
      }
      if (event.ports[0]) {
        this.eventManager?.setPort(event.ports[0]);
      }
    };
    window.addEventListener('message', this.messageHandler);

    this.iframe?.contentWindow?.focus();
  }

  removeEmbed() {
    if (this.messageHandler) {
      window.removeEventListener('message', this.messageHandler);
      this.messageHandler = undefined;
    }
    if (this.iframe) this.iframe.remove();
  }

  /**
   * Sends a message to the embedded component
   * @param message - The message to send
   */
  send(message: HostMessage<V, O>): void {
    this.eventManager.send(message);
  }

  /**
   * Adds an event listener for a specific message type
   * @param messageType - The type of message to listen for
   * @param callback - The callback function to execute when the message is received
   */

  on(messageType: string, callback: MessageCallback<V>): () => void {
    return this.eventManager.on(messageType, callback);
  }

  /**
   * Removes an event listener for a specific message type
   * @param messageType - The type of message to stop listening for
   * @param callback - The callback function to remove
   */

  off(messageType: string, callback: MessageCallback<V>): void {
    this.eventManager.off(messageType, callback);
  }

  /**
   * Updates the transaction value and sends an update message to the component
   * @param value - The new transaction value
   */
  update(value: Partial<V>, options?: O) {
    this._value = value;
    if (options) this._options = options;
    this.send({ type: HMType.UPDATE, value, options: this._options });
  }

  /**
   * Waits for the component to complete and returns the transaction response
   * @returns A promise that resolves with the transaction response
   */

  completion(): Promise<TransactionResponse<V>> {
    return new Promise((resolve, reject) => {
      let removeComplete: undefined | (() => void) = undefined;
      let removeCancel: undefined | (() => void) = undefined;
      let removeError: undefined | (() => void) = undefined;
      function cleanup() {
        if (removeComplete) removeComplete();
        if (removeCancel) removeCancel();
        if (removeError) removeError();
      }
      removeComplete = this.on(CMType.COMPLETE, (message) => {
        resolve((message as any).response);
        cleanup();
      });
      removeCancel = this.on(CMType.CANCEL, () => {
        reject(new Error('User cancelled'));
        cleanup();
      });
      removeError = this.on('error', (message) => {
        reject(new Error((message as any).message));
        cleanup();
      });
    });
  }

  /**
   * Opens the component in a modal dialog
   */

  async openModal(): Promise<TransactionResponse<V>> {
    if (this.modal) {
      this.closeModal();
    }
    this.modal = document.createElement('dialog');
    this.modal.style.border = 'none';
    this.modal.style.backgroundColor = 'white';
    this.modal.style.maxWidth = '100vw';
    this.modal.style.maxHeight = '100vh';
    this.modal.style.width = '600px';
    this.modal.style.height = '600px';

    document.body.appendChild(this.modal);
    this.embed(this.modal, true);
    const removeCancel = this.on(CMType.CANCEL, () => {
      this.closeModal();
    });

    const removeComplete = this.on(CMType.COMPLETE, () => {
      this.closeModal();
    });

    this.modal.showModal();
    this.modal.addEventListener('click', () => {
      // console.log('click');
      this.closeModal();
    });
    return this.completion().finally(() => {
      removeCancel();
      removeComplete();
    });
  }

  /**
   * Closes the modal dialog
   *
   */

  closeModal(): void {
    if (this.modal) {
      // console.log('closeModal');
      this.modal?.close();
      this.modal.remove();
      this.modal = undefined;
    }
  }

  /**
   * Opens the component in a popup window. This may be needed to support many self-hosted wallets
   * @returns A promise that resolves with the transaction response
   * @see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#restrictions)
   * @see [Cross-Origin-Opener-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy)
   */
  async popup(): Promise<TransactionResponse<V>> {
    const popup = window.open(
      this.url,
      '_blank',
      'popup=true,width=600,height=600',
    );
    const popupMessageHandler = (event: MessageEvent) => {
      if (event.source !== popup) {
        return;
      }
      if (event.ports[0]) {
        this.eventManager?.setPort(event.ports[0]);
      }
    };
    window.addEventListener('message', popupMessageHandler);

    const removeCancel = this.on(CMType.CANCEL, () => {
      popup?.close();
    });

    const removeComplete = this.on(CMType.COMPLETE, () => {
      popup?.close();
    });

    return this.completion().finally(() => {
      window.removeEventListener('message', popupMessageHandler);
      removeCancel();
      removeComplete();
    });
  }
}
