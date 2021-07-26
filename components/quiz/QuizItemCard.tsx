import {
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tag,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaRegThumbsUp } from 'react-icons/fa'
import { timeSince } from '../common/Util'
import { Quiz } from './types'
import DisplayName from '../profile/DisplayName'
import Avatar from '../profile/Avatar'
import { updateQuiz } from './QuizAPI'
import { useCurrentModule } from '../store/module'
const QuizItemCard = ({ quiz }: { quiz: Quiz }): JSX.Element => {
  const date = timeSince(quiz.date)
  const [liked, setLiked] = useState(false)
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    state: { moduleId },
  } = useCurrentModule()
  return (
    <>
      <div
        className="shadow-lg border-t-2 m-2 border-indigo-300 h-auto flex flex-col relative justify-between"
        style={{ minWidth: '18rem' }}>
        <button
          onClick={onOpen}
          className="p-4 w-full hover:bg-gray-200 space-y-2 text-left flex flex-col justify-between flex-grow">
          <div
            className="text-gray-600 font-bold text-xl items-center dark:text-gray-100"
            data-cy="quizTitle">
            {quiz.title}
            <Badge colorScheme="green" className="text-xs ml-1">
              week {quiz.week}
            </Badge>
          </div>
          <div className="">
            {quiz.tags.map((tag) => (
              <Tag size="sm" colorScheme="blue" borderRadius="full" className="m-1" key={tag}>
                #{tag}
              </Tag>
            ))}
          </div>
        </button>
        <div className="flex flex-col text-gray-600 dark:text-gray-100">
          <div className="flex flex-row items-center space-x-2 border-t border-gray-200 p-2">
            <Avatar author_id={quiz.author} />
            <div className="flex-col">
              <div className=" font-semibold text-xs text-left">
                <DisplayName author_id={quiz.author} />
              </div>
              <div className="font-light text-xs text-left">{date} ago</div>
            </div>
            <div className="absolute right-2">
              <button
                disabled={liked}
                onClick={() => {
                  toast({
                    title: 'Liked!',
                    duration: 3000,
                    status: 'success',
                    position: 'top-right',
                  })
                  updateQuiz(moduleId, { ...quiz, up_votes: quiz.up_votes + 1 })
                  setLiked(true)
                }}
                className="flex text-xs border-l border-gray-200 items-center">
                <FaRegThumbsUp color={`${liked ? 'green' : ''}`} className="w-4 h-4 mx-2" />
                {quiz.up_votes}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader data-cy="quizPromptTitle">{quiz.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="text-center">
            <Link href={`/quiz/${quiz.id}`}>
              <Button colorScheme="green" onClick={onClose} data-cy="startQuizButton">
                Start Quiz
              </Button>
            </Link>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default QuizItemCard
