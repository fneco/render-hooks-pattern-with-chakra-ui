import {
  Button,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps as ChakraModalProps,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useDisclosure, useRenderForcibly, useInterval } from "../hooks"

interface ModalProps extends Omit<ChakraModalProps, "children"> {
  header: string
}

// Chakra UI のサンプルと同様の実装（ https://chakra-ui.com/docs/components/modal/usage#usage ）
function Modal({ header, ...rest }: ModalProps) {
  useEffect(() => {
    // アンマウント時にのみ、赤字で "unmount" と console に出力する
    return () => {
      console.log("%c" + "unmount", "color: red")
    }
  }, [])

  return (
    <ChakraModal {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div>modal body</div>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={rest.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  )
}

// render hooks パターンの実装
function useModal(modalProps: Omit<ModalProps, "isOpen" | "onClose">) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const modalFromHook = <Modal {...{ isOpen, onClose, ...modalProps }} />

  return { modalFromHook, onOpen }
}

export function ModalButton() {
  const renderForcibly = useRenderForcibly()

  // 1秒毎に強制的にレンダリングする
  useInterval(renderForcibly, 1000)

  console.log("render")

  const { modalFromHook, onOpen } = useModal({ header: "ヘッダー" })
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      {modalFromHook}
    </>
  )
}
