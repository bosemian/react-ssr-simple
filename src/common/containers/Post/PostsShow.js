import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchPost } from '../../actions';
import { getPostById } from '../../reducers/post';

class PostsShow extends Component {

    static needs = [
        (params) => (fetchPost(params.id))
    ]

    componentDidMount() {
        let { params: id } = this.props
        this.props.fetchPost(id)
    }

    render() {
        const { post } = this.props
        if (!post) {
            return <div>Loading...</div>
        }
        return (
            <div className="columns is-mobile">
                <div className="column is-half is-offset-one-quarter">
                    <h2 className="title is-2 is-centered">Post Show</h2>
                    <artical className="media">
                        <div className="media-left">
                            <Link to="/">Back To Index</Link>
                        </div>
                        <div className="media-right">
                            
                        </div>
                    </artical>
                    
                    <div className="tile is-ancestor">
                        <div className="tile is-vertical is-12">
                            <div className="tile">
                                <div className="tile is-parent">
                                    <article className="tile is-child notification">
                                        <p className="title">{post.title}</p>
                                        <p>{post.content}</p>
                                        <nav className="level">
                                            <div className="level-left">
                                                <div className="level-item">
                                                    <button className="button is-danger is-pulled-right">
                                                        Delete Post
                                                    </button>
                                                </div>
                                            </div>
                                        </nav>
                                    </article>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            
            
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps)
    return {
        post: getPostById(state, ownProps.params.id)
    }
}

export default connect(mapStateToProps, { fetchPost })(PostsShow);