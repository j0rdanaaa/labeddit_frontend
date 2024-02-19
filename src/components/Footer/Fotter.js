import { Flex, Image } from '@chakra-ui/react'
import React from 'react'
import bar from '../../assets/logos/bar.png'
import { FooterPage } from './Footer.style'

function Footer() {
    return (
        <FooterPage>
            <Image
                src={bar} alt="barra"
            />
        </FooterPage>
    )
}

export default Footer