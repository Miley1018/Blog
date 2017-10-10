import {FETCH_POSTS,FETCH_POST,DELETE_POST} from '../actions/index';
import _ from 'lodash';

export default function(state={},action){
    switch(action.type){
        case DELETE_POST:
            return _.omit(state,action.payload);//在state中找以action.payload为key的object，如果找到就删除，并返回新的state(管理local state，虽然远程库中已经删除了。)
        case FETCH_POST:
            //const post =action.payload.data;
            //const newState= {...state};
           // newState[post.id]=post;
            //return newState;以上等于：
            return {...state,[action.payload.data.id]:action.payload.data};
        case FETCH_POSTS:
            console.log(action.payload.data)
            return _.mapKeys(action.payload.data,'id');
        default:
            return state;
    }
}