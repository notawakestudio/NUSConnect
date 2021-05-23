export default class AnswerObject {
  question: string
  qnNumOneBased: number
  answer: string[]
  isCorrect: boolean
  correctAnswers: string[]
  constructor(question: string, qnNumOneBased: number, correctAnswers: string[]) {
    this.qnNumOneBased = qnNumOneBased
    this.question = question
    this.answer = []
    this.isCorrect = false
    this.correctAnswers = correctAnswers
  }

  updateAnswer(answer: string[]): AnswerObject {
    this.answer = answer
    return this
  }
  updateCorrect(isCorrect: boolean): AnswerObject {
    this.isCorrect = isCorrect
    return this
  }
  hasAttempted(): boolean {
    return this.answer.length !== 0
  }
}
