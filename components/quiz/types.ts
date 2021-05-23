export type Quiz = {
  id: string
  title: string
  author: string
  date: string
  week: string
  tags: string[]
  questions: string[]
  modules: string[]
}

export type Question = {
  question: string
  correct_answers: string[]
  incorrect_answers: string[]
  modules: string[]
  difficulty: string
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