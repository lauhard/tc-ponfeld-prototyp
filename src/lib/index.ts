import { marked } from "marked";
import sanitizeHtml from 'sanitize-html';

// place files you want to import through the `$lib` alias in this folder.
export function renderHtml(md: string) {
  const raw = marked.parse(md, { breaks: true });
  const clean = sanitizeHtml(raw as string, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'figure', 'figcaption']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'title', 'loading', 'decoding']
    },
    transformTags: {
      img: (tagName, attribs) => ({
        tagName: 'img',
        attribs: {
          ...attribs,
          loading: 'lazy',
          decoding: 'async'
        }
      })
    }
  });
  return clean;
}