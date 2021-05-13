import { shuffleStringArray } from '../common/Util'
import data from '../../public/data/QuizData.json'

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

export const fetchQuizQuestions = (): QuestionState[] => {
  return data.map((question: Question) => ({
    ...question,
    answers: shuffleStringArray([...question.incorrect_answers, ...question.correct_answers]),
  }))
}
