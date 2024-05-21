import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
        Button: {
            baseStyle: {
              backgroundColor: '#E31515',
              color: '#FFF4F4',
              _hover: {
                backgroundColor: '#C31515',
              },
            },
          }
      },
    
  },
});