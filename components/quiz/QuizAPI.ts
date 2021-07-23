import { GrayMatterFile } from 'gray-matter'
import { nanoid } from 'nanoid'
import useSWR, { mutate } from 'swr'
import QuestionBank from '../../public/data/QuestionBank.json'
import QuizData from '../../public/data/QuizData.json'
import { getCurrentDateTime, shuffleStringArray } from '../common/Util'
import { useCurrentModule } from '../store/module'
import { Question, QuestionWithAnswersMixed, Quiz } from './types'

const API_GET_QUIZ_BY_ID = 'https://1ieznu.deta.dev/quiz/quiz/'
const API_MAKE_QUESTION = 'https://1ieznu.deta.dev/quiz/make'
const API_UPDATE_QUIZ = 'https://1ieznu.deta.dev/quiz/update'
const API_GET_ALL_QUESTION = 'https://1ieznu.deta.dev/quiz/question'
const API_SUBMIT_QUIZ = 'https://1ieznu.deta.dev/quiz/collate'
const API_GET_ALL_QUIZ = 'https://1ieznu.deta.dev/quiz/quiz'
const API_GET_QUESTION_BY_ID = 'https://1ieznu.deta.dev/quiz/question/'

const API_GET_ALL_QUESTION_BY_MODULE = 'https://1ieznu.deta.dev/quiz/question/all'
const API_GET_ALL_QUIZ_BY_MODULE = 'https://1ieznu.deta.dev/quiz/all/'

const fetcher = (URL: string) => fetch(URL).then((res) => res.json())

export const useQuestion = (
  questionId: string
): { question: Question; isLoading: boolean; isError: any } => {
  const {
    state: { moduleId },
  } = useCurrentModule()
  const { data, error } = useSWR(`${API_GET_QUESTION_BY_ID}/${moduleId}/${questionId}`, fetcher)
  return {
    question: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useAllQuestionsByModule = (): { questions: Question[]; isLoading: boolean } => {
  const {
    state: { moduleId },
  } = useCurrentModule()
  const { data, error } = useSWR(API_GET_ALL_QUESTION_BY_MODULE + moduleId, fetcher)
  return {
    questions: data,
    isLoading: !error && !data,
  }
}

export const useAllQuizzesByModule = (): { quizzes: Quiz[]; isLoading: boolean } => {
  const {
    state: { moduleId },
  } = useCurrentModule()
  const { data } = useSWR(API_GET_ALL_QUIZ_BY_MODULE + moduleId, fetcher)
  return {
    quizzes: data,
    isLoading: !data,
  }
}

export const fetchQuizById = async (quizId: string): Promise<Quiz> => {
  return fetch(API_GET_QUIZ_BY_ID + quizId).then((response) => response.json())
}

export const fetchQuizTitle = async (quizId: string): Promise<string> => {
  const quiz = await fetchQuizById(quizId)
  return quiz['title']
}

export const fetchQuestionById = async (questionId: string): Promise<Question> => {
  return fetch(API_GET_QUESTION_BY_ID + questionId).then((response) => response.json())
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
  let requestBody
  if (question['type'] === 'WRITTEN') {
    requestBody = {
      id: nanoid(),
      type: question['type'],
      modules: question['modules'],
      question: question['question'],
      correct_answers: question['answers'][0]['main'],
      incorrect_answers: '',
    }
  } else {
    const answers = classifyAnswers(question['answers'])
    requestBody = {
      id: nanoid(),
      type: question['type'],
      modules: question['modules'],
      question: question['question'],
      correct_answers: answers[0],
      incorrect_answers: answers[1],
    }
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
    date: getCurrentDateTime(),
    title: quiz['title'],
    author: quiz['author'],
    modules: quiz['modules'],
    questions: quiz['questions'],
    tags: quiz['tags'],
    week: quiz['week'],
    up_votes: 0,
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
    date: getCurrentDateTime(),
    title: json['data']['title'],
    modules: json['data']['modules'],
    questions: json['data']['questions'],
    tags: json['data']['tags'],
    week: json['data']['week'],
    up_votes: json['data']['up_votes'],
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

export const classifyAnswers = (answers: { main: string; is_correct?: boolean }[]): string[][] => {
  const correct_answers = []
  const incorrect_answers = []

  answers.forEach((value) =>
    value.is_correct ? correct_answers.push(value.main) : incorrect_answers.push(value.main)
  )
  return [correct_answers, incorrect_answers]
}

export function updateQuiz(quiz: Quiz): void {
  const requestBody: Quiz = {
    id: quiz['id'],
    date: quiz['date'],
    title: quiz['title'],
    author: quiz['author'],
    modules: quiz['modules'],
    questions: quiz['questions'],
    tags: quiz['tags'],
    week: quiz['week'],
    up_votes: quiz['up_votes'],
  }
  fetch(API_UPDATE_QUIZ, {
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
    mutate(API_GET_ALL_QUIZ)
  })
}
