import React from 'react'
import TextContainer from './TextContainer'

export default function NewPost() {
  return (
    <div className="mt-10 ml-4">
      <TextContainer>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <form method="POST" action="action.php">
                <div className="mb-4">
                  <label className="text-lg text-gray-800">
                    Title *
                    <input
                      type="text"
                      className="border border-gray-300 p-2 w-full rounded-lg"
                      name="title"
                      id="title"
                      value=""
                      required></input>
                  </label>
                </div>

                <div className="mb-4">
                  <label className="text-lg text-gray-800">
                    Tags
                    <input
                      type="text"
                      className="border border-gray-300 p-2 w-full rounded-lg"
                      name="description"
                      id="description"
                      placeholder="(Optional)"></input>
                  </label>
                </div>

                {/* <div className="mb-8 flex-col">
                  <label className="text-xl text-gray-600">
                    Content *{' '}
                    <textarea name="content" className="border border-gray-500"></textarea>
                  </label>
                </div> */}

                <div className="flex-col mb-8">
                  <p className="text-xl text-gray-600">Content *</p>
                  <textarea
                    name="content"
                    className="border border-gray-500 flex min-w-full"></textarea>
                </div>

                <div className="flex">
                  <select className="border border-gray-300 border-r p-2" name="action">
                    <option>Save and Publish</option>
                    <option>Save Draft</option>
                  </select>
                  <button className="p-3 bg-blue-500 text-white hover:bg-blue-400">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </TextContainer>
      {/* <script src="https://cdn.ckeditor.com/4.16.0/standard/ckeditor.js"></script>

      <script>CKEDITOR.replace( 'content' );</script> */}
    </div>
  )
}
