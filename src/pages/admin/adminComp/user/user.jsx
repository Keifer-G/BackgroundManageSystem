import React,{Component} from 'react';

import UserList from './userComp/userList';
import UserSelf from './userComp/userSelf';

class User extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div style={{display:'flex',justifyContent:'space-between'}}>   
                <UserList/>
                <UserSelf/>
            </div>
        )
    }
}

export default User;