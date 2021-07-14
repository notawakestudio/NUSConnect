import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import SidebarBody from './SidebarBody'
import SidebarHeader from './SidebarHeader'

export default function NavigationDrawer(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <div className="flex lg:hidden z-50">
        <div className="fixed bottom-20 left-2">
          <button
            className="rounded-full bg-blue-400 p-2 h-8 w-8 content-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-blue-200"
            onClick={onOpen}>
            <AiOutlineMenu className="w-4 h-4 " />
          </button>
        </div>
        <Drawer placement={'left'} onClose={onClose} isOpen={isOpen} size={'xs'}>
          <DrawerOverlay />
          <DrawerContent className="dark:bg-gray-800">
            <DrawerHeader borderBottomWidth="1px" px={0}>
              <SidebarHeader />
            </DrawerHeader>
            <DrawerBody p={0}>
              <SidebarBody />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  )
}
