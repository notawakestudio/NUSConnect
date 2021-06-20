import React, { useEffect, useState } from 'react'
import { renderMdToHtml } from '../common/Util'
import { getPostById, Post } from '../forum/ForumAPI'
import PostListItem from '../forum/PostListItem'
import Answer from './Answer'
import RelatedPosts from './RelatedPosts'
import { QuizMode } from './types'

type QuestionProps = {
  question: string
  answers: string[]
  saveProgress: (answer: string[]) => void
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
  saveProgress,
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
    async function getPost(): Promise<void> {
      const post1 = await getPostById('8jFEjf6Jd-479Ot8N0MxK')
      setPost(post1)
    }
    getPost()
  }, [])

  return (
    <div className="font-fira">
      <p className="number">
        Question: {questionNumber} / {totalQuestions}
      </p>
      <div className="flex flex-col space-y-4 w-screen p-4 sm:px-12 lg:max-w-5xl">
        <div
          className="border border-indigo-300 dark:border-indigo-500 rounded-lg shadow-md text-left px-3 text-lg font-semibold dark:bg-gray-700 flex-auto w-full dark:text-gray-200"
          dangerouslySetInnerHTML={{ __html: renderMdToHtml(question) }}></div>
        <div className="border-b-2 border-t-2 border-indigo-300 dark:border-indigo-500 rounded-lg shadow-md text-left bg-gray-100 dark:bg-gray-700 px-3 flex-auto w-full">
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
        <RelatedPosts post={post} quizMode={quizMode} />
      </div>
    </div>
  )
}

export default Question
