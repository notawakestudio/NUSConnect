import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/client'
import React, { useEffect, useState } from 'react'

export default function ProfileHeader() {
  const [session] = useSession()
  const [name, setName] = useState('user')
  const [imageUrl, setImageUrl] = useState('/cat.jpg')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef()

  useEffect(() => {
    if (session) {
      setName(session.user.name)
      setImageUrl(session.user.image)
    }
  }, [session])

  return (
    <>
      <div className="flex flex-row items-start gap-4 border-b border-gray p-4 w-full">
        <img src={imageUrl} className="h-28 rounded-lg" />
        <div className="h-28 w-full flex flex-col justify-between ">
          <div>
            <p className="text-gray-800 dark:text-white text-xl font-medium">{name}</p>
            <p className="text-gray-400 text-xs">@ong6</p>
          </div>
          <div className="max-w-max rounded-lg bg-blue-100 dark:bg-white p-2">
            <div className="flex flex-row space-x-3 items-center text-xs text-gray-400 dark:text-black">
              <p className="flex flex-col ">
                Total Posts
                <span className="text-black dark:text-indigo-500 font-bold">2</span>
              </p>
              <p className="flex flex-col">
                Total Replies
                <span className="text-black dark:text-indigo-500 font-bold">5</span>
              </p>
              <p className="flex flex-col">
                Total Quizzes
                <span className="text-black dark:text-indigo-500 font-bold">9</span>
              </p>
            </div>
          </div>
        </div>
        <div className="h-28 flex flex-col justify-between">
          <Button colorScheme="teal" variant="outline" onClick={onOpen}>
            edit profile
          </Button>
        </div>
      </div>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your account info</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nickname</FormLabel>
              <Input ref={initialRef} placeholder="nickname" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Other info ...</FormLabel>
              <Input placeholder="other" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
