import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Tooltip,
  useToast,
} from '@chakra-ui/react'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { AiOutlineArrowUp, AiOutlineEdit } from 'react-icons/ai'
import { IoIosRemoveCircleOutline } from 'react-icons/io'
import { showCurrentDate } from '../common/Util'
import { deleteQuest, Quest } from './ModuleAPI'
import NewQuest from './NewQuest'

export default function QuestItem({
  quest,
  editing: editMode,
}: {
  quest: Quest
  editing: boolean
}): JSX.Element {
  const [editing, setEditing] = useState(false)

  const handleDelete = (): void => {
    deleteQuest('kMvp8b48SmTiXXCl7EAkc', quest.id)
  }

  //Alert Dialog
  const [isOpen, setIsOpen] = useState(false)
  const onClose = (): void => setIsOpen(false)
  const cancelRef = useRef()
  const toast = useToast()

  const link = quest.link ?? '/dashboard'

  return (
    <>
      <div className="flex flex-row items-center">
        {editMode ? (
          <div className="flex">
            <Tooltip hasArrow label="Delete" bg="red.400" color="white">
              <button onClick={() => setIsOpen(true)} className="pr-1 pt-1">
                <span className="text-sm text-red-400">
                  <IoIosRemoveCircleOutline size="25" />
                </span>
              </button>
            </Tooltip>

            <Tooltip hasArrow label="edit" bg="red.400" color="white">
              <button onClick={() => setEditing(!editing)} className="pr-1 pt-1">
                <span className="text-sm text-red-400">
                  <AiOutlineEdit size="25" />
                </span>
              </button>
            </Tooltip>
          </div>
        ) : (
          ''
        )}

        {editing && editMode ? (
          <NewQuest label="edit" currentQuest={quest}></NewQuest>
        ) : (
          <Link href={link} key={quest.id}>
            <div className="shadow-md w-full bg-white dark:bg-gray-700 relative overflow-hidden p-2 my-2 cursor-pointer">
              <div className="flex flex-row justify-between">
                <div className="text-base">{quest.description}</div>
                <div className="text-sm  flex items-center">
                  <span className="text-sm text-green-400 p-1 mt-1">
                    <AiOutlineArrowUp />
                  </span>
                  <span>{quest.reward.exp} exp</span>
                </div>
              </div>
              <div className="flex flex-row justify-between text-xs text-gray-600 dark:text-gray-400">
                <div className="">Start date: {showCurrentDate(quest.start_date)}</div>
                <div className="">End date: {showCurrentDate(quest.end_date)}</div>
              </div>
            </div>
          </Link>
        )}
      </div>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Quest
            </AlertDialogHeader>
            <AlertDialogBody>Are you sure? You cannot undo this action afterwards.</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDelete()
                  toast({
                    title: 'Quest deleted',
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                  })
                  setIsOpen(false)
                  setEditing(false)
                }}
                ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
