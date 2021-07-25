import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { submitToUserInbox } from '../profile/UserAPI'
import { nanoid } from 'nanoid'

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

export const getCurrentWeek = (): number => {
  const startDate = 1627191607381
  const currDate = getCurrentDateTime()
  const weeklyInterval = 604800

  return Math.floor((currDate - startDate) / weeklyInterval) + 1
}

export const timeSince = (date: number): string => {
  const currDate = getCurrentDateTime()
  const seconds = Math.floor((currDate - date) / 1000)

  let interval = seconds / 63072000

  if (interval > 1) {
    return Math.floor(interval + 1) + ' years'
  }
  interval = seconds / 31536000
  if (interval > 1) {
    return Math.floor(interval) + ' year'
  }
  interval = seconds / 5184000
  if (interval > 1) {
    return Math.floor(interval + 1) + ' months'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + ' month'
  }
  interval = seconds / 172800
  if (interval > 1) {
    return Math.floor(interval + 1) + ' days'
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + ' day'
  }
  interval = seconds / 7200
  if (interval > 1) {
    return Math.floor(interval + 1) + ' hours'
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' hour'
  }
  interval = seconds / 120
  if (interval > 1) {
    return Math.floor(interval + 1) + ' minutes'
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' minute'
  }

  if (seconds > 1 || seconds === 0) {
    return Math.floor(seconds) + ' seconds'
  }
  return Math.floor(seconds) + ' second'
}

export const notifyReply = (userId: string): void => {
  const message = {
    id: nanoid(),
    content:
      '<h2>You Replied!</h2><p>Thank you for being active in the forum and help others learn!</p>',
    created_date: getCurrentDateTime(),
    read: false,
    type: 'CS2030/S',
  }
  submitToUserInbox(userId, message)
}

export const notifyNewPost = (userId: string): void => {
  const message = {
    id: nanoid(),
    content:
      '<h2>You Posted!</h2><p>Thank you for being active in the forum and help others learn!</p>',
    created_date: getCurrentDateTime(),
    read: false,
    type: 'CS2030/S',
  }
  submitToUserInbox(userId, message)
}
