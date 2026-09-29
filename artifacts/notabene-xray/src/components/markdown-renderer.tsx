import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  securityLevel: 'strict',
  themeVariables: {
    fontFamily: 'Inter, sans-serif',
    primaryColor: '#f8fafc',
    primaryBorderColor: '#0369a1',
    lineColor: '#64748b',
    textColor: '#0f172a',
  }
});

function MermaidRenderer({ code }: { code: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const render = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
        const { svg: renderedSvg } = await mermaid.render(id, code);
        if (isMounted) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (err) {
        console.error("Mermaid error:", err);
        if (isMounted) setError(err instanceof Error ? err.message : 'Diagram error');
      }
    };
    render();
    return () => { isMounted = false; };
  }, [code]);

  if (error) {
    return (
      <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-4 rounded-md font-mono whitespace-pre-wrap overflow-auto">
        <p className="font-bold mb-2">Mermaid Syntax Error:</p>
        {error}
        <pre className="mt-4 pt-4 border-t border-destructive/20 text-xs text-destructive/80 opacity-75">{code}</pre>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="mermaid-container w-full overflow-x-auto bg-white border rounded-lg p-6 my-6 flex justify-center shadow-sm"
      dangerouslySetInnerHTML={{ __html: svg }} 
    />
  );
}

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn("prose prose-slate max-w-none prose-headings:font-medium prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-10 prose-h3:text-xl prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-table:border-collapse prose-th:border prose-th:border-border prose-th:bg-muted prose-th:p-2 prose-td:border prose-td:border-border prose-td:p-2", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre({ children }: any) {
            return <div className="bg-muted p-4 rounded-md overflow-x-auto border border-border whitespace-pre-wrap">{children}</div>;
          },
          code({ node, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            if (match && match[1] === 'mermaid') {
              return <MermaidRenderer code={String(children).replace(/\n$/, '')} />;
            }
            return (
              <code className="bg-muted/50 text-foreground px-1.5 py-0.5 rounded text-sm font-mono border border-border/50" {...props}>
                {children}
              </code>
            );
          },
          table({ children, ...props }) {
            return (
              <div className="w-full overflow-x-auto my-6 rounded-lg border border-border">
                <table className="w-full text-sm text-left m-0" {...props}>
                  {children}
                </table>
              </div>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
