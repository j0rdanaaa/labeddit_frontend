import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from "../pages/LoginPage"
import SignupPage from "../pages/SignupPage"
import PostsPage from "../pages/PostsPage"
import CommentsPage from '../pages/CommentsPage'
import ErrorPage from "../pages/ErrorPage"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginPage/>}/>
                <Route path='/signup' element={<SignupPage/>}/>
                <Route path='/posts' element={<PostsPage/>}/>
                <Route path='/post/:postId/comments' element={<CommentsPage/>}/>
                <Route path='*' element={<ErrorPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;