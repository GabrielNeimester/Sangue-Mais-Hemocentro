import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'

import { Link } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}
import styles from './Topo.module.css'


const Links = [
  { href: '/home', texto: 'Home' },
  { href: '/cadastro', texto: 'Dados Cadastrais' },
  { href: '/contato', texto: 'Ver Agendamentos' },
  { href: '/calendario', texto: 'Gerir Calendário' },
  { href: `/formulario`, texto: 'Gerir Formulários' },
]

const NavLink = (props: Props) => {
  const { children } = props

  return (
    <Box
      as="a"
      display='flex'
      flexDirection='row'
      justifyContent='center'
      padding='8px'
      borderRadius='8px'
      fontWeight={'semibold'}
      _hover={{
        textDecoration: 'none',
        bg: '#C31515'
      }}
      href={'#'}>
      {children}
    </Box>
  )
}
import { GiHamburgerMenu } from 'react-icons/gi'

export default function Topo() {


  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <div className={styles.header}>
        <IconButton bgColor={'#E31515'} color={'#FFF4F4'}
          _hover={{
            textDecoration: 'none',
            bg: '#C31515'
          }}
          size={"lg"}
          icon={<GiHamburgerMenu />}
          aria-label={'Open Menu'}
          onClick={onOpen}
        />

        <Drawer
          isOpen={isOpen}
          placement='left'
          onClose={onClose}

        >
          <DrawerContent>

            <DrawerHeader bgColor={'#E31515'} />

            <DrawerBody bgColor={'#E31515'} color={'#FFF4F4'}>
              {Links.map((link) => (
                <Link to={link.href}>
                  <NavLink key={link.texto}>{link.texto}</NavLink>
                </Link>
              ))}
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <div className={styles.logo}>
          <h1>Sangue Mais</h1>
          <svg className={styles.logoSvg} width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 0L25.1913 21.1268H1.80866L13.5 0Z" fill="#FFF4F4" />
            <ellipse cx="13.5" cy="27.5" rx="13.5" ry="12.5" fill="#FFF4F4" />
            <path d="M12.64 30.3764V19.2884H15.736V30.3764H12.64ZM8.488 26.2964V23.3684H19.912V26.2964H8.488Z" fill="#F62424" />
          </svg>
        </div>
      </div>
    </>
  )
}