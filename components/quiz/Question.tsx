import React, { useEffect, useState } from 'react'
import { renderMdToHtml } from '../common/Util'
import { getAllPostsByQuestionId, Post } from '../forum/ForumAPI'
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
  questionId: string
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
  questionId,
}: QuestionProps): JSX.Element => {
  const updateAnswer = (selectedOption: string): void => {
    if (quizMode === QuizMode.REVIEWING) {
      return
    }
    if (type === 'WRITTEN') {
      saveProgress([selectedOption])
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

  const [posts, setPosts] = useState<Post[]>(undefined)

  useEffect(() => {
    async function getPost(): Promise<void> {
      const relatedPosts = await getAllPostsByQuestionId(questionId)
      setPosts(relatedPosts)
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
          className="border border-indigo-300 dark:border-indigo-500 shadow-md text-left p-4 px-8 text-lg font-semibold dark:bg-gray-700 flex-auto w-full dark:text-gray-200"
          dangerouslySetInnerHTML={{ __html: renderMdToHtml(question) }}></div>
        {type === 'WRITTEN' ? (
          <div className="shadow-md text-left bg-gray-50 dark:bg-gray-700 flex-auto w-full">
            <Answer
              key={0}
              type={type}
              answerText={answers.toString()}
              userAnswer={userAnswer}
              updateAnswer={updateAnswer}
              correct_answers={correct_answers}
              quizMode={quizMode}
            />
          </div>
        ) : (
          <div className="border-t-2 border-indigo-300 dark:border-indigo-500 shadow-md text-left bg-gray-50 dark:bg-gray-700 px-3 flex-auto w-full">
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
        )}
        {/* <div className="border-b-2 border-t-2 border-indigo-300 dark:border-indigo-500 rounded-lg shadow-md text-left bg-gray-100 dark:bg-gray-700 px-3 flex-auto w-full">
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
        </div> */}
        <div>
          <RelatedPosts posts={posts} quizMode={quizMode} />
        </div>
      </div>
    </div>
  )
}

export default Question
