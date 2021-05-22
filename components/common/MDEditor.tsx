import dynamic from 'next/dynamic'
import 'react-markdown-editor-lite/lib/index.css'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { useState } from 'react'
import matter from 'gray-matter'

// This function can convert File object to a datauri string
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

function MDEditor({ height, handleSubmit }: { height: string; handleSubmit: (raw: string) => void }): JSX.Element {
  const [value, setValue] = useState('')
  const handleEditorChange = ({ html, text }: { html: HTMLElement; text: string }): void => {
    // const newValue = text.replace(/\d/g, '')
    // console.log(matter(text)['content'])
    setValue(text)
  }

  return (
    <>
      <MdEditor
        id="editor"
        value={value}
        onChange={handleEditorChange}
        onImageUpload={onImageUpload}
        style={{ height: height }}
        renderHTML={(text) => {
          const content = matter(text).content
          return mdParser.render(content)
        }}
      />
      <button
        onClick={() => handleSubmit(value)}
        className="ml-1 px-4 bg-gray-600 hover:bg-blue-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
      >
        Submit
      </button>
    </>
  )
}

MDEditor.defaultProps = {
  height: '500px',
  handleSubmit: (value: string): void => {
    console.log(value)
  },
}

export default MDEditor
