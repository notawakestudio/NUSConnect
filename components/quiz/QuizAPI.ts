import { nanoid } from 'nanoid'
import useSWR, { mutate } from 'swr'
import { getCurrentDateTime, shuffleStringArray } from '../common/Util'
import { useCurrentModule } from '../store/module'
import { Question, QuestionWithAnswersMixed, Quiz } from './types'

const API_MAKE_QUESTION = 'https://1ieznu.deta.dev/quiz/make'
const API_UPDATE_QUIZ = 'https://1ieznu.deta.dev/quiz/update'
const API_SUBMIT_QUIZ = 'https://1ieznu.deta.dev/quiz/collate'
const API_GET_QUESTION_BY_ID = 'https://1ieznu.deta.dev/quiz/question/'
const API_GET_ALL_QUESTION_BY_MODULE = 'https://1ieznu.deta.dev/quiz/question/all/'
const API_GET_ALL_QUIZ_BY_MODULE = 'https://1ieznu.deta.dev/quiz/all/'

const fetcher = (URL: string) => fetch(URL).then((res) => res.json())

export const useQuestion = (
  questionId: string
): { question: Question; isLoading: boolean; isError: any } => {
  const {
    state: { moduleId },
  } = useCurrentModule()
  const { data, error } = useSWR(`${API_GET_QUESTION_BY_ID}${moduleId}/${questionId}`, fetcher)
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
  // Hardcoded... I know...
  const quizData = await fetchAllQuizzes('RFfQyW-oenP9ZW5UQhTtd')
  const quizData2 = await fetchAllQuizzes('kMvp8b48SmTiXXCl7EAkc')
  const allQuizData = [...quizData, ...quizData2]
  return allQuizData.filter((quiz) => quiz.id === quizId)[0]
}

export const fetchQuizTitle = async (quizId: string): Promise<string> => {
  const quiz = await fetchQuizById(quizId)
  return quiz['title']
}

export const fetchQuizQuestions = async (quizId: string): Promise<QuestionWithAnswersMixed[]> => {
  const selectedQuiz = await fetchQuizById(quizId)
  const quizQuestionIds = selectedQuiz['questions']
  const questionBank = await fetchAllQuestions('RFfQyW-oenP9ZW5UQhTtd')
  const questionBank2 = await fetchAllQuestions('kMvp8b48SmTiXXCl7EAkc')
  return [...questionBank, ...questionBank2]
    .filter((question) => quizQuestionIds.includes(question['id']))
    .map((question: Question) => {
      return {
        ...question,
        answers: shuffleStringArray([...question.incorrect_answers, ...question.correct_answers]),
      }
    })
}
export async function getAllQuizId(): Promise<{ quizId: string }[]> {
  // Hardcoded... I know...
  const quizData = await fetchAllQuizzes('RFfQyW-oenP9ZW5UQhTtd')
  const quizData2 = await fetchAllQuizzes('kMvp8b48SmTiXXCl7EAkc')
  const allQuizData = [...quizData, ...quizData2]
  return allQuizData.map((quiz) => {
    return {
      quizId: quiz['id'],
    }
  })
}

export function makeQuestion(moduleId: string, question): void {
  const requestBody = {
    moduleId: moduleId,
    question: {
      id: question['id'] ?? nanoid(),
      type: question['type'],
      modules: question['modules'],
      question: question['question'],
    },
  }
  if (question['type'] === 'WRITTEN') {
    requestBody.question['correct_answers'] = question['answers'][0]['main']
    requestBody.question['incorrect_answers'] = ''
  } else {
    const answers = classifyAnswers(question['answers'])
    requestBody.question['correct_answers'] = answers[0]
    requestBody.question['incorrect_answers'] = answers[1]
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
  }).then(() => {
    console.log('a new question is created')
    mutate(API_GET_ALL_QUESTION_BY_MODULE + moduleId)
  })
}

export function makeQuiz(moduleId: string, quiz): void {
  const requestBody: { moduleId: string; quiz: Quiz } = {
    moduleId: moduleId,
    quiz: {
      id: nanoid(),
      date: getCurrentDateTime(),
      title: quiz['title'],
      author: quiz['author'],
      modules: quiz['modules'],
      questions: quiz['questions'],
      tags: quiz['tags'],
      week: quiz['week'],
      up_votes: 0,
    },
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
  }).then(() => {
    mutate(API_GET_ALL_QUIZ_BY_MODULE + moduleId)
  })
}

export async function fetchAllQuestions(moduleId: string): Promise<Question[]> {
  return await fetch(API_GET_ALL_QUESTION_BY_MODULE + moduleId).then((response) => response.json())
}

export async function fetchAllQuizzes(moduleId: string): Promise<Quiz[]> {
  return await fetch(API_GET_ALL_QUIZ_BY_MODULE + moduleId).then((response) => response.json())
}

export const classifyAnswers = (answers: { main: string; is_correct?: boolean }[]): string[][] => {
  const correct_answers = []
  const incorrect_answers = []

  answers.forEach((value) =>
    value.is_correct ? correct_answers.push(value.main) : incorrect_answers.push(value.main)
  )
  return [correct_answers, incorrect_answers]
}

export function updateQuiz(moduleId: string, quiz: Quiz): void {
  const requestBody: { moduleId: string; quiz: Quiz } = {
    moduleId: moduleId,
    quiz: {
      id: quiz['id'],
      date: quiz['date'],
      title: quiz['title'],
      author: quiz['author'],
      modules: quiz['modules'],
      questions: quiz['questions'],
      tags: quiz['tags'],
      week: quiz['week'],
      up_votes: quiz['up_votes'],
    },
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
  }).then(() => {
    mutate(API_GET_ALL_QUIZ_BY_MODULE + moduleId)
  })
}
