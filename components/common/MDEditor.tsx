import dynamic from 'next/dynamic'
import 'react-markdown-editor-lite/lib/index.css'
import { useState } from 'react'
import { renderMdToHtml } from './Util'

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

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
})

function MDEditor({
  height,
  handleSubmit,
  defaultContent,
  renderHTML,
}: {
  height: string
  handleSubmit: (raw: string) => void
  defaultContent: string
  renderHTML: (raw: string, escapeFrontMatter?: boolean) => string
}): JSX.Element {
  const [value, setValue] = useState(defaultContent)
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
        renderHTML={renderHTML}
      />
      <button
        onClick={() => handleSubmit(value)}
        className="ml-1 px-4 bg-gray-600 hover:bg-blue-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
        Submit
      </button>
    </>
  )
}

MDEditor.defaultProps = {
  defaultContent: '',
  height: '500px',
  handleSubmit: (value: string): void => {
    console.log(value)
  },
  renderHTML: renderMdToHtml,
}

export default MDEditor
