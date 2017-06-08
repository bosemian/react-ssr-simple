import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Link } from 'react-router';

class PostsNew extends Component {

    renderField = (field) => {
        const { meta: { touched, error } } = field
        const className = `field ${ touched && error ? 'is-danger' : '' }`
        return (
            <div className={className}>
                <label className="label">{field.label}</label>
                <p className="control">
                    <input
                        className="input is-primary" 
                        type="text"
                        {...field.input}
                    />
                </p>
                <div className="text-danger">
                    { touched ? error: ''}
                </div>
            </div>
        )
    }

    render() {
        const { handleSubmit, isFetching } = this.props
        if (isFetching) {
            return <div>Loading....</div>
        }
        return (
            <div className="columns is-mobile">
                <div className="column is-half is-offset-one-quarter spacing-top">
                    <form onSubmit={handleSubmit}>
                        <Field
                            label="Title"
                            name="title"
                            component={this.renderField} />
                        <Field
                            label="Post Content"
                            name="content"
                            component={this.renderField} />
                        <div className="field is-grouped">
                            <p className="control">
                                <button className="button is-primary">
                                    Submit
                                </button>
                            </p>
                            <p className="control">
                                 <Link to="/" className="is-grouped button is-danger">Cancel</Link>
                            </p>
                        </div>    
                    </form>
                </div>
            </div>
        );
    }
}

export default PostsNew