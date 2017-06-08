import {
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_FAILER,

    FETCH_POST_SUCCESS,
    FETCH_POST_REQUEST,

    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FALIER
} from '../constants/actionTypes.js';

const initialstate = { isFetching: false, posts: [] }

export default (state=initialstate, action) => {
    switch(action.type) {
        case FETCH_POSTS_REQUEST:
            return { isFetching: true }
        case FETCH_POSTS_SUCCESS:
            return {
                isFetching: false,
                posts: action.payload
            }
        case FETCH_POSTS_FAILER:
            return [...state, action.error]
        case FETCH_POST_REQUEST: 
            return { isFetching: true }
        case FETCH_POST_SUCCESS:
            return {
                isFetching: false,
                posts: [action.payload]
            }
        case CREATE_POST_REQUEST:
            return { isFetching: true }
        case CREATE_POST_SUCCESS:
            return { isFetching: false }
        default:
            return state
    }
}

export const getPostById = (state, id) => {
    if (state.post.posts) {
        return state.post.posts.find(p => p.id === +id) || { title: '', content: '' }
    }
}