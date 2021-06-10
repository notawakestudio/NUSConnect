import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/stat'
import TextContainer from '../common/TextContainer'

const ForumHome = ({ postCount }: { postCount: number }): JSX.Element => {
  return (
    <div className="hidden lg:flex self-center p-10 ">
      <TextContainer>
        <div className="p-4 flex flex-col items-center whitespace-nowrap">
          <p className="leading-relaxed mb-4"> You have 3 unread posts</p>
          <p className="leading-relaxed mb-4"> Contribute by adding a new post</p>
          <p className="leading-relaxed mb-4">
            Join the discussions to help others with their queries
          </p>
          <StatGroup>
            <Stat>
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
