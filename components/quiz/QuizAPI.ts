import { getReadableDate, shuffleStringArray } from '../common/Util'
import QuestionBank from '../../public/data/QuestionBank.json'
import QuizData from '../../public/data/QuizData.json'
import { nanoid } from 'nanoid'
import { GrayMatterFile } from 'gray-matter'
import { Quiz, Question, QuestionWithAnswersMixed } from './types'

const API_GET_QUIZ_BY_ID = 'https://1ieznu.deta.dev/quiz/quiz/'
const API_MAKE_QUESTION = 'https://1ieznu.deta.dev/quiz/make'
const API_GET_ALL_QUESTION = 'https://1ieznu.deta.dev/quiz/question'
const API_SUBMIT_QUIZ = 'https://1ieznu.deta.dev/quiz/collate'
const API_GET_ALL_QUIZ = 'https://1ieznu.deta.dev/quiz/quiz'
const API_GET_QUESTION_BY_ID = 'https://1ieznu.deta.dev/quiz/question/'

export const fetchQuizById = async (quizId: string): Promise<Quiz> => {
  const quiz = await fetch(API_GET_QUIZ_BY_ID + quizId).then((response) => response.json())
  return quiz
}

export const fetchQuizTitle = async (quizId: string): Promise<string> => {
  const quiz = await fetchQuizById(quizId)
  return quiz['title']
}

export const fetchQuestionById = async (questionId: string): Promise<Quiz> => {
  const question = await fetch(API_GET_QUESTION_BY_ID + questionId).then((response) =>
    response.json()
  )
  return question
}
export const fetchQuestionText = async (questionId: string): Promise<string> => {
  const question = await fetchQuestionById(questionId)
  return question['question']
}

export const fetchQuizQuestions = async (quizId: string): Promise<QuestionWithAnswersMixed[]> => {
  const selectedQuiz = await fetchQuizById(quizId)
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
export async function getAllQuizId(): Promise<{ quizId: string }[]> {
  const quizData = await fetchAllQuizzes()
  return quizData.map((quiz) => {
    return {
      quizId: quiz['id'],
    }
  })
}

export function createQuestion(json: GrayMatterFile<any>): void {
  const requestBody = {
    id: nanoid(),
    type: json['data']['type'],
    modules: json['data']['modules'],
    question: json['content'],
    correct_answers: json['data']['correct_answers'],
    incorrect_answers: json['data']['incorrect_answers'],
  }
  fetch(API_MAKE_QUESTION, {
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
    body: JSON.stringify(requestBody), // body data type must match "Content-Type" header
  }).then((response) => {
    console.log(response)
  })
}

export function makeQuestion(question): void {
  const answers = classifyAnswers(question['answers'])

  const requestBody = {
    id: nanoid(),
    type: question['type'],
    modules: question['modules'],
    question: question['question'],
    correct_answers: answers[0],
    incorrect_answers: answers[1],
  }
  fetch(API_MAKE_QUESTION, {
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
    body: JSON.stringify(requestBody), // body data type must match "Content-Type" header
  }).then((response) => {
    console.log(response)
  })
}

export function makeQuiz(quiz): void {
  const requestBody: Quiz = {
    id: nanoid(),
    date: getReadableDate(),
    title: quiz['title'],
    author: quiz['author'],
    modules: quiz['modules'],
    questions: quiz['questions'],
    tags: quiz['tags'],
    week: quiz['week'],
  }
  fetch(API_SUBMIT_QUIZ, {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(requestBody),
  }).then((response) => {
    console.log(response)
  })
}
export async function fetchAllQuestions(): Promise<Question[]> {
  return await fetch(API_GET_ALL_QUESTION).then((response) => response.json())
}

export function createQuiz(json: GrayMatterFile<any>): void {
  const requestBody: Quiz = {
    id: nanoid(),
    author: 'Yongliang',
    date: getReadableDate(),
    title: json['data']['title'],
    modules: json['data']['modules'],
    questions: json['data']['questions'],
    tags: json['data']['tags'],
    week: json['data']['week'],
  }
  fetch(API_SUBMIT_QUIZ, {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(requestBody),
  }).then((response) => {
    console.log(response)
  })
}

export async function fetchAllQuizzes(): Promise<Quiz[]> {
  return await fetch(API_GET_ALL_QUIZ).then((response) => response.json())
}

// MOCK - for later use in test cases
export const fetchQuizQuestions_MOCK = (quizId: string): QuestionWithAnswersMixed[] => {
  const selectedQuiz = QuizData.filter((quiz) => quiz['id'] === quizId)[0]['questions']
  return QuestionBank.filter((question) => selectedQuiz.includes(question['id'])).map(
    (question: Question) => {
      return {
        ...question,
        answers: shuffleStringArray([...question.incorrect_answers, ...question.correct_answers]),
      }
    }
  )
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

export const classifyAnswers = (answers: { main: string; is_correct: boolean }[]): string[][] => {
  var correct_answers = []
  var incorrect_answers = []

  answers.forEach((value) =>
    value.is_correct ? correct_answers.push(value.main) : incorrect_answers.push(value.main)
  )
  return [correct_answers, incorrect_answers]
}
