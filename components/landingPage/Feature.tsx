import { MdForum } from 'react-icons/md'
import { GrDocumentTest } from 'react-icons/gr'
import { GiSpellBook } from 'react-icons/gi'

const Feature = (): JSX.Element => {
  return (
    <section>
      <div className="containerbg-white dark:bg-gray-800">
        <div className="flex flex-wrap justify-center">
          <div className="mb-12 lg:mb-0 pb-12 lg:pb-0 border-b text-xl">
            <h2 className="mb-4 text-3xl lg:text-4xl font-bold font-heading dark:text-white">Features</h2>
            <p className="mb-8 leading-loose text-gray-500 dark:text-gray-300 ">
              Frustrated with the lack of material and information available from previous sem’s and the lack of functionality in the official learning management system LumiNUS, we set out to design
              a system where students can learn their module content in a more engaging way.
            </p>
          </div>
          <div className="">
            <ul className="space-y-12">
              <li className="flex items-center">
                <div className="px-4">
                  <MdForum size={50} />
                </div>
                <div className="px-4">
                  <h3 className="my-4 text-xl font-semibold dark:text-white">Forum</h3>
                  <p className="text-gray-500 dark:text-gray-300 leading-loose"> A forum for students to interact with one another, with live chatting, upvoting, and many other features.</p>
                </div>
              </li>
              <li className="flex items-center">
                <div className="px-4">
                  <span className="my-4 text-xl font-semibold dark:text-white">
                    <GrDocumentTest size={50} />
                  </span>
                </div>
                <div className="px-4">
                  <h3 className="my-4 text-xl font-semibold dark:text-white">Quiz</h3>
                  <p className="text-gray-500 dark:text-gray-300 leading-loose">Students and TAs can post their own quizzes and look back on past quizzes</p>
                </div>
              </li>
              <li className="flex items-center">
                <div className="px-4">
                  <span className="my-4 text-xl font-semibold dark:text-white">
                    <GiSpellBook size={50} />
                  </span>
                </div>
                <div className="px-4">
                  <h3 className="my-4 text-xl font-semibold dark:text-white">Guide</h3>
                  <p className="text-gray-500 dark:text-gray-300 leading-loose">
                    Knowledge database for students to see a collection of articles and diagrams that aid in explaining concepts taught in class.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Feature
