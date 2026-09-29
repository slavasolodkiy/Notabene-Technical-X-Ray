import type { ComponentMessage, HostMessage } from '../types';

/**
 * Callback function for handling component messages.
 *
 * @typeParam T - The type of data contained in the component message
 * @param message - The message object containing the component data and type
 * @public
 */

export type MessageCallback<T> = (message: ComponentMessage<T>) => void;

/**
 * Manages message event communication through MessagePorts.
 *
 * This class handles bidirectional communication between components using MessagePorts,
 * allowing subscription to specific message types and dispatching messages to registered callbacks.
 *
 * @typeParam T - The type of data contained in messages received from components
 * @typeParam O - The type of data contained in messages sent from the host
 */

export class MessageEventManager<T, O> {
  private listeners: Map<string, Set<MessageCallback<T>>> = new Map();
  private port?: MessagePort;

  constructor() {
    this.handleMessage = this.handleMessage.bind(this);
  }

  /**
   * Sets up the message port for communication.
   *
   * Initializes the MessagePort for receiving messages by setting up the message handler
   * and starting the port.
   *
   * @param port - The MessagePort instance to use for communication
   */

  setPort(port: MessagePort): void {
    if (!port) return;
    this.port?.close();
    this.port = port;
    this.port.onmessage = this.handleMessage;
    this.port.start();
  }

  /**
   * Registers a callback for a specific message type.
   *
   * When messages of the specified type are received, the callback will be executed
   * with the message data.
   *
   * @param messageType - The type of message to listen for
   * @param callback - The callback function to execute when matching messages are received

   */

  on(messageType: string, callback: MessageCallback<T>): () => void {
    if (!this.listeners.has(messageType)) {
      this.listeners.set(messageType, new Set());
    }
    this.listeners.get(messageType)!.add(callback);
    return () => this.off(messageType, callback);
  }

  /**
   * Removes a callback for a specific message type.
   *
   * If the callback is the last one registered for the message type,
   * the message type entry will be removed entirely.
   *
   * @param messageType - The type of message to remove listener from
   * @param callback - The callback function to remove
   */

  off(messageType: string, callback: MessageCallback<T>): void {
    const callbacks = this.listeners.get(messageType);
    if (callbacks) {
      callbacks.delete(callback);
      if (callbacks.size === 0) {
        this.listeners.delete(messageType);
      }
    }
  }

  /**
   * Internal message handler for processing received messages.
   *
   * Validates incoming messages and dispatches them to registered callbacks
   * based on the message type.
   *
   * @param event - The message event containing the component message
   */

  private handleMessage(event: MessageEvent<ComponentMessage<T>>): void {
    // console.log('received message', event.data);
    const message = event.data;
    if (typeof message === 'object' && message !== null && 'type' in message) {
      const messageType = message.type as string;
      const callbacks = this.listeners.get(messageType);
      if (callbacks) {
        callbacks.forEach((callback) => callback(message));
      }
    }
  }

  /**
   * Sends a message through the message port
   * @param message The host message to send
   */
  send(message: HostMessage<T, O>): void {
    if (this.port) {
      this.port.postMessage(message);
    }
  }
}
