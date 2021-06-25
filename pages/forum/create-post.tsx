import Head from 'next/head'
import TextContainer from '../../components/common/TextContainer'
import NewPost from '../../components/forum/NewPost'

export default function CreatePost(): JSX.Element {
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
            <NewPost />
          </TextContainer>
        </div>
      </div>
    </>
  )
}

// export const getStaticProps: GetStaticProps = async () => {
//   const questions = await fetchAllQuestions()
//   const questionList = questions.map((question) => {
//     return { label: renderMdToHtml(question['question']), value: question['id'] }
//   })
//   return {
//     props: {
//       questionList,
//     },
//   }
// }
