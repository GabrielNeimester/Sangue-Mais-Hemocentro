
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button } from '@chakra-ui/react';
import styles from '../ModalResultado/ModalResultado.module.css'
import { ReactNode } from 'react';

interface Props {
  titulo: string
  subtitulo: string
  acaoBotao: () => void
  isOpen: boolean
  texto: string
  onClose: () => void
  icone: ReactNode

}

export default function ModalCustomizado({ titulo, subtitulo, isOpen, acaoBotao, texto, onClose, icone }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className={styles.header_modal} ><h1 className={styles.tituloModal}>{titulo}</h1>

          {icone}

        </ModalHeader>
        <ModalCloseButton />
        <ModalBody >
          <h2 className={styles.subtituloModal}>{subtitulo}</h2>
          <p className={styles.textoModal}>{texto}</p>
        </ModalBody>
        <div className={styles.footerModal}>
          <Button onClick={acaoBotao}>Continuar</Button>
        </div>

      </ModalContent>
    </Modal>
  )
}

