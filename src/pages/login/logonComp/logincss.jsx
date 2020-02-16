import React,{Component} from 'react';

import 'animate.css'


class LoginCss extends Component{

    render(){
        return (
            <div>
                <div style={{position:'relative'}}>
                    <img src={require('../../../assets/images/fanlogo.png')} className='animated bounceInDown' style={{animationDuration:'1.5s'}} alt=""/>
                    <p className="animated bounceInUp" style={{fontSize:44,color:'#425389',marginLeft:168,position:'absolute',bottom:120,animationDuration:'1.5s'}}>KEIFER</p>
                </div>
                
                <div className="animated bounceInLeft" style={{ animationDuration:'1.5s',animationDelay:'1.5s',position:'fixed', left:'50%',bottom:'82%',color:'#fff',fontSize:44,left:'calc(50% - 208px)'}}>
                    <p>Management System</p>
                </div>
            </div>
        )
    }
}


export default LoginCss;
