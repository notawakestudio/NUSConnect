import dynamic from 'next/dynamic'
import 'react-markdown-editor-lite/lib/index.css'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
// This function can convert File object to a datauri string
function onImageUpload(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (data) => {
      resolve(data.target.result)
    }
    reader.readAsDataURL(file)
  })
}
const mdParser = new MarkdownIt({
  highlight: function (str, lang) {
    console.log(lang)
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' + hljs.highlight(str, { language: lang, ignoreIllegals: true }).value + '</code></pre>'
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + mdParser.utils.escapeHtml(str) + '</code></pre>'
  },
})
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
})
export default function Editor(): JSX.Element {
  return <MdEditor onImageUpload={onImageUpload} style={{ height: '500px' }} renderHTML={(text) => mdParser.render(text)} />
}
