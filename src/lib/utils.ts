export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  } catch {
    return dateString;
  }
}

export function formatISODate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

export function truncateText(text: string, maxLength: number = 160): string {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

const namedHtmlEntities: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#039;": "'",
  "&apos;": "'",
  "&hellip;": "…",
  "&mdash;": "—",
  "&ndash;": "–",
  "&bull;": "•",
  "&rsquo;": "’",
  "&lsquo;": "‘",
  "&rdquo;": "”",
  "&ldquo;": "“",
  "&nbsp;": " ",
  "&copy;": "©",
  "&reg;": "®",
  "&trade;": "™",
  "&check;": "✓",
  "&cross;": "✗"
};

export function decodeHtmlEntities(str: string): string {
  if (!str) return "";
  return str
    .replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
      try {
        const code = parseInt(hex, 16);
        return String.fromCodePoint(code);
      } catch {
        return match;
      }
    })
    .replace(/&#([0-9]+);/g, (match, dec) => {
      try {
        const code = parseInt(dec, 10);
        return String.fromCodePoint(code);
      } catch {
        return match;
      }
    })
    .replace(/&[a-zA-Z]+;/g, (match) => {
      return namedHtmlEntities[match] !== undefined ? namedHtmlEntities[match] : match;
    });
}
