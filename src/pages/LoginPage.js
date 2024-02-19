import {
    Button,
    Flex,
    FormControl,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Spinner,
    Text,
    VStack
  } from '@chakra-ui/react'
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
  import React, { useContext, useEffect, useState } from 'react'
  import StatusBar from '../components/StatusBar'
  import logo from '../assets/logos/logo-page-login.png'
  import line from '../assets/logos/line.png'
  import { useNavigate } from 'react-router-dom'
  import { GlobalContext } from '../contexts/GlobalContext'
  import { goToPostsPage, goToSignupPage } from '../routes/coordinator'
  import axios from 'axios'
  import { BASE_URL } from '../constants/url'
  import Footer from '../components/Footer/Fotter'
  
  const LoginPage = () => {
    const context = useContext(GlobalContext)
    const {
      isAuth,
      setIsAuth,
      isLoading,
      setIsLoading
    } = context
  
    const navigate = useNavigate()
  
    const [showPassword, setShowPassword] = useState(false)
  
    const [form, setForm] = useState({
      email: "",
      password: ""
    })
  
    const onChangeForm = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value })
    }
  
    useEffect(() => {
      if (isAuth) {
        goToPostsPage(navigate)
      }
    })
  
    const login = async () => {
      try {
        setIsLoading(true)
        const body = {
          email: form.email,
          password: form.password
        }
        const response = await axios.post(
          `${BASE_URL}/users/login`, body
        )
  
        window.localStorage.setItem("labeddit-token", response.data.token)
        setIsLoading(false)
        setIsAuth(true)
        goToPostsPage(navigate)
  
      } catch (error) {
        alert(error.response.data)
        console.log(error)
        setIsLoading(false)
      }
    }
    return (
      <Flex
        w="428px"
        h="120vh"
        flexDirection={'column'}
        alignItems={'center'}
      >
        <Flex>
          <StatusBar />
        </Flex>
  
        <Flex
          flexDirection={'column'}
          alignItems={'center'}
          padding='50px'
        >
          <Image
            w="84px"
            h="84px"
            src={logo}
            alt='logo'
          />
          <Text
            fontFamily="IBM Plex Sans, sans-serif"
            fontSize='36px'
            fontWeight='700'
          >
            LabEddit
          </Text>
          <Text
            fontFamily="IBM Plex Sans, sans-serif"
            fontSize='16px'
            fontWeight='300'
          >
            O projeto de rede social da Labenu
          </Text>
        </Flex>
        <VStack
          spacing={-3}
          paddingTop='24px'
        >
          <FormControl
            id="email"
            w='363px'
            h='60px'
            borderColor='#D5D8DE'
            isRequired
          >
            <Input
              type="email"
              value={form.email}
              onChange={onChangeForm}
              name="email"
              autoComplete='off'
              placeholder="E-mail"
              pattern='/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/'
              title="O email deve ter o formato 'exemplo@exemplo.com'"
            />
          </FormControl>
  
          <FormControl
            id="password"
            w='363px'
            h='60px'
            borderColor='#D5D8DE'
            isRequired
          >
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={onChangeForm}
                name="password"
                autoComplete='off'
                placeholder="Senha"
                pattern='/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g'
                title="'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial"
              />
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </VStack>
        <VStack
          h='80vh'
          paddingTop='30px'
        >
          <Button
            w='365px'
            h='50px'
            color='white'
            bgGradient='linear(to-r, #FF6489, #F9B24E)'
            borderRadius='27px'
            fontFamily="Noto Sans, sans-serif"
            fontWeight='700'
            fontSize='18px'
            colorScheme='orange'
            onClick={login}
          >
            {isLoading ? <Spinner /> : "Continuar"}
          </Button>
          <Image
            w="363px"
            src={line}
          />
          <Button
            w='365px'
            h='50px'
            color='#FE7E02'
            bg='white'
            border='1px solid #FE7E02'
            borderRadius='27px'
            fontFamily="Noto Sans, sans-serif"
            fontWeight='700'
            fontSize='18px'
            colorScheme='gray'
            onClick={() => goToSignupPage(navigate)}
          >
            Crie uma conta!
          </Button>
        </VStack>
        <Footer />
      </Flex>
    )
  }
  
  export default LoginPage