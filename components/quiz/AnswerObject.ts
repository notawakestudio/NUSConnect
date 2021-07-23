export default class AnswerObject {
  question: string
  qnNumOneBased: number
  answer: string[]
  isCorrect: boolean
  correctAnswers: string[]
  type: string
  constructor(question: string, qnNumOneBased: number, correctAnswers: string[], type: string) {
    this.qnNumOneBased = qnNumOneBased
    this.question = question
    this.answer = []
    this.isCorrect = false
    this.correctAnswers = correctAnswers
    this.type = type
  }

  updateAnswer(answer: string[]): AnswerObject {
    this.answer = answer
    return this
  }

  updateCorrect(isCorrect: boolean): AnswerObject {
    if (this.type === 'WRITTEN') {
      this.isCorrect = true
    } else {
      this.isCorrect = isCorrect
    }
    return this
  }

  hasAttempted(): boolean {
    return this.answer.length !== 0
  }
}
