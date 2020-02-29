import React from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, message } from 'antd';
import MD5 from 'md5';
import store from '../redux/store';
import actions from '../redux/actions';
import axios from 'axios';

const { Option } = Select;

class DrawerForm extends React.Component {
    state = { 
        visible: false,
        newInfo:{}
 }; 

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    changeInfo = () =>{
        let {getState,dispatch,subscribe} = store;
        let username = getState().adminInfo.username
        const { form } = this.props;
        let {newInfo} = this.state;
        
        subscribe(()=>{
            let adminInfo = getState().adminInfo;
            newInfo = adminInfo;
            this.setState({
                newInfo
            })
        })

        form.validateFields((err, values) => {
            values.password = MD5(values.password);
            axios.post('http://localhost:3001/change',{values:values,username:username}).then(res=>{
               if(res.data.changecode===1){
                    message.success("信息修改成功");
                    this.onClose();
                    dispatch((actions.adminInfo(res.data.userInfo)));
               }
            })
        })
    }

    componentDidMount(){
        let {getState} = store;
        let adminInfo = getState().adminInfo;
        const { form } = this.props;
        let reg = /\.com/g;
        if(adminInfo.useremail){
            adminInfo.useremail = adminInfo.useremail.replace(reg,'')
        }
        form.setFieldsValue({
            'name':adminInfo.username,
            'password':adminInfo.password,
            'age':adminInfo.age,
            'compony':adminInfo.userCompony,
            'sex':adminInfo.usersex,
            'email':adminInfo.useremail,
            'usernum':adminInfo.usernum,
            'plan':adminInfo.selfInfp,
            'selfInfo':adminInfo.userInfo
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let {getState} = store;
        let adminInfo = getState().adminInfo;
        let username = getState().adminInfo.username;
        return (
            <div>
                <Button type="primary" onClick={this.showDrawer}>
                    修改信息
        </Button>
                <Drawer
                    title="修改个人信息"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <Form layout="vertical">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="用户名">
                                    {getFieldDecorator('name',{
                                        initialValue:'addad',
                                        rules: [{ required: false, message: '请输入您需要更改的用户名' },
                                        {
                                            validator: (rule, value, callback) => {
                                                if (value.length < 5 && value.length > 0) {
                                                    callback('用户名不能低于五位！')
                                                }
                                                if(value===username){
                                                    callback('请输入不同的用户名')
                                                }
                                                callback();
                                            }
                                        },
                                   ],
                                    })(<Input placeholder="请输入您需要更改的用户名" />)}
                                    
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="密码">
                                    {getFieldDecorator('password', {
                                        rules: [{ required: false, message: '请输入您需要更改的密码' },
                                        {
                                            validator: (rule, value, callback) => {
                                                if (value.length < 6 && value.length > 0) {
                                                    callback('用户名不能低于六位！')
                                                }
                                                callback();
                                            }
                                        }]
                                    })(<Input.Password type="password" placeholder="请输入您需要更改的密码"/>)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="年龄">
                                    {getFieldDecorator('age', {
                                        rules: [{ required: false, message: '请输入您需要更改的年龄' },
                                        {
                                            validator: (rule, value, callback) => {
                                                if (value.length >3) {
                                                    callback('年龄不得超过三位！')
                                                }
                                                callback();
                                            }
                                        },],
                                    })(<Input placeholder="请输入您需要更改的年龄"/>)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="公司">
                                    {getFieldDecorator('compony', {
                                        rules: [{ required: false, message: '请输入您需要更改的公司名' }],
                                    })(
                                        <Select placeholder="请输入您需要更改的公司名">
                                            <Option value="南京工程学院">南京工程学院</Option>
                                            <Option value="京城">京城</Option>
                                            <Option value="DJ">DJ</Option>
                                            <Option value="世贸">世贸</Option>
                                        </Select>,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="请输入您的邮箱地址">
                                    {getFieldDecorator('email', {
                                        rules: [{ required: false, message: '请输入您的邮箱地址' }],
                                    })(
                                        <Input
                                            style={{ width: '100%' }}
                                            addonBefore="http://"
                                            addonAfter=".com"
                                            placeholder="请输入您的邮箱地址"
                                        />,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="性别">
                                    {getFieldDecorator('sex', {
                                        rules: [{ required: false, message: '请选择您的性别' },
                                        ],
                                    })(
                                        <Select placeholder="请选择您的性别">
                                            <Option value="男">男</Option>
                                            <Option value="女">女</Option>
                                        </Select>,
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="编号">
                                    {getFieldDecorator('usernum', {
                                        rules: [
                                            { required: false, message: '请输入您需要更改的编号' },
                                            {
                                                validator: (rule, value, callback) => {
                                                    if (typeof value !== 'number' && value.length<6) {
                                                        callback('请输入不少于6位有效的数字格式编号！')
                                                    }
                                                    callback();
                                                },
                                            },
                                        ],
                                    })(<Input placeholder="请输入您需要更改的编号" />)}
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="备忘录">
                                    {getFieldDecorator('plan', {
                                        rules: [{ required: false, message: '写入您的备忘录' }],
                                    })(<Input placeholder="写点什么吧……" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="个人说明">
                                    {getFieldDecorator('selfInfo', {
                                        rules: [{ required: false, message: '写入您的个人说明' }],
                                    })(<Input placeholder="写点什么吧……" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <div
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                            取消
            </Button>
                        <Button onClick={this.changeInfo} type="primary">
                            确认修改
            </Button>
                    </div>
                </Drawer>
            </div>
        );
    }
}
const InfoChange = Form.create()(DrawerForm);
export default InfoChange;  