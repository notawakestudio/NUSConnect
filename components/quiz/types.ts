export type Quiz = {
  id: string
  title: string
  author: string
  date: number
  week: string
  tags: string[]
  questions: string[]
  modules: string[]
  up_votes: number
}

export type Question = {
  id: string
  question: string
  correct_answers: string[]
  incorrect_answers: string[]
  modules: string[]
  type: string
}

export type QuestionWithAnswersMixed = Question & {
  answers: string[]
}

export enum QuestionDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export enum QuestionType {
  MCQ = 'MCQ',
  MRQ = 'MRQ',
}

export enum QuizMode {
  STARTING = 'Starting',
  TAKING = 'Taking',
  REVIEWING = 'Reviewing',
  ENDING = 'Ending',
}
