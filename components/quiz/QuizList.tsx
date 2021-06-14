import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  useDisclosure,
} from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import Search from '../common/Search'
import QuizItem from './QuizItem'
import { Quiz } from './types'

const QuizList = ({ quizzes }: { quizzes: Quiz[] }): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div className="flex flex-col items-center justify-start bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-full">
      <div className="px-2 py-4 border-b">
        <span className="flex text-lg leading-4 font-medium justify-center mb-2">All Quizzes</span>
        <div className="xs:flex justify-center space-y-2 xs:space-y-0">
          <Link href="/quiz/make-question">
            <button className="whitespace-nowrap bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-2 rounded-lg content-center justify-center">
              Contribute A Quiz
            </button>
          </Link>
          <Search />
        </div>
      </div>
      <div className="relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
        <div className="block w-full overflow-x-auto">
          <table className="items-start w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Quiz Name
                </th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                  Date
                </th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                  Week
                </th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                  Author
                </th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Tags
                </th>
                <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center"></th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz) => {
                return <QuizItem key={quiz.id} quiz={quiz} />
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {quizzes.map((quiz) => {
          return (
            <div
              className="rounded-lg shadow-lg p-8 m-2 border border-indigo-300 flex-none w-60"
              onClick={onOpen}>
              <div className="text-gray-600 font-bold text-xl">{quiz.title}</div>
              <div className="text-gray-600 font-light text-sm">
                {quiz.author} at {quiz.date}
              </div>
              <div className="">week {quiz.week}</div>
              <div className="">
                {quiz.tags.map((tag) => (
                  <Tag size="sm" colorScheme="blue" borderRadius="full" className="m-1">
                    #{tag}
                  </Tag>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Start quiz</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="text-center">
            <Button colorScheme="blue" onClick={onClose}>
              Start Quiz
            </Button>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Start Quiz
            </Button>
            <Button variant="red">Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default QuizList
