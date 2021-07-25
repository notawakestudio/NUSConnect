import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react'
import React from 'react'
import { Post } from './ForumAPI'
import PostListItem from './PostListItem'

const PostList = ({ postList }: { postList: Post[] }): JSX.Element => {
  const weeks = Array.from(new Set(postList.map((post) => post.week)))

  return (
    <div className="flex flex-col items-center justify-start bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 h-full">
      <div className="overflow-auto w-full">
        <Accordion defaultIndex={[0]} allowMultiple allowToggle>
          {weeks.map((currentWeek) => (
            <AccordionItem key={currentWeek}>
              <h2>
                <AccordionButton className="bg-indigo-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                  <Box flex="1" textAlign="left">
                    <h4 className="text-base leading-6 font-medium">{currentWeek}</h4>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel p="0px">
                <div className="flex flex-col border-t border-gray-200" data-cy="postList">
                  {postList
                    .filter((post) => post.week === currentWeek)
                    .sort((postA, postB) => (postA.edited_date < postB.edited_date ? 1 : -1))
                    .map((post) => {
                      return <PostListItem key={post.id} post={post} />
                    })}
                </div>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
        {/* <h4 className="text-lg leading-6 font-medium my-2 text-center">Week 1</h4>
        <div className="flex flex-col border-t border-gray-200" data-cy="postList">
          {postList
            .sort((postA, postB) => (postA.edited_date < postB.edited_date ? 1 : -1))
            .map((post) => {
              return <PostListItem key={post.id} post={post} />
              
            })}
        </div> */}
      </div>
    </div>
  )
}

export default PostList
