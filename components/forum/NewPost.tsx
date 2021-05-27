import React from 'react'
import TextContainer from './TextContainer'

export default function NewPost() {
  return (
    <div className="mt-10">
      <TextContainer>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <form method="POST" action="action.php">
                <div className="mb-4">
                  <label className="text-xl text-gray-600">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="border-2 border-gray-300 p-2 w-full"
                    name="title"
                    id="title"
                    value=""
                    required></input>
                </div>

                <div className="mb-4">
                  <label className="text-xl text-gray-600">Description</label>
                  <input
                    type="text"
                    className="border-2 border-gray-300 p-2 w-full"
                    name="description"
                    id="description"
                    placeholder="(Optional)"></input>
                </div>

                <div className="mb-8">
                  <label className="text-xl text-gray-600">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <textarea name="content" className="border-2 border-gray-500"></textarea>
                </div>

                <div className="flex p-1">
                  <select className="border-2 border-gray-300 border-r p-2" name="action">
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
