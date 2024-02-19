import {
    Button,
    Flex,
    Image,
    Input,
    Spinner,
    Stack,
    VStack
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import StatusBar from '../components/StatusBar'
import { BASE_URL } from '../constants/url'
import line from '../assets/logos/line.png'
import { GlobalContext } from '../contexts/GlobalContext'
import { useParams } from 'react-router-dom'
import CardComment from '../components/CardComment'
import CardPost from '../components/CardPost'


const CommentsPage = () => {
    const context = useContext(GlobalContext)
    const { isLoading, setIsLoading} = context

    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    
    const { postId } = useParams()

    useEffect(() => {
        if (comments.length > 0) {
            const commentString = JSON.stringify(comments)
            localStorage.setItem('comment', commentString)
        }
    }, [comments])

    useEffect(() => {
        const getSaveComment = JSON.parse(localStorage.getItem('comment'))
        if (getSaveComment !== null) {
            setComments(getSaveComment)
        }
    }, [])

    useEffect(() => {
        getPostById()
    }, [])

    const getPostById = async () => {
        try {
            setIsLoading(true)
            const config = {
                headers: {
                    Authorization: window.localStorage.getItem("labeddit-token")
                }
            }
            const response = await axios.get(`${BASE_URL}/posts/${postId}`, config)
            setPost(response.data)
            setIsLoading(false)
            console.log(response.data)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getComments()
    }, [])

    const getComments = async () => {
        try {
            setIsLoading(true)
            const config = {
                headers: {
                    Authorization: window.localStorage.getItem("labeddit-token")
                }
            }
            const response = await axios.get(`${BASE_URL}/comments/${postId}/post`, config)
            setComments(response.data)
            setIsLoading(false)
            console.log(response.data)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }


    const [formComment, setFormComment] = useState({
        content: ""
    })

    const onChangeFormComment = (event) => {
        setFormComment({ ...formComment, [event.target.name]: event.target.value })
    }

    const createComment = async () => {
        try {
            setIsLoading(true)
            const body = {
                content: formComment.content
            }
            const config = {
                headers: {
                    Authorization: window.localStorage.getItem("labeddit-token")
                }
            }
            await axios.post(
                `${BASE_URL}/comments/${postId}/post`, body, config
            )
            setIsLoading(false)
            getComments()
            setFormComment({
                content: ""
            })

        } catch (error) {
            alert(error.response.data)
            console.log(error)
            setIsLoading(false)
        }
    }
    
    const renderPosts = post.map((post) => {
        return <CardPost
            key={post.id}
            post={post}
        />
    })

    const renderComments = comments.map((comment)=>{
        return <CardComment
            key={comment.id}
            comment={comment}
            getComments={getComments}
        />
    })

    return (
        <Flex
            w="428px"
            flexDirection={'column'}
            alignItems={'center'}
            //border='1px solid #EDEDED'
        >
            <Flex
                flexDirection={'column'}>
                <StatusBar />
                <Header />
            </Flex>
            <VStack paddingTop='24px'>
                {renderPosts}
            </VStack>
            <Stack
                paddingTop='10px'
            >
                <Input
                    type="text"
                    value={formComment.content}
                    onChange={onChangeFormComment}
                    name="content"
                    autoComplete='off'
                    placeholder="Adicionar comentário"
                    w='364px'
                    h='131px'
                    fontFamily="IBM Plex Sans, sans-serif"
                    fontWeight='400'
                    fontSize='18px'
                    borderRadius='12px'
                    bg='#EDEDED'
                />
            </Stack>
            <Flex paddingTop='10px'>
                <Button
                    w='365px'
                    h='50px'
                    color='white'
                    bgGradient='linear(to-r, #FF6489, #F9B24E)'
                    borderRadius='12px'
                    fontFamily="Noto Sans, sans-serif"
                    fontWeight='700'
                    fontSize='18px'
                    colorScheme='orange'
                    onClick={createComment}
                >
                    {isLoading ? <Spinner /> : "Responder"}
                </Button>
            </Flex>
            <Image
                w="363px"
                paddingTop='16px'
                src={line}
            />
            <VStack paddingTop='36px'>
                {renderComments}
            </VStack>
        </Flex>

    )
}

export default CommentsPage