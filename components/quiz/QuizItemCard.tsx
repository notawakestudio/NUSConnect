import {
  Avatar,
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
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaRegThumbsUp } from 'react-icons/fa'
import { timeSince } from '../common/Util'
import { Quiz } from './types'

const QuizItem = ({ quiz }: { quiz: Quiz }): JSX.Element => {
  const date = timeSince(quiz.date)
  const [liked, setLiked] = useState(false)
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // const [upVotes, setUpVotes] = useState(currentQuiz.up_votes)

  return (
    <>
      <div className="rounded-lg shadow-lg border m-2 border-indigo-300 w-72 h-auto flex flex-col relative justify-between">
        <button
          onClick={onOpen}
          className="p-2 w-full hover:bg-gray-200 space-y-2 text-left flex flex-col justify-between flex-grow">
          <div className="text-gray-600 font-bold text-xl items-center">
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
        <div className="flex flex-col">
          <div className="flex flex-row items-center space-x-2 border-t border-gray-200 p-2">
            <Avatar size="sm" name="user" src="https://bit.ly/dan-abramov" />
            <div className="flex-col">
              <div className="text-gray-600 font-semibold text-xs text-left">{quiz.author}</div>
              <div className="text-gray-600 font-light text-xs text-left">{date} ago</div>
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
                  // setUpVotes(upVotes + 1)
                  // updatePostLikes(upVotes + 1, currentPost.id)
                  setLiked(true)
                }}
                className="text-gray-400 flex text-xs border-l border-gray-200 items-center">
                <FaRegThumbsUp color={`${liked ? 'black' : ''}`} className="w-4 h-4 mx-2" />
                10
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{quiz.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="text-center">
            <Link href={`/quiz/${quiz.id}`}>
              <Button colorScheme="blue" onClick={onClose}>
                Start Quiz
              </Button>
            </Link>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default QuizItem