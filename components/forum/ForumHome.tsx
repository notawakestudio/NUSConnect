import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/stat'
import TextContainer from '../common/TextContainer'

const ForumHome = ({ postCount }: { postCount: number }): JSX.Element => {
  return (
    <div className="hidden lg:flex p-8 min-h-screen w-full">
      <TextContainer>
        <div className="p-4 whitespace-nowrap text-center min-h-screen min-w-full">
          <div className="leading-relaxed mb-4 "> You have 3 unread posts</div>
          <div className="leading-relaxed mb-4 "> Contribute by adding a new post</div>
          <div className="leading-relaxed mb-4 ">
            Join the discussions to help others with their queries
          </div>
          <StatGroup>
            <Stat className="text-center">
              <StatLabel>Number of Posts</StatLabel>
              <StatNumber>{postCount}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                100%
              </StatHelpText>
            </Stat>
          </StatGroup>
        </div>
      </TextContainer>
    </div>
  )
}

export default ForumHome
