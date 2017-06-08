import React from 'react';
import { Link } from 'react-router';

const renderPosts = (posts) => {
    return posts.map(post => {
            return (
                <div key={post.id} className="box is-medium spacing-top">
                    <Link to={{ pathname: `posts/${post.id}`}}>
                        <article className="media">
                            <div className="media-left">
                                <img src="http://bulma.io/images/placeholders/128x128.png" alt="Image" />
                            </div>
                            <div className="media-content">
                                <div className="content">
                                    <p>
                                        <strong>{post.title}</strong>
                                        <br />
                                       {post.content} 
                                    </p>
                                </div>
                            </div>
                            <div className="media-right">
                                <button to="/" className="delete is-medium"></button>
                            </div>
                        </article>
                    </Link>
                </div>
                
            )      
        })
}

const Posts = ({posts, isFetching}) => {
    return (
        <div>
            <div className="columns is-mobile">
                <div className="column is-half is-offset-one-quarter spacing-top">
                    <Link className="button is-info is-pulled-right" to="/posts/new">
                        Add a Post
                    </Link>
                    <h3 className="is-clearfix title is-3">Posts</h3>
                    {isFetching ? <h2>Loading...</h2> : renderPosts(posts)}
                </div>
            </div>
        </div>
    )
}


export default Posts