import { Modal, ModalContent, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import NewPost from '../forum/NewPost'
import { QuizMode } from './types'

export default function OptionsBar({
  quizMode,
  attemptedAllQuestions,
  updateTotalScore,
  questionList,
  questionId,
}: {
  quizMode: QuizMode
  attemptedAllQuestions: () => boolean
  updateTotalScore: () => void
  questionList: { label: string; value: string }
  questionId: string
}): JSX.Element {
  //Toast
  const errorToast = useToast()
  const id = 'error-toast'
  //Modal
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>
      <button
        className={`self-center bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
          !attemptedAllQuestions() ? 'hidden' : ''
        }`}
        onClick={() => {
          if (attemptedAllQuestions()) {
            updateTotalScore()
          } else {
            if (!errorToast.isActive(id)) {
              errorToast({
                id,
                title: 'Please attempt all questions!',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
              })
            }
          }
        }}>
        {quizMode === QuizMode.TAKING ? 'Submit' : 'Done'}
      </button>
      {quizMode === QuizMode.REVIEWING && (
        <button
          className="self-center bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onOpen}>
          Ask on the forum
        </button>
      )}
      <Link href="/quiz">
        <button className="self-center bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to Quiz List
        </button>
      </Link>
      {quizMode === QuizMode.REVIEWING && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <NewPost questionList={questionList} related_question_id={questionId} />
          </ModalContent>
        </Modal>
      )}
    </div>
  )
}
