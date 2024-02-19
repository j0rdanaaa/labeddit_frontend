import axios from 'axios'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../constants/url'
import CardPost from '../components/CardPost'

const GlobalState = () => {
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const token = window.localStorage.getItem("labeddit-token")
        if (token) {
            setIsAuth(true)
        }
    }, [])

    useEffect(() => {
        if (posts.length > 0) {
            const postString = JSON.stringify(posts)
            localStorage.setItem('post', postString)
        }
    }, [posts])

    useEffect(() => {
        const getSavePost = JSON.parse(localStorage.getItem('post'))
        if (getSavePost !== null) {
            setPosts(getSavePost)
        }
    }, [])


    useEffect(() => {
        getPosts()
    }, [])

    const getPosts = async () => {
        try {
            const config = {
                headers: {
                    Authorization: window.localStorage.getItem("labeddit-token")
                }
            }
            const response = await axios.get(`${BASE_URL}/posts`, config)
            setPosts(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const renderPosts = posts.map((post) => {
        return <CardPost
            key={post.id}
            post={post}
        />
    })

    return (
        {
            isAuth,
            setIsAuth,
            isLoading,
            setIsLoading,
            posts,
            setPosts,
            getPosts,
            renderPosts
        }
    )
}

export default GlobalState