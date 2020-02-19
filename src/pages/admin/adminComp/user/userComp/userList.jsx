import React,{Component} from 'react';
import UserTable from './userTable';
import BScroll from 'better-scroll';

class UserList extends Component {
    constructor(props){
        super(props)
    }
    
    componentDidMount() {
        const wrapper = document.querySelector('.wrapperuser')
        const scroll = new BScroll(wrapper, {
            scrollX: false, 
            click: true,  
            scrollY: true, 
            mouseWheel:true
        })
    }

    render(){
        return(
            <div className="wrapperuser" style={{height:540,flex:2,marginRight:24,borderRadius:4,boxShadow: '0px 4px 10px #aaa'}}>
                <div className="content">
                    <UserTable/>
                </div>
            </div>
        )
    }
}

export default UserList;