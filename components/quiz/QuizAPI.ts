import { shuffleStringArray } from '../common/Util'
import QuestionBank from '../../public/data/QuestionBank.json'
import QuizData from '../../public/data/QuizData.json'
import Quiz from '../../pages/quiz'

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export enum Type {
  MCQ = 'MCQ',
  MRQ = 'MRQ',
}

export type Question = {
  question: string
  correct_answers: string[]
  incorrect_answers: string[]
  modules: string[]
  difficulty: string
  type: string
}

export type QuestionState = Question & {
  answers: string[]
}

export const fetchQuizQuestions = (quizId: string): QuestionState[] => {
  const selectedQuiz = QuizData.filter((quiz) => quiz['id'] === quizId)[0]['questions']
  return QuestionBank.filter((question) => selectedQuiz.includes(question['id'])).map((question: Question) => {
    return {
      ...question,
      answers: shuffleStringArray([...question.incorrect_answers, ...question.correct_answers]),
    }
  })
}

export const fetchQuizTitle = (quizId: string): string => {
  return QuizData.filter((quiz) => quiz['id'] === quizId)[0]['title']
}

export function getAllQuizId() {
  return QuizData.map((quiz) => {
    return {
      params: {
        quizId: quiz['id'],
      },
    }
  })
}
