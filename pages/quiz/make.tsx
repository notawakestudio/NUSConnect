import Editor from '../../components/common/Editor'
import Layout from '../../components/common/Layout'
import Head from 'next/head'
import matter from 'gray-matter'
import { createQuestion } from '../../components/quiz/QuizAPI'

const defaultString =
  '---\ntype: MCQ\nmodules: \n- CS2030\n- CS2030S\ncorrect_answers: \n- "Collection of related classes and interfaces which are bundled together"\nincorrect_answers: \n- "We should declare fields as private as much as possible"\n- "We should not throw exceptions that reveal internal implementation of a class as much as possible"\n- "We should avoid using accessors and mutators (also known as getters and setters) to private fields as much as possible"\n- "We should use polymorphism so that each class is responsible for handling its own behavior as much as possible"\n- "None of the others"\n---\nquestion: "What is a package in java?" '
const handleSubmit = (value): void => {
  console.log(matter(value))
  createQuestion(matter(value))
}
export default function Maker(): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>Maker | NUS Connect</title>
        <meta name="description" content="NUS Connect" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-center text-xl py-4">Make a Question</h1>
      <Editor handleSubmit={handleSubmit} />
    </Layout>
  )
}
