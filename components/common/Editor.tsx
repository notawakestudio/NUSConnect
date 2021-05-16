import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

export default function Editor(): JSX.Element {
  const [markdown, setValue] = useState('')
  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? <SyntaxHighlighter language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} /> : <code className={className} {...props} />
    },
  }
  return (
    <div className="container mx-auto text-center border ">
      <textarea placeholder="Type in your markdown here" cols={50} rows={20} onChange={(e) => setValue(e.target.value)}>
        {markdown}
      </textarea>
      <ReactMarkdown components={components} children={markdown}></ReactMarkdown>
    </div>
  )
}
