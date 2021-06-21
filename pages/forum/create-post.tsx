import { GetStaticProps } from 'next'
import Head from 'next/head'
import TextContainer from '../../components/common/TextContainer'
import { renderMdToHtml } from '../../components/common/Util'
import NewPost from '../../components/forum/NewPost'
import { fetchAllQuestions } from '../../components/quiz/QuizAPI'

export default function CreatePost({
  questionList,
}: {
  questionList: { label: string; value: string }
}): JSX.Element {
  return (
    <>
      <Head>
        <title>New Post | NUS Connect</title>
        <meta name="description" content="Forum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex-grow flex-col">
        <div className="ml-4 mt-10">
          <TextContainer>
            <NewPost questionList={questionList} />
          </TextContainer>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const questions = await fetchAllQuestions()
  const questionList = questions.map((question) => {
    return { label: renderMdToHtml(question['question']), value: question['id'] }
  })
  return {
    props: {
      questionList,
    },
  }
}
