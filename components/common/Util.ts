import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import matter from 'gray-matter'

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
export const renderMdToHtml = (raw: string, escapeFrontMatter = false): string => {
  const mdParser = new MarkdownIt({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
            '</code></pre>'
          )
        } catch (error) {
          console.log(error)
        }
      }

      return '<pre class="hljs"><code>' + mdParser.utils.escapeHtml(str) + '</code></pre>'
    },
  })
  if (escapeFrontMatter) {
    return mdParser.render(matter(raw).content)
  }
  return mdParser.render(raw)
}

export const getCurrentDateTime = (): number => {
  return Date.now()
}

export const showCurrentDateTime = (date: number): string => {
  return new Date(date).toLocaleString()
}

export const showCurrentDate = (date: number): string => {
  return new Date(date).toLocaleString('en-US', { dateStyle: 'short' })
}

export const getCurrentWeek = (): string => {
  return 'week 1'
}

export const timeSince = (date: any): any => {
  const currDate = getCurrentDateTime()
  var seconds = Math.floor((currDate - date) / 1000)

  var interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + ' years'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + ' months'
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + ' days'
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' hours'
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' minutes'
  }

  return Math.floor(seconds) + ' seconds'
}
