import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions';

import { Posts } from '../../components';

class PostsIndex extends Component {

    static need = [
        fetchPosts
    ]

    shouldComponentUpdate(nextProps) {
        return this.props.posts !== nextProps.posts;
    }

    componentDidMount() {
        this.props.fetchPosts()
    }

    render() {
        const { isFetching, posts } = this.props

        return (
            <Posts
                posts={posts}
                isFetching={isFetching} />
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        posts: state.post.posts,
        isFetching: state.post.isFetching
    }
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);