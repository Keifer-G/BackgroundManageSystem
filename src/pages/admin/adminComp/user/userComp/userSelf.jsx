import React,{Component} from 'react';

import InfoChange from '../../../../../components/changeToast';
import {Avatar, } from 'antd';
import './userSelf.less';

class UserSelf extends Component {
    constructor(props){
        super(props)

    }
    
    render(){
        return(
            <div>
                <div style={{height:540,width:240,borderRadius:4,boxShadow: '0px 4px 10px #aaa'}}>
                    <div className="useravatart" style={{paddingLeft:95,paddingTop:30,}}>
                        <div style={{width:50}}>
                            <Avatar size='large' icon='user' style={{marginLeft:5}}/>
                            <a href="javascript:;"><p style={{fontSize:12,color:'#666',marginTop:2,textAlign:'center'}}>更换头像</p></a>
                        </div>
                    </div>
                    <p style={{fontSize:24,textAlign:'center'}}>Keifer</p>
                    
                    <div className="userInfo">
                        <p style={{fontWeight:500,marginTop:20}}>身份: 管理员</p>
                        <p>性别: 男</p>
                        <p>编号: 21316000</p>
                        <p>公司: 南京工程学院</p>
                        <p>联系邮箱: 674298286@qq.com</p>
                        <p>个人说明: 介绍一下自己吧</p>
                    </div>
                    
                    <div className="infoChange" style={{marginTop:24,marginLeft:87}}>
                        <InfoChange/>
                    </div>

                </div>
            </div>
        )
    }
}

export default UserSelf;