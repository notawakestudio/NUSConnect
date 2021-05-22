import { getReadableDate, shuffleStringArray } from '../common/Util'
import QuestionBank from '../../public/data/QuestionBank.json'
import QuizData from '../../public/data/QuizData.json'
import { nanoid } from 'nanoid'
import { GrayMatterFile } from 'gray-matter'
import { QuizItem } from './QuizListItem'

const API_GET_QUIZ_BY_ID = 'https://1ieznu.deta.dev/quiz/quiz/'

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

export const fetchQuizQuestions = async (quizId: string): Promise<QuestionWithAnswersMixed[]> => {
  const selectedQuiz = await fetch(API_GET_QUIZ_BY_ID + quizId).then((response) => response.json())
  const quizQuestionIds = selectedQuiz['questions']
  const questionBank = await fetchAllQuestions()
  return questionBank
    .filter((question) => quizQuestionIds.includes(question['id']))
    .map((question: Question) => {
      return {
        ...question,
        answers: shuffleStringArray([...question.incorrect_answers, ...question.correct_answers]),
      }
    })
}

export const fetchQuizById = async (quizId: string): Promise<QuizItem> => {
  const quiz = await fetch(API_GET_QUIZ_BY_ID + quizId).then((response) => response.json())
  return quiz
}
export const fetchQuizTitle = async (quizId: string): Promise<string> => {
  const quiz = await fetchQuizById(quizId)
  return quiz['title']
}

export async function getAllQuizId() {
  const quizData = await fetchAllQuizzes()
  return quizData.map((quiz) => {
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
    modules: json['data']['modules'],
    question: json['content'],
    correct_answers: json['data']['correct_answers'],
    incorrect_answers: json['data']['incorrect_answers'],
  }
  // fetch('https://webhook.site/e7bd441b-19ce-490d-a709-a977cc703a64', {
  fetch('https://1ieznu.deta.dev/quiz/make', {
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
  }).then((response) => {
    console.log(response)
  })
}

export async function fetchAllQuestions(): Promise<Question[]> {
  return await fetch('https://1ieznu.deta.dev/quiz/question').then((response) => response.json())
}

export function createQuiz(json: GrayMatterFile<any>): void {
  const requestJson = {
    id: nanoid(),
    author: 'Yongliang',
    date: getReadableDate(),
    title: json['data']['title'],
    modules: json['data']['modules'],
    questions: json['data']['questions'],
    tags: json['data']['tags'],
    week: json['data']['week'],
  }
  fetch('https://1ieznu.deta.dev/quiz/collate', {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(requestJson),
  }).then((response) => {
    console.log(response)
  })
}

export async function fetchAllQuizzes(): Promise<QuizItem[]> {
  return await fetch('https://1ieznu.deta.dev/quiz/quiz').then((response) => response.json())
}

// MOCK - for later use in test cases
export const fetchQuizQuestions_MOCK = (quizId: string): QuestionWithAnswersMixed[] => {
  const selectedQuiz = QuizData.filter((quiz) => quiz['id'] === quizId)[0]['questions']
  return QuestionBank.filter((question) => selectedQuiz.includes(question['id'])).map((question: Question) => {
    return {
      ...question,
      answers: shuffleStringArray([...question.incorrect_answers, ...question.correct_answers]),
    }
  })
}

export function getAllQuizId_MOCK() {
  return QuizData.map((quiz) => {
    return {
      params: {
        quizId: quiz['id'],
      },
    }
  })
}

export const fetchQuizTitle_MOCK = (quizId: string): string => {
  return QuizData.filter((quiz) => quiz['id'] === quizId)[0]['title']
}
