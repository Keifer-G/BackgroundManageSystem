import React, { Component } from 'react';
import './login.less';
import Md5 from 'md5';  // 密码加密
import axios from 'axios';
import store from '../../redux/store';
import actions from '../../redux/actions';
import LoginCss from './logonComp/logincss';

import { Form, Input, Button, Icon } from 'antd';

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            logincode: 2,
            inputFoucs1:'1px solid #bbb',
            inputFoucs2:'1px solid #bbb',
            buttonActive:'rgb(0, 151, 154)',
            buttonColor:'rgb(66, 192, 197)',
            adminInfo:{}
        }
    };
    // input样式处理
    inputFocuOn=(e)=>{
        let {inputFoucs1} = this.state;
        inputFoucs1 = '1px solid rgb(66, 192, 197)';
        if(e.target.value.length>5 || e.target.value===''){
            this.setState({
                inputFoucs1
            })
        }
    }
    inputFocu1On=(e)=>{
        let {inputFoucs2} = this.state;
        inputFoucs2 = '1px solid rgb(66, 192, 197)'
        if(e.target.value.length>5 || e.target.value===''){
            this.setState({
                inputFoucs2
            })
        }
    }
    inputFocuOut=(e)=>{
        let {inputFoucs1} = this.state;
        inputFoucs1 = '1px solid #bbb';
        if(e.target.value.length>5 || e.target.value===''){
            this.setState({
                inputFoucs1
            })
        }
    }
    inputFocu1Out=(e)=>{
        let {inputFoucs2} = this.state;
        inputFoucs2 = '1px solid #bbb'
        if(e.target.value.length>5 || e.target.value===''){
            this.setState({
                inputFoucs2
            })
   
        }
    }

    inputChange=(e)=>{
        let {inputFoucs1} = this.state;
        inputFoucs1 = '1px solid #ff0000'
        if(e.target.value.length<5){
            this.setState({
                inputFoucs1
            })
        }else{
            this.setState({
                inputFoucs1:'1px solid rgb(66, 192, 197)'
            })
        }
    }
    inputChange1=(e)=>{
        let {inputFoucs2} = this.state;
        inputFoucs2 = '1px solid #ff0000'
        if(e.target.value.length<5){
            this.setState({
                inputFoucs2
            })
        }else{
            this.setState({
                inputFoucs2:'1px solid rgb(66, 192, 197)'
            })
        }
    }

    // button 样式处理
    buttonDown=()=>{
        let {buttonColor} = this.state;
        buttonColor = 'rgb(0, 151, 154)';
        this.setState({
            buttonColor
        })
    }

    buttonUp=()=>{
        let {buttonColor} = this.state;
        buttonColor = 'rgb(66, 192, 197)';
        this.setState({
            buttonColor
        })
    }



    handleSubmit = e => {
        let {getState,subscribe,dispatch}= store;
        let { logincode } = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //console.log(values);
                // 网络请求
                values.password = Md5(values.password);
                axios.post('http://localhost:3001/login', values).then((res)=>{
                    if(!res){
                        this.setState({
                            logincode:3
                        })
                    }else{
                        if(res.data.logincode===0){
                            this.setState({
                                logincode:0
                            })
                        }else{
                            let adminInfoa =res.data.data.loginState
                            logincode = res.data.logincode
                            //console.log(adminInfo)
                            //document.cookie='adminInfo' + '=' + adminInfo;
                            //console.log(document.cookie)
                            this.setState({
                                logincode
                            })
    
                            dispatch(actions.adminInfo(adminInfoa))
                            
                            //console.log(getState().adminInfo)
                            if(logincode===1){
                                setTimeout(()=>{
                                    this.props.history.push('/admin');
                                },0)
                            }
                        }
                    }
                })
            }
        });
    }


componentWillUnmount() {
    this.setState = (state, callback) => {
        return state;
    }
}

    render() {
        let {getState,subscribe}= store;
        let storeAdminInfo = getState().adminInfo;
        subscribe(()=>{
            let { adminInfo } = this.state;
            adminInfo = storeAdminInfo;
            this.setState({
                adminInfo
            })
        })

        const { getFieldDecorator } = this.props.form;
        let { logincode,inputFoucs1,inputFoucs2,buttonColor } = this.state;
        let that = this;
        return (
            <div>
                <div className='loginbc' >
                    <Form className="form animated fadeIn"
                        style={{ animationDuration: '1.5s', animationDelay: '1.5s' }}
                        onSubmit={this.handleSubmit}
                    >
                        <div className="formlogo">
                            <img src={require("../../assets/images/fanlogo.png")} alt="" className="formimage" />  {/* react的图片引入方式需要注意  */}
                        </div>
                        <p className="hone" style={{ fontFamily: 'webfont' }}>L o g i n</p>
                        <div className="formcontent">
                            <Form.Item className="formitem">
                                {getFieldDecorator('username', {
                                    rules: [
                                        { required: true, message: 'Please input your username!' },
                                        {validator:(rule,value,callback)=>{
                                            if(value.length<5 && value.length>0){
                                                callback('User name not be less than 5 digits')
                                            }
                                            callback();
                                        }}
                                    ],
                                })(
                                    <Input
                                        placeholder='UserName' className="input" 
                                        style={{
                                            width: 212,
                                            height: 24,
                                            bordeRadius: 2,
                                            border: inputFoucs1,
                                            paddingLeft: 6,
                                        }}
                                        onFocus={this.inputFocuOn}
                                        onBlur={this.inputFocuOut}
                                        onChange={this.inputChange}
                                        >
                                    </Input>
                                )}
                            </Form.Item>
                            <Form.Item className="formitem">

                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' },
                                    {validator:(rule,value,callback)=>{
                                        if(value.length<6 && value.length>0){
                                            callback('User name not be less than 6 digits')
                                        }
                                        callback();
                                    }}],
                                })(
                                    <Input
                                        style={{
                                            width: 212,
                                            height: 24,
                                            bordeRadius: 8,
                                            border:inputFoucs2,
                                            paddingLeft: 6,
                                        }}
                                        onFocus={this.inputFocu1On}
                                        onBlur={this.inputFocu1Out}
                                        onChange={this.inputChange1}
                                        placeholder='Password' type="password" className="input">
                                    </Input>
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="formbutton"
                                style={{    width: 218,
                                    height: 36,
                                    borderRadius: 6,
                                    border: 'solid 1px cadetblue',
                                    backgroundColor: buttonColor,
                                    color: '#fff',
                                }}
                                onMouseDown={this.buttonDown}
                                onMouseUp={this.buttonUp}
                                >Log in</Button>
                            </Form.Item>
                        </div>
                        {
                            logincode === 0 ? (
                                    setTimeout(()=>{
                                        this.setState({
                                            logincode:2
                                        })
                                    },5000)
                               ,
                                <div style={{ position:'relative',bottom:18}}>
                                    <p className="animated shake" style={{animationDuration:'1s',color:'#ff0000'}}>The user name or password is incorrect!</p>
                                </div>
                            ) : null
                        }
                    </Form>
                    <LoginCss />
                </div>
            </div>
        )
    }
}


export default Form.create({ name: '_login' })(Login);