import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-4 mt-8 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-lg font-black text-slate-800 tracking-tight mb-3 mt-8 first:mt-0 pb-2 border-b border-slate-100">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base font-bold text-slate-800 mb-2 mt-5">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2 mt-4">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-sm leading-relaxed text-slate-600 mb-3">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="space-y-1.5 mb-4 pl-4">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="space-y-1.5 mb-4 pl-4 list-decimal list-inside">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-sm text-slate-600 leading-relaxed flex gap-2">
      <span className="text-indigo-400 mt-1.5 shrink-0">•</span>
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-slate-800">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-slate-600">{children}</em>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes('language-');
    if (isBlock) {
      return (
        <code className="block bg-slate-950 text-emerald-400 rounded-xl p-4 overflow-x-auto font-mono text-xs leading-relaxed whitespace-pre">
          {children}
        </code>
      );
    }
    return (
      <code className="bg-slate-100 text-indigo-700 rounded px-1.5 py-0.5 font-mono text-xs">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="mb-4 rounded-xl overflow-hidden">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-indigo-200 pl-4 my-4 bg-indigo-50/50 py-2 pr-3 rounded-r-lg">
      <div className="text-sm text-indigo-800 italic leading-relaxed">{children}</div>
    </blockquote>
  ),
  hr: () => (
    <hr className="border-slate-200 my-6" />
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-600 hover:text-indigo-800 underline underline-offset-2 transition-colors"
    >
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-4 rounded-xl border border-slate-200">
      <table className="w-full text-sm border-collapse">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-slate-50 border-b border-slate-200">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-slate-100">
      {children}
    </tbody>
  ),
  tr: ({ children }) => (
    <tr className="hover:bg-slate-50/50 transition-colors">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="text-left px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2.5 text-slate-600 text-sm">
      {children}
    </td>
  ),
};

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
