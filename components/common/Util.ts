import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
export const shuffleStringArray = (array: string[]): string[] => {
  return [...array].sort(() => Math.random() - 0.5)
}

export const hasSameContent = (arrayA: string[], arrayB: string[]): boolean => {
  if (arrayA.length != arrayB.length) {
    return false
  } else {
    return arrayA.filter((x) => arrayB.includes(x)).length === arrayA.length
  }
}

export const getReadableDate = (): string => {
  const date = new Date().toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return date
}

// returns string representation of Html
export const renderMdToHtml = (raw: string): string => {
  const mdParser = new MarkdownIt({
    highlight: function (str, lang) {
      console.log(lang)
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' + hljs.highlight(str, { language: lang, ignoreIllegals: true }).value + '</code></pre>'
        } catch (error) {
          console.log(error)
        }
      }

      return '<pre class="hljs"><code>' + mdParser.utils.escapeHtml(str) + '</code></pre>'
    },
  })
  return mdParser.render(raw)
}
