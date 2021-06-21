import { useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { FaRegThumbsUp } from 'react-icons/fa'
function LikeButton({
  likeCount,
  handleUpdate,
}: {
  likeCount: number
  handleUpdate: () => void
}): JSX.Element {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(likeCount)
  const toast = useToast()
  return (
    <button
      disabled={liked}
      onClick={() => {
        setLiked(true)
        toast({
          title: 'Liked!',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })
        handleUpdate()
        setCount(count + 1)
      }}
      className="text-gray-400 inline-flex items-center ml-auto text-sm">
      <FaRegThumbsUp color={`${liked ? 'blue' : ''}`} className="w-4 h-4 mx-2" />
      {count}
    </button>
  )
}

export default LikeButton
