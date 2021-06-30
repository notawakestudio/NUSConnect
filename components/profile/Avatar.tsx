import { useUserById } from './UserAPI'
import { Avatar as UIAvatar } from '@chakra-ui/react'
const Avatar = ({ author_id }: { author_id: string }): JSX.Element => {
  const { user, isLoading } = useUserById(author_id)
  return isLoading ? (
    <UIAvatar size="sm" />
  ) : (
    <UIAvatar size="sm" name="user" bg="white" src={user.profilePicUrl} />
  )
}

export default Avatar
