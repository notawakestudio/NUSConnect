import { IconButton } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/spinner'
import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/stat'
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
                <div className="leading-relaxed ml-2"> You have 3 unread posts</div>
              </span>
              <span className="flex flex-row p-2 content-center items-center cursor-pointer">
                <IconButton
                  colorScheme="blue"
                  aria-label="Important"
                  icon={<FaExclamation />}></IconButton>
                <div className="leading-relaxed ml-2"> Contribute by adding a new post</div>
              </span>
              <span className="flex flex-row p-2 content-center items-center cursor-pointer">
                <IconButton
                  colorScheme="blue"
                  aria-label="Important"
                  icon={<FaExclamation />}></IconButton>
                <div className="leading-relaxed ml-2"> 1 unanswered question</div>
              </span>
            </div>
            <StatGroup>
              <Stat className="text-left p-2">
                <StatLabel>Number of Posts</StatLabel>
                {isLoading ? <Spinner size="xl" /> : <StatNumber>{posts.length}</StatNumber>}
                <StatHelpText>
                  <StatArrow type="increase" />
                  100%
                </StatHelpText>
              </Stat>
            </StatGroup>
          </div>
        </div>
      </TextContainer>
    </div>
  )
}

export default ForumHome
