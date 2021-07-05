import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/client'
import { useRef, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { ImCancelCircle } from 'react-icons/im'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { renderMdToHtml, showCurrentDate } from '../common/Util'
import DisplayName from '../profile/DisplayName'
import { useUserId } from '../store/user'
import { Announcement, deleteAnnouncement } from './ModuleAPI'
import NewAnnouncement from './NewAnnouncement'

export default function AnnouncementItem({
  announcement,
}: {
  announcement: Announcement
}): JSX.Element {
  const [session] = useSession()
  const [editing, setEditing] = useState(false)

  //Alert Dialog
  const [isOpen, setIsOpen] = useState(false)
  const onClose = (): void => setIsOpen(false)
  const cancelRef = useRef()

  const toast = useToast()
  const userId = useUserId()

  return (
    <>
      <div className="shadow-md w-full border border-gray-100 bg-white dark:bg-gray-700 dark:border-gray-800 relative overflow-hidden p-2 md:p-6 mb-4 mt-2">
        {editing ? (
          <div className="my-2">
            <NewAnnouncement
              label="Edit Announcement"
              currentAnnouncement={announcement}
              setEditing={setEditing}
            />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="text-lg font-semibold text-indigo-500">{announcement.title}</div>
            <div className="text-xs font-thin">
              <span>
                <DisplayName author_id={announcement.author_id} />{' '}
              </span>
              <span>on {showCurrentDate(announcement.created_date)}</span>
            </div>
            <div
              className="py-2"
              dangerouslySetInnerHTML={{
                __html: renderMdToHtml(announcement.content),
              }}></div>
          </div>
        )}
        <>
          {session && userId === announcement.author_id ? (
            <>
              {editing ? (
                <>
                  <button
                    onClick={() => setEditing(!editing)}
                    className="text-gray-400 mr-2 inline-flex items-center text-sm">
                    <ImCancelCircle className="w-4 h-4 mr-1" />
                    <span>cancel</span>
                  </button>
                  <button
                    onClick={() => {
                      setEditing(!editing)
                      setIsOpen(true)
                    }}
                    className="text-gray-400 ml-2 inline-flex items-center text-sm">
                    <RiDeleteBin5Line className="w-4 h-4 mr-1" />
                    <span>delete announcement</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="text-gray-400 mr-2 inline-flex items-center text-sm">
                  <span>edit</span>
                  <FaEdit className="w-4 h-4 ml-1" />
                </button>
              )}
            </>
          ) : (
            ''
          )}
        </>
      </div>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Announcement
            </AlertDialogHeader>
            <AlertDialogBody>Are you sure? You cannot undo this action afterwards.</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteAnnouncement('kMvp8b48SmTiXXCl7EAkc', announcement.id)
                  toast({
                    title: 'Announcement deleted',
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                  })
                  setIsOpen(false)
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
