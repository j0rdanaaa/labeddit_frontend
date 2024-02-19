import {
    Image,
    Flex,
    Text,
    useEditableControls,
    Input,
    EditablePreview,
    Editable,
    EditableInput,
    IconButton,
    ButtonGroup
  } from '@chakra-ui/react'
  import React, { useContext, useState } from 'react'
  import likeIcon from '../assets/icons/like.svg'
  import dislikeIcon from '../assets/icons/dislike.svg'
  import { goToCommentsPage } from '../routes/coordinator'
  import { ChatIcon, CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
  import { GlobalContext } from '../contexts/GlobalContext'
  import axios from 'axios'
  import { BASE_URL } from '../constants/url'
  import {  useNavigate } from 'react-router-dom'
  
  const CardPost = (props) => {
    const { post } = props
  
    const context = useContext(GlobalContext)
    const { setIsLoading, getPosts } = context
  
    const [content, setContent] = useState(post.content)
    const [postToEdit, setPostToEdit] = useState(false)
    const [like, setlike] = useState(post.likes)
    const [dislike, setDislike] = useState(post.dislikes)
  
    const navigate = useNavigate()
  
    const editPost = async () => {
      try {
        setIsLoading(true)
        const body = {
          content: content
        }
        const config = {
          headers: {
            Authorization: window.localStorage.getItem("labeddit-token")
          }
        }
        await axios.put(`${BASE_URL}/posts/${post.id}`, body, config)
        setPostToEdit(!postToEdit)
        setIsLoading(false)
        getPosts()
  
      } catch (error) {
        console.log(error)
        alert(error.response.data)
        setIsLoading(false)
      }
    }
  
    const deletePost = async () => {
      try {
        setIsLoading(true)
        const config = {
          headers: {
            Authorization: window.localStorage.getItem("labeddit-token")
          }
        }
  
        await axios.delete(`${BASE_URL}/posts/${post.id}`, config)
        setIsLoading(false)
        getPosts()
  
      } catch (error) {
        console.log(error)
        alert(error.response.data)
        setIsLoading(false)
      }
    }
  
    const likePost = async () => {
      try {
        setIsLoading(true)
        const body = {
          like: true
        }
        const config = {
          headers: {
            Authorization: window.localStorage.getItem("labeddit-token")
          }
        }
        await axios.put(`${BASE_URL}/posts/${post.id}/like`, body, config)
        if (like) {
          setlike(like + 1)
        }
  
        setIsLoading(false)
        getPosts()
  
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
  
    const dislikePost = async () => {
      try {
        setIsLoading(true)
        const body = {
          like: false
        }
        const config = {
          headers: {
            Authorization: window.localStorage.getItem("labeddit-token")
          }
        }
        await axios.put(`${BASE_URL}/posts/${post.id}/like`, body, config)
        if (!dislike) {
          setDislike(dislike + 1)
        }
  
        setIsLoading(false)
        getPosts()
  
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
  
    const EditableControls = () => {
      const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
      } = useEditableControls()
  
      return isEditing ? (
        <ButtonGroup justifyContent='center' size='sm'>
          <IconButton icon={<CheckIcon onClick={editPost} color='#6F6F6F' />} {...getSubmitButtonProps()} />
          <IconButton icon={<CloseIcon color='#6F6F6F' />} {...getCancelButtonProps()} />
        </ButtonGroup>
      ) : (
        <Flex >
          <IconButton icon={<EditIcon onClick={editPost} color='#6F6F6F' />} {...getEditButtonProps()} />
        </Flex>
      )
    }
  
    return (
      <>
        <Flex
          flexDirection='column'
          w='364px'
          maxH='200px'
          padding='9px 10px'
          gap='18px'
          bg='#FBFBFB'
          border='1px solid #E0E0E0'
          borderRadius='12px'
          fontFamily="IBM Plex Sans, sans-serif"
          fontWeight='400'>
  
  
          <Flex justifyContent='space-between'>
            <Text
              fontSize='12px'
              color='#6F6F6F'
            >
              Enviado por: {post.creator.nickname}
            </Text>
            <DeleteIcon color='red' cursor='pointer' onClick={deletePost} />
          </Flex>
  
          <Text
            fontSize='18px'
          >
            <Editable
              defaultValue={content}
              isPreviewFocusable={false}
            >
              <EditablePreview />
              { }
              <Input as={EditableInput} value={content} onChange={(e) => setContent(e.target.value)} />
              <EditableControls />
            </Editable>
          </Text>
          <Flex
            w='175px'
            h='28px'
            justifyContent='space-between'
            fontSize='10px'
          >
            <Flex
              w='98px'
              padding='4px'
              alignItems='center'
              justifyContent='space-between'
              border='1px solid #ECECEC'
              borderRadius='28px'
              fontWeight='700'
            >
              <Image cursor={'pointer'} src={likeIcon} alt='icone like' onClick={() => likePost(post.id)} />
              {post.likes}
              <Image cursor={'pointer'} src={dislikeIcon} alt='icone like' onClick={() => dislikePost(post.id)} />
            </Flex>
  
            <Flex
              w='66px'
              padding='4px'
              gap='8px'
              alignItems='center'
              justifyContent='center'
              border='1px solid #ECECEC'
              borderRadius='28px'
            >
              <ChatIcon boxSize={4} color='#6F6F6F' cursor={'pointer'} onClick={() => goToCommentsPage(navigate, post.id)} />
              {post.commentsPost}
            </Flex>
          </Flex>
  
        </Flex>
  
      </>
    )
  }
  
  export default CardPost