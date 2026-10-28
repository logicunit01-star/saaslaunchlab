import React from "react";
import Image from "next/image";
import Link from "next/link";
import { decodeHtmlEntities } from "@/lib/utils";

interface ArticleBodyProps {
  content: string;
}

function slugify(text: string): string {
  return decodeHtmlEntities(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function renderInline(rawText: string): React.ReactNode[] {
  const text = decodeHtmlEntities(rawText);
  // Regex to match inline links [text](url), bold **text**, italic *text*, code `text`
  const regex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      // Link [text](href)
      const linkText = match[2];
      const href = match[3];
      const isInternal = href.startsWith("/") || href.startsWith("#");

      if (isInternal) {
        nodes.push(
          <Link
            key={match.index}
            href={href}
            className="text-sky-600 hover:text-sky-700 underline underline-offset-3 font-medium transition-colors"
          >
            {linkText}
          </Link>
        );
      } else {
        nodes.push(
          <a
            key={match.index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 hover:text-sky-700 underline underline-offset-3 font-medium transition-colors"
          >
            {linkText}
          </a>
        );
      }
    } else if (match[4]) {
      // Bold **text**
      nodes.push(<strong key={match.index} className="font-semibold text-slate-900">{match[4]}</strong>);
    } else if (match[5]) {
      // Italic *text*
      nodes.push(<em key={match.index} className="italic text-slate-800">{match[5]}</em>);
    } else if (match[6]) {
      // Inline code `code`
      nodes.push(
        <code
          key={match.index}
          className="bg-slate-100 text-slate-900 px-1.5 py-0.5 rounded text-[0.875em] font-mono border border-slate-200"
        >
          {match[6]}
        </code>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function ArticleBody({ content }: ArticleBodyProps) {
  // Split into raw blocks by double linebreaks
  const rawBlocks = content.split(/\n\n+/);
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < rawBlocks.length; i++) {
    const block = rawBlocks[i].trim();
    if (!block) continue;

    // 1. Code Block
    if (block.startsWith("```")) {
      const firstLineEnd = block.indexOf("\n");
      const lang = block.slice(3, firstLineEnd !== -1 ? firstLineEnd : undefined).trim();
      const code = firstLineEnd !== -1 ? block.slice(firstLineEnd + 1).replace(/```$/, "").trim() : "";

      elements.push(
        <div key={i} className="my-6 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 text-slate-100">
          {lang && (
            <div className="bg-slate-900/90 px-4 py-1.5 text-[11px] font-mono text-slate-400 border-b border-slate-800 uppercase tracking-wider">
              {lang}
            </div>
          )}
          <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed">
            <code>{code}</code>
          </pre>
        </div>
      );
      continue;
    }

    // 2. Table
    if (block.includes("|") && block.includes("---")) {
      const rows = block.split("\n").filter((r) => r.trim().startsWith("|"));
      if (rows.length >= 2) {
        const headerRow = rows[0];
        const headers = headerRow
          .split("|")
          .map((c) => c.trim())
          .filter(Boolean);

        const dataRows = rows.slice(2);

        elements.push(
          <div key={i} className="my-8 overflow-x-auto rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  {headers.map((h, idx) => (
                    <th key={idx} className="px-4 py-3 text-left font-semibold text-slate-900">
                      {renderInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {dataRows.map((r, rIdx) => {
                  const cells = r
                    .split("|")
                    .map((c) => c.trim())
                    .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
                  return (
                    <tr key={rIdx} className={rIdx % 2 === 1 ? "bg-slate-50/50" : ""}>
                      {cells.map((cell, cIdx) => (
                        <td key={cIdx} className="px-4 py-3 text-slate-700">
                          {renderInline(cell)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // 3. Headings
    if (block.startsWith("#### ")) {
      const text = block.slice(5).trim();
      const id = slugify(text);
      elements.push(
        <h4 key={i} id={id} className="text-xl font-bold font-serif text-slate-900 mt-8 mb-3 scroll-mt-24">
          {renderInline(text)}
        </h4>
      );
      continue;
    }

    if (block.startsWith("### ")) {
      const text = block.slice(4).trim();
      const id = slugify(text);
      elements.push(
        <h3 key={i} id={id} className="text-2xl font-bold font-serif text-slate-950 mt-10 mb-4 scroll-mt-24">
          {renderInline(text)}
        </h3>
      );
      continue;
    }

    if (block.startsWith("## ")) {
      const text = block.slice(3).trim();
      const id = slugify(text);
      elements.push(
        <h2 key={i} id={id} className="text-3xl font-bold font-serif text-slate-950 mt-12 mb-5 pb-2 border-b border-slate-100 scroll-mt-24">
          {renderInline(text)}
        </h2>
      );
      continue;
    }

    if (block.startsWith("# ")) {
      const text = block.slice(2).trim();
      elements.push(
        <h2 key={i} className="text-3xl font-bold font-serif text-slate-950 mt-12 mb-5">
          {renderInline(text)}
        </h2>
      );
      continue;
    }

    // 4. Blockquotes
    if (block.startsWith("> ")) {
      const quoteText = block
        .split("\n")
        .map((l) => l.replace(/^>\s*/, ""))
        .join(" ");

      elements.push(
        <blockquote
          key={i}
          className="my-6 border-l-4 border-sky-500 bg-sky-50/50 p-4 rounded-r-lg text-slate-700 italic text-base leading-relaxed"
        >
          {renderInline(quoteText)}
        </blockquote>
      );
      continue;
    }

    // 5. Unordered List
    if (block.startsWith("- ")) {
      const items = block.split(/\n-\s+/).map((item) => item.replace(/^- /, "").trim());
      elements.push(
        <ul key={i} className="my-5 space-y-2 list-disc pl-6 text-slate-700">
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 6. Ordered List
    if (/^\d+\.\s+/.test(block)) {
      const items = block.split(/\n\d+\.\s+/).map((item) => item.replace(/^\d+\.\s+/, "").trim());
      elements.push(
        <ol key={i} className="my-5 space-y-2 list-decimal pl-6 text-slate-700">
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // 7. Standalone Image ![alt](src)
    const imgMatch = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      const alt = imgMatch[1];
      const src = imgMatch[2];
      elements.push(
        <figure key={i} className="my-8">
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
            />
          </div>
          {alt && (
            <figcaption className="text-center text-xs text-slate-500 mt-2 italic">
              {alt}
            </figcaption>
          )}
        </figure>
      );
      continue;
    }

    // 8. Regular paragraph
    elements.push(
      <p key={i} className="mb-6 leading-relaxed text-slate-700 text-lg">
        {renderInline(block)}
      </p>
    );
  }

  return <div className="article-content max-w-none">{elements}</div>;
}
