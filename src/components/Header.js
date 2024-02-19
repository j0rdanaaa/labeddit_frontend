import { CloseButton, Flex, Image, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import logo from '../assets/logos/logo-header.png'
import { GlobalContext } from '../contexts/GlobalContext'
import { goToLoginPage, goToPostsPage } from '../routes/coordinator'

const Header = (props) => {
    const {signup} = props
    
    const context = useContext(GlobalContext)
    const {setIsAuth} = context

    const navigate = useNavigate()
    const location = useLocation()
    const { postId } = useParams()

    const logout = () => {
        window.localStorage.removeItem("labeddit-token")
        setIsAuth(false)
        goToLoginPage(navigate)
    }
    return (
        <Flex
            w="428px"
            h="50px"
            bg='#EDEDED'
            alignItems={'center'}
            justifyContent={"end"}>

            {location.pathname === '/signup' &&
                <Flex>
                    <Flex>
                        <Image
                            w="28px"
                            h="28px"
                            src={logo}
                            marginRight='114px'
                        />
                    </Flex>
                    <Flex>
                        <Text
                            fontFamily="Noto Sans, sans-serif"
                            fontWeight='600'
                            fontSize='18px'
                            color='#4088CB'
                            h='25px'
                            w='55px'
                            marginRight='30px'
                            cursor={'pointer'}
                            onClick={signup}
                        >
                            Entrar
                        </Text>
                    </Flex>
                </Flex>
            }

            {location.pathname === '/posts' &&
                <Flex>
                    <Flex>
                        <Image
                            w="28px"
                            h="28px"
                            src={logo}
                            marginRight='106px'
                        />
                    </Flex>
                    <Flex>
                        <Text
                            fontFamily="Noto Sans, sans-serif"
                            fontWeight='600'
                            fontSize='18px'
                            color='#4088CB'
                            h='25px'
                            w='63px'
                            marginRight='30px'
                            cursor={'pointer'}
                            onClick={logout}
                        >
                            Logout
                        </Text>
                    </Flex>
                </Flex>
            }

            {location.pathname === `/post/${postId}/comments` &&
                <Flex
                    w='428px'
                    h='50px'
                    padding='0px 30px'
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <Flex>
                        <CloseButton
                            w="24px"
                            h="24px"
                            color='#A3A3A3'
                            size='lg'
                            onClick={() => goToPostsPage(navigate)}
                        />
                    </Flex>
                    <Flex>
                        <Image
                            w="28px"
                            h="28px"
                            marginLeft='40px'
                            src={logo}
                        />
                    </Flex>
                    <Flex>
                        <Text
                            fontFamily="Noto Sans, sans-serif"
                            fontWeight='600'
                            fontSize='18px'
                            color='#4088CB'
                            h='25px'
                            w='63px'
                            cursor='pointer'
                            onClick={logout}
                        >
                            Logout
                        </Text>
                    </Flex>
                </Flex>
            }
        </Flex>
    )
}

export default Header