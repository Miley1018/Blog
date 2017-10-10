import React, {Component} from 'react';
import {Field,reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';
class PostsNew extends Component{
    renderField(field){
        const {meta:{touched,error}} = field;//------------???
        const className=`form-group${touched&&error?' has-danger':''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className='form-control'
                    type='text'
                    //onChange={field.input.onChange}
                    //onFocus={field.input.onFocus}
                    //onBlur={field.input.onBlur}
                    //等于jx6:
                    {...field.input}
                />
                <div className='text-help'>
                {touched ? error:''}
                </div>
            </div>)
    }
    onSubmit(values){
        //到history里面去这个页面，在index.js的route里面找这个path。变成callback
        this.props.createPost(values,()=>{
            this.props.history.push('/');//router的history
        });
    }
    render(){
        const {handleSubmit} = this.props;
        return (//handleSubmit 中onSubmit是个callback，因为是this的callback，所以用bind
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label='Title for post'//自定义property
                    name='title'
                    component={this.renderField}
                />
                <Field
                    label='Categories'
                    name='categories'
                    component={this.renderField}//不用扣号，函数不是我们手动调用，而是传入一个函数，可以调用很多次
                />
                <Field
                    label='Post Content'
                    name='content'
                    component={this.renderField}
                />
                <button type='submit' className='btn btn-primary'>Submit</button>
                <Link to='/'className='btn btn-danger'>Cancel</Link>
            </form>
        )
    }
}

function validate(values){
    const error={};
    if (!values.title || values.title.length<3){
        error.title='Enter a title that is at least 3 characters!';//与name='title' 的title要一模一样，对应关系
    }
    if (!values.categories){
        error.categories='Enter some categories!';
    }
    if (!values.content){
        error.content='Enter some content!';
    }
    return error;//如果error是{}，就可以提交；否则不能。
}

export default reduxForm({
    validate,//函数在user要submit时候，就会调用验证
    form:'PostsNewForm'
})(
   connect(null,{createPost})(PostsNew)
);//mutiple connect-like helpers