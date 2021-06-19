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
        })
        handleUpdate()
      }}
      className="text-gray-400 mr-3 inline-flex items-center ml-auto text-sm pr-3 py-1 border-r-2 border-gray-200">
      <FaRegThumbsUp color={`${liked ? 'black' : ''}`} className="w-4 h-4 mx-2" />
      {likeCount}
    </button>
  )
}

export default LikeButton
