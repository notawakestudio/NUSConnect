import { useUserById } from './UserAPI'
import { Skeleton } from '@chakra-ui/skeleton'

const DisplayName = ({ author_id }: { author_id: string }): JSX.Element => {
  const { user, isLoading } = useUserById(author_id)
  return isLoading ? <Skeleton height="20px" /> : <span data-cy="author">{user.displayName}</span>
}

export default DisplayName
