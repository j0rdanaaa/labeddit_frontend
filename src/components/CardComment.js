import { ButtonGroup, Editable, EditableInput, EditablePreview, Flex, IconButton, Image, Input, Text, useEditableControls } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import likeIcon from '../assets/icons/like.svg'
import dislikeIcon from '../assets/icons/dislike.svg'
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { GlobalContext } from '../contexts/GlobalContext'
import axios from 'axios'
import { BASE_URL } from '../constants/url'

const CardComment = (props) => {
    const { comment, getComments } = props

    const context = useContext(GlobalContext)
    const { setIsLoading } = context

    const [contentComment, setContentComment] = useState(comment.content)
    const [commentToEdit, setCommentToEdit] = useState(false)
    const [like, setlike] = useState(comment.likes)
    const [dislike, setDislike] = useState(comment.dislikes)

    const editComment = async () => {
        try {
            setIsLoading(true)
            const body = {
                content: contentComment
            }
            const config = {
                headers: {
                    Authorization: window.localStorage.getItem("labeddit-token")
                }
            }
            await axios.put(`${BASE_URL}/comments/${comment.id}`, body, config)
            setCommentToEdit(!commentToEdit)
            setIsLoading(false)
            getComments()

        } catch (error) {
            console.log(error)
            alert(error.response.data)
            setIsLoading(false)
        }
    }

    const deleteComment = async () => {
        try {
            setIsLoading(true)
            const config = {
                headers: {
                    Authorization: window.localStorage.getItem("labeddit-token")
                }
            }

            await axios.delete(`${BASE_URL}/comments/${comment.id}`, config)
            setIsLoading(false)
            getComments()

        } catch (error) {
            console.log(error)
            alert(error.response.data)
            setIsLoading(false)
        }
    }

    const likeComment = async () => {
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
            await axios.put(`${BASE_URL}/comments/${comment.id}/like`, body, config)
            if (like) {
                setlike(like + 1)
            }

            setIsLoading(false)
            getComments()

        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const dislikeComment = async () => {
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
            await axios.put(`${BASE_URL}/comments/${comment.id}/like`, body, config)
            if (!dislike) {
                setDislike(dislike + 1)
            }

            setIsLoading(false)
            getComments()

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
                <IconButton icon={<CheckIcon onClick={editComment} color='#6F6F6F' />} {...getSubmitButtonProps()} />
                <IconButton icon={<CloseIcon color='#6F6F6F' />} {...getCancelButtonProps()} />
            </ButtonGroup>
        ) : (
            <Flex >
                <IconButton icon={<EditIcon onClick={editComment} color='#6F6F6F' />} {...getEditButtonProps()} />
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
                fontWeight='400'
            >
                <Flex justifyContent='space-between'>
                    <Text
                        fontSize='12px'
                        color='#6F6F6F'
                    >
                        Enviado por: {comment.creator.nickname}
                    </Text>
                    <DeleteIcon color='red' cursor='pointer' onClick={deleteComment} />
                </Flex>
                <Text
                    fontSize='18px'
                >
                    <Editable
                        defaultValue={contentComment}
                        isPreviewFocusable={false}
                    >
                        <EditablePreview />
                        { }
                        <Input as={EditableInput} value={contentComment} onChange={(e) => setContentComment(e.target.value)} />
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
                        <Image cursor={'pointer'} src={likeIcon} alt='icone like' onClick={() => likeComment(comment.id)} />
                        {comment.likes}
                        <Image cursor={'pointer'} src={dislikeIcon} alt='icone like' onClick={() => dislikeComment(comment.id)} />
                    </Flex>
                </Flex>
            </Flex>

        </>
    )
}

export default CardComment