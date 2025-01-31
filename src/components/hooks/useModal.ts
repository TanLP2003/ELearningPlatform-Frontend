import { useState } from 'react'

const useModal = () => {
  const [isOpenModal, setIsOpen] = useState(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  return { isOpenModal, openModal, closeModal }
}

export default useModal
