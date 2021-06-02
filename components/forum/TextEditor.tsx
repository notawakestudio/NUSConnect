// import React, { useState, useEffect, useRef } from 'react'

// export default function TextEditor() {
//   const editorRef = useRef()
//   const [editorLoaded, setEditorLoaded] = useState(false)
//   const { CKEditor, ClassicEditor } = editorRef.current || {}

//   useEffect(() => {
//     editorRef.current = {
//       CKEditor: require('@ckeditor/ckeditor5-react'),
//       ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
//     }
//     setEditorLoaded(true)
//   }, [])

//   const editorConfiguration = {
//     // plugins: [Markdown],
//     toolbar: ['bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote'],
//   }

//   return editorLoaded ? (
//     <CKEditor
//       editor={ClassicEditor}
//       //   config={editorConfiguration}
//       data="<p>Hello from CKEditor 5!</p>"
//       onInit={(editor) => {
//         // You can store the "editor" and use when it is needed.
//         console.log('Editor is ready to use!', editor)
//       }}
//       onChange={(event, editor) => {
//         const data = editor.getData()
//         console.log({ event, editor, data })
//       }}
//     />
//   ) : (
//     <div>Editor loading</div>
//   )
// }
