import Link from 'next/link'
import { Quiz } from './types'
import { IoIosArrowForward } from 'react-icons/io'

const QuizItem = ({ quiz }: { quiz: Quiz }): JSX.Element => {
  const tags = quiz.tags

  return (
    <Link href={`/quiz/${quiz.id}`}>
      <tr className="text-gray-700 dark:text-gray-100" key={module.id}>
        <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
          {quiz.title}
        </th>
        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {quiz.date}
        </td>
        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {quiz.week}
        </td>
        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {quiz.author}
        </td>
        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <div className="flex flex-wrap justify-starts items-center mt-1">
            {tags.map((tag) => (
              <div
                key={tag}
                className="mr-1 text-xs py-1 px-2 text-gray-600 bg-blue-100 rounded-2xl">
                #{tag}
              </div>
            ))}
          </div>
        </td>
        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <button className="text-right flex justify-end">
            <IoIosArrowForward
              size={30}
              className="hover:text-gray-800 dark:hover:text-white dark:text-gray-300 text-gray-500"
            />
          </button>
        </td>
      </tr>
    </Link>
  )
}

export default QuizItem
