import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { renderMdToHtml } from '../common/Util'
import { getPostById, Post } from '../forum/ForumAPI'
import PostListItem from '../forum/PostListItem'
import Answer from './Answer'
import { QuizMode } from './types'

type QuestionProps = {
  question: string
  answers: string[]
  updateTotalScore: () => void
  saveProgress: (answer: string[]) => void
  attemptedAllQuestions: () => boolean
  type: string
  userAnswer: string[]
  questionNumber: number
  totalQuestions: number
  quizMode: QuizMode
  correct_answers: string[]
}

const Question = ({
  question,
  answers,
  updateTotalScore,
  saveProgress,
  attemptedAllQuestions,
  type,
  userAnswer,
  questionNumber,
  totalQuestions,
  quizMode,
  correct_answers,
}: QuestionProps): JSX.Element => {
  const updateAnswer = (selectedOption: string): void => {
    if (quizMode === QuizMode.REVIEWING) {
      return
    }
    if (userAnswer.includes(selectedOption)) {
      saveProgress([...userAnswer].filter((x) => x !== selectedOption))
    } else {
      if (type === 'MCQ') {
        saveProgress([selectedOption])
      } else if (type === 'MRQ') {
        saveProgress([...userAnswer, selectedOption])
      } else {
        console.log('other question types')
      }
    }
  }

  const [post, setPost] = useState<Post>(undefined)

  useEffect(() => {
    async function getPost() {
      const post1 = await getPostById('zNibOlFniTxEu5p_2qv2C')
      setPost(post1)
    }
    getPost()
  }, [])

  return (
    <div className="font-fira">
      <p className="number">
        Question: {questionNumber} / {totalQuestions}
      </p>
      <div className="flex flex-row space-x-4 w-full">
        <div className="flex flex-col">
          <p
            className="text-left shadow-lg rounded-2xl bg-white dark:bg-gray-800 p-4 dark:text-white mb-2 prose lg:prose-lg"
            dangerouslySetInnerHTML={{ __html: renderMdToHtml(question) }}></p>
          <div className="shadow-lg rounded-2xl bg-white dark:bg-gray-800 p-4 flex justify-center flex-wrap max-w-prose self-center">
            {answers.map((answerText, index) => (
              <Answer
                key={index}
                type={type}
                answerText={answerText}
                userAnswer={userAnswer}
                updateAnswer={updateAnswer}
                correct_answers={correct_answers}
                quizMode={quizMode}
              />
            ))}
          </div>
        </div>
        {post !== undefined && quizMode === QuizMode.REVIEWING && (
          <div className="border border-indigo-300 rounded-lg h-full flex-1 font-sans">
            <div className="flex flex-col p-2">
              <p className="text-xl mb-10">Related posts</p>
              <PostListItem post={post} />
            </div>
          </div>
        )}
      </div>
      <button
        className="self-center bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          if (attemptedAllQuestions()) {
            updateTotalScore()
          } else {
            toast.error('Please attempt all questions!')
          }
        }}>
        {quizMode === QuizMode.TAKING ? 'Submit' : 'Done'}
      </button>
      {quizMode === QuizMode.REVIEWING && (
        <Link href="/forum">
          <a className="self-center bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Ask on the forum
          </a>
        </Link>
      )}
      <Link href="/quiz">
        <a className="self-center bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to Quiz List
        </a>
      </Link>
    </div>
  )
}

export default Question
