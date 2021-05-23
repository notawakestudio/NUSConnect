import MDEditor from '../../components/common/MDEditor'
import Layout from '../../components/common/Layout'
import Head from 'next/head'
import matter from 'gray-matter'
import { createQuiz } from '../../components/quiz/QuizAPI'

const defaultQuizFormat =
  '---\ntitle: CS2030 Quiz 1\nmodules: \n- "CS2030"\n- "CS2030S"\nweek: 1\ntags: \n- "OOP"\n- "intro"\nquestions: \n- "mtCHNvypLt4TKizuqmP6f"\n- "gf669ye6dy4ltJSkKb_tZ"\n- "SUdbM9KBpsbywHQvxpFir"\n- "YQdkspzjHcwTL3txI2Bc8e"\n---'
const handleSubmit = (value): void => {
  console.log(matter(value))
  createQuiz(matter(value))
}
export default function Maker(): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>Maker | NUS Connect</title>
        <meta name="description" content="NUS Connect" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-center text-xl py-4">Make a Quiz</h1>
      <MDEditor handleSubmit={handleSubmit} defaultContent={defaultQuizFormat} />
    </Layout>
  )
}
