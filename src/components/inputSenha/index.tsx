import { Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import React, { ChangeEventHandler } from "react"
import styles from './SenhaInput.module.css'

interface Props{
  onChange: ChangeEventHandler<HTMLInputElement>;
}


export default function SenhaInput({onChange}:Props) {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
  
    return (
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          background={"#FFFFFF"} placeholder='Digite sua senha'
          onChange={onChange}
        />
        <InputRightElement>
          <button className={styles.primary_button} onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </button>
        </InputRightElement>
      </InputGroup>
    )
  }