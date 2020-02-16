import React, { Component } from 'react';
import './login.css'
import Md5 from 'md5';  // 密码加密
import axios from 'axios';

import LoginCss from './logonComp/logincss'

import { Form, Input, Button, Icon } from 'antd';

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            logincode: 2
        }
    };

    handleSubmit = e => {
        let { logincode } = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                // 网络请求
                values.password = Md5(values.password);
                axios.post('http://localhost:3001/login', values).then((res)=>{
                    if(!res){
                        return;
                    }else{
                        logincode = res.data.logincode
                        this.setState({
                            logincode
                        })

                        if(logincode===1){
                            this.props.history.push('/admin');
                        }
                    }
                })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let { logincode } = this.state;
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
                                            if(value.length<5){
                                                callback('User name not be less than 5 digits')
                                            }
                                            callback();
                                        }}
                                    ],
                                })(
                                    <Input
                                        placeholder='UserName' className="input" >
                                    </Input>
                                )}
                            </Form.Item>
                            <Form.Item className="formitem">

                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' },
                                    {validator:(rule,value,callback)=>{
                                        if(value.length<6){
                                            callback('User name not be less than 5 digits')
                                        }
                                        callback();
                                    }}],
                                })(
                                    <Input
                                        placeholder='Password' type="password" className="input">
                                    </Input>
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="formbutton">Log in</Button>
                            </Form.Item>
                        </div>
                        {
                            logincode === 0 ? (
                                    setTimeout(()=>{
                                        this.setState({
                                            logincode:2
                                        })
                                    },3000)
                               ,
                                <div style={{ marginTop: 6 }}>
                                    <p className="animated shake" style={{animationDuration:'1s'}}>The user name or password you entered is incorrect!</p>
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