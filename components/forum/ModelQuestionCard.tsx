import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { renderMdToHtml, shuffleStringArray } from '../common/Util'
import { useQuestion } from '../quiz/QuizAPI'
function ModelQuestionCard({ questionId }: { questionId: string }): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { question, isLoading } = useQuestion(questionId)
  return (
    <>
      <Button onClick={onOpen}>See Question</Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isLoading ? 'Loading' : `${question.type}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading ? null : (
              <>
                <p
                  className="text-left shadow-lg rounded-2xl bg-white dark:bg-gray-800 p-4 dark:text-white mb-2 prose lg:prose-lg"
                  dangerouslySetInnerHTML={{ __html: renderMdToHtml(question.question) }}></p>
                <div className="divide-y-4 divide-dashed">
                  {shuffleStringArray([
                    ...question.incorrect_answers,
                    ...question.correct_answers,
                  ]).map((answer) => (
                    <p
                      key={answer}
                      className="text-left prose lg:prose-lg"
                      dangerouslySetInnerHTML={{ __html: renderMdToHtml(answer) }}></p>
                  ))}
                </div>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModelQuestionCard
