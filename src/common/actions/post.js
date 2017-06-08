import { push } from 'react-router-redux'
import axios from 'axios'
import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILER,

    FETCH_POST_REQUEST,
    FETCH_POST_SUCCESS,
    FETCH_POST_FAILER,

    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FALIER,

    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILER
} from '../constants/actionTypes'

import { POSTS_ENDPOINT } from '../constants/endpoints';

// Fetch Posts
export const fetchPosts = () => {
    return (dispatch) => {
        dispatch(fetchRequest())
        axios.get(POSTS_ENDPOINT)
            .then(res => res.data)
            .then(posts => {
                dispatch(fetchSuccess(posts))
            })
            .catch(err => {
                dispatch(fetchFailer(err))
            })
    }
}

function fetchRequest() {
    return {
        type: FETCH_POSTS_REQUEST
    }
}

function fetchSuccess(posts) {
    return {
        type: FETCH_POSTS_SUCCESS,
        payload: posts
    }
}

function fetchFailer(err) {
    return {
        type: FETCH_POSTS_FAILER,
        err: err
    }
}

// Create Post 

export const createPost = (values) => {
    return (dispatch) => {
        dispatch(createPostRequest())
        axios.post(POSTS_ENDPOINT,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
            }).then(res => {
                dispatch(createPostSuccess())
                dispatch(push('/'))
            }).then(err => {
                dispatch({
                    type: CREATE_POST_FALIER
                })
            })
    }    
}

function createPostRequest() {
    return {
        type: CREATE_POST_REQUEST
    }
}

function createPostSuccess() {
    return {
        type: CREATE_POST_SUCCESS
    }
}

// Fecthpost by id
export const fetchPost = ({id}) => {
    return (dispatch) => {
        dispatch({
            type: FETCH_POST_REQUEST
        })
        axios.get(`${POSTS_ENDPOINT}/${id}`)
            .then(res => res.data)
            .then(json => {
                dispatch({
                    type: FETCH_POST_SUCCESS,
                    payload: json
                })
            })
            .catch(err => {
                dispatch({
                    type: FETCH_POST_FAILER
                })
            })
    }
}

// Delete Post

export const deletePost = ({id}) => {
    return (dispatch) => {
        dispatch({
                    type: DELETE_POST_REQUEST,
                    payload: id
                })
        axios.delete(POSTS_ENDPOINT)
            .then(res => {
                dispatch({
                    type: DELETE_POST_SUCCESS
                })
                dispatch(push('/'))
            })
            .catch(err => {
                dispatch({
                    type: DELETE_POST_FAILER
                })
            })
    }
}