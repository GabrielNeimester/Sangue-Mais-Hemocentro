import { Grid, GridItem } from "@chakra-ui/react";
import Footer from "../Footer";
import Topo from "../Topo";

interface Props{
    children: React.ReactNode
}


export default function Layout(props:Props){

    const {children} = props

    return(
        <Grid className="grid" templateColumns={'1fr'} templateRows={'auto auto 64px'} minHeight="100vh">
        <GridItem colSpan={1} rowSpan={1} >
            <Topo></Topo>
            
        </GridItem>
  
        <GridItem colSpan={1} rowSpan={1}>
            {children}
        </GridItem>
  
        <GridItem colSpan={1} rowSpan={1}>
            <Footer></Footer>
        </GridItem>
  
      </Grid>
    )
}