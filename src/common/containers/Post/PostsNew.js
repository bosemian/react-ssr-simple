import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { PostsNewForm } from '../../components';
import { createPost } from '../../actions';

class PostsNew extends Component {
    render() {
        const { handleSubmit, isFetching } = this.props
        return (
            <PostsNewForm
                isFetching={isFetching}
                handleSubmit={handleSubmit} />
        );
    }
}

function validate(values) {
    const errors = {}

    // validate the inputs from 'values'
/*    if (values.title.length < 3) {
        errors.title = "Title must be at least 3 character"
    }*/
    if (!values.title) {
        errors.title = "Enter a title"
    }
    if (!values.categories) {
        errors.categories = "Enter some categories"
    }
    if (!values.content) {
        errors.content = "Enter some content please !"
    }


    // If error is empty, the form is finr to submit
    // If error has any properties, redux form assume form invalid
    
    return errors
}

PostsNew = reduxForm({
    validate,
    form: 'PostsNew'
})(PostsNew)

PostsNew = connect(
    (state) => ({
        isFetching: state.post.isFetching
    }),
    (dispatch) => ({
      onSubmit: (values) => {
          dispatch(createPost(values))
      }
    })
)(PostsNew);

export default PostsNew;