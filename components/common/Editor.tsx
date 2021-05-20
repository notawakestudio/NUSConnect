import dynamic from 'next/dynamic'
import 'react-markdown-editor-lite/lib/index.css'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { useState } from 'react'
import matter from 'gray-matter' // This function can convert File object to a datauri string
function onImageUpload(file): Promise<string | ArrayBuffer> {
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
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
})

export default function Editor(): JSX.Element {
  const [value, setValue] = useState('')
  const handleEditorChange = ({ html, text }: { html: HTMLElement; text: string }): void => {
    // const newValue = text.replace(/\d/g, '')
    console.log(matter(text))
    setValue(text)
  }
  return (
    <>
      <MdEditor value={value} onChange={handleEditorChange} onImageUpload={onImageUpload} style={{ height: '500px' }} renderHTML={(text) => mdParser.render(text)} />
    </>
  )
}
