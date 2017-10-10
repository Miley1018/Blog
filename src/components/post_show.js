import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost,deletePost} from '../actions'; 
import {Link} from 'react-router-dom';
class PostsShow extends Component{
    componentDidMount(){
        const {id} = this.props.match.params;//react-router,params是top property,存了所有的wildcard通配符（在index.js里面，：id表示通配符）
        this.props.fetchPost(id);
    }
    onDeleteClick(){
        const {id} = this.match.params;
        this.props.deletePost(id,()=>{
            this.props.history.push('/');
        });
    }
    render(){
        const {post}=this.props;
        if (!post){
            return <div>Loading...</div>
        }
        return (
        <div>
            <Link to='/' className=''>Back to Index</Link>
            <button 
                className='btn btn-danger pull-xs-right'
                onClick={this.onDeleteClick.bind(this)}

            >Delete Post</button>
           <h3>{post.title}</h3>
           <h6>Categories:{post.categories}</h6>
           <p>{post.content}</p>
        </div>)
    }
}

function mapStateToProps({posts},ownProps){//state.posts;ownProps就是要传入PostsShow里面后的this.props
    return {post:posts[ownProps.match.params.id]};
}
export default connect(mapStateToProps,{fetchPost,deletePost})(PostsShow);