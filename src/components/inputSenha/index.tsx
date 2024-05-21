import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import React, { ChangeEventHandler } from "react"

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
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
    )
  }