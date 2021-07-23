import { IconButton } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/spinner'
import { FaExclamation } from 'react-icons/fa'
import { useAllPosts } from '../../components/forum/ForumAPI'
import TextContainer from '../common/TextContainer'

const ForumHome = (): JSX.Element => {
  const { posts, isLoading } = useAllPosts()
  return (
    <div className="hidden lg:flex p-8 min-h-screen w-full">
      <TextContainer>
        <div className="p-4 whitespace-nowrap text-center min-h-screen min-w-full">
          <div className="text-xl font-bold text-indigo-400 dark:text-indigo-400">
            Welcome to the forum
          </div>
          <div className="flex flex-row container border border-gray-400 space-y-2 rounded-lg justify-between">
            <div className="flex flex-col">
              <span className="flex flex-row p-2 content-center items-center cursor-pointer">
                <IconButton
                  colorScheme="blue"
                  aria-label="Important"
                  icon={<FaExclamation />}></IconButton>
                <div className="leading-relaxed ml-2">
                  Total number of posts: {isLoading ? <Spinner size="xl" /> : posts.length}
                </div>
              </span>
              <span className="flex flex-row p-2 content-center items-center cursor-pointer">
                <IconButton
                  colorScheme="blue"
                  aria-label="Important"
                  icon={<FaExclamation />}></IconButton>
                <div className="leading-relaxed ml-2">
                  Contribute by adding a new post or comment
                </div>
              </span>
              <span className="flex flex-row p-2 content-center items-center cursor-pointer">
                <IconButton
                  colorScheme="blue"
                  aria-label="Important"
                  icon={<FaExclamation />}></IconButton>
                <div className="leading-relaxed ml-2">
                  Post/comment accepts Markdown syntax (cheatsheet below)
                </div>
              </span>
              <span className="flex flex-row p-2 content-center items-center cursor-pointer">
                <img src="/markdown.png" alt="markdown cheatsheet"></img>
              </span>
            </div>
          </div>
        </div>
      </TextContainer>
    </div>
  )
}

export default ForumHome
