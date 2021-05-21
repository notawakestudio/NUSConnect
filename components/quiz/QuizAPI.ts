import { shuffleStringArray } from '../common/Util'
import QuestionBank from '../../public/data/QuestionBank.json'
import QuizData from '../../public/data/QuizData.json'
import Quiz from '../../pages/quiz'
import { nanoid } from 'nanoid'
import { GrayMatterFile } from 'gray-matter'

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

export type QuestionWithAnswersMixed = Question & {
  answers: string[]
}

export const fetchQuizQuestions = (quizId: string): QuestionWithAnswersMixed[] => {
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

export function createQuestion(json: GrayMatterFile<any>): void {
  const requestJson = {
    id: nanoid(),
    type: json['data']['type'],
    question: json['content'],
    correct_answers: json['data']['correct_answers'],
    incorrect_answers: json['data']['incorrect_answers'],
  }
  fetch('https://webhook.site/e7bd441b-19ce-490d-a709-a977cc703a64', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(requestJson), // body data type must match "Content-Type" header
  })
}
