import React, { Component } from 'react';
import { Avatar, Icon, Modal, Select, Badge, notification, List,Divider,Drawer } from 'antd';
import axios from 'axios';
import DynamicAntdTheme from 'dynamic-antd-theme';
import './top.less'
import BScroll from 'better-scroll';

import store from '../redux/store';



// 搜索框功能
const { Option } = Select;
function onChange(value) {
    console.log(`selected ${value}`);
}

function onBlur() {
    console.log('blur');
}

function onFocus() {
    console.log('focus');
}

function onSearch(val) {
    console.log('search:', val);
}


class Top extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ModalText: '您确定要退出登陆吗?',
            noticeText: '你们都在干嘛压',
            visible: false,
            confirmLoading: false,
            noticeToast: false,
            adminInfo: {},
            messageData: [],
            lastMessageData: "",
            changeCode: 0,
            placement:'right',
            DrawerVisible:false
        };
    }


    // 消息提示
    openNotification = () => {
        let { messageData } = this.state;
        let data = [];
        for (let i = 0; i < messageData.length; i++) {
            let item = messageData[i];
            data.push(item.time+'    '+item.content)
        }

        setTimeout(() => {
            // 消息列表滚动
            const wrapper = document.querySelector('.wrapperusermessage')
            if (wrapper) {
                const scroll = new BScroll(wrapper, {
                    scrollX: false,
                    click: true,
                    scrollY: true,
                    mouseWheel: true
                })
            } 
        },10)
        notification.open({
            message: '消息列表',
            description:
                (
                    <div className="wrapperusermessage" style={{ height: 300,overflow:'hidden' }}>
                        <div className="content">
                            <List
                                size="small"
                                bordered
                                dataSource={data}
                                renderItem={item => <List.Item>{item}</List.Item>}
                            />
                        </div>
                    </div>
                ),
            onClick: () => {

            },
        });

    };

    goLogin = () => {
        let { visible } = this.state;
        visible = true;
        this.setState({
            visible
        })
    }

    notice = () => {
        let { noticeToast } = this.state;
        noticeToast = true;
        this.setState({
            noticeToast
        })
    }
    noticeno = () => {
        this.setState({
            noticeToast: false,
        });
    }

    noticeyes = () => {
        this.setState({
            noticeToast: false,
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    handleOk = () => {
        this.props.history.push('/login')
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return state;
        }
    }

    componentWillMount() {
        let { getState, subscribe } = store;
        let { adminInfo, messageData, lastMessageData } = this.state;
        adminInfo = getState().adminInfo
        subscribe(() => {
            let { adminInfo } = this.state;
            adminInfo = getState().adminInfo
            this.setState({
                adminInfo
            })
        })
        this.setState({
            adminInfo
        })

        // 请求数据消息数据
        axios.get('http://localhost:3001/message').then(res => {
            messageData = res.data;
            lastMessageData = messageData[messageData.length - 1].content;
            this.setState({
                messageData,
                lastMessageData
            })
        })

    }

    componentDidMount() {
        let { getState, subscribe } = store;
        let { adminInfo } = this.state;
        adminInfo = getState().adminInfo
        subscribe(() => {
            let { adminInfo } = this.state;
            adminInfo = getState().adminInfo
            this.setState({
                adminInfo
            })
        })
        this.setState({
            adminInfo
        })
    }

    componentWillUpdate() {
        let { changeCode, lastMessageData, messageData } = this.state;
        let { getState, subscribe } = store;
        subscribe(() => {
            let { changeCode } = this.state;
            let resetState = getState().resetState;
            if (changeCode !== resetState) {

                axios.get('http://localhost:3001/message').then(res => {
                    messageData = res.data;
                    lastMessageData = messageData[messageData.length - 1].content;
                    this.setState({
                        messageData,
                        lastMessageData
                    })
                })
            }
            this.setState({
                changeCode
            })
        })
    }

    // 个人信息
    showDrawer = () =>{
        this.setState({
            DrawerVisible: true,
        });
    }
    
    onClose = () => {
        this.setState({
            DrawerVisible: false,
        });
    };

    render() {

        const { visible, confirmLoading, ModalText, noticeToast, noticeText, adminInfo, lastMessageData } = this.state;
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <div style={{ marginRight: 30, width: '42%', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }} className="guangbo">
                        <Icon type="notification" style={{ marginRight: 12, color: '#ff0000' }} /><p>{lastMessageData === '' ? "什么消息都没有呢……" : lastMessageData}</p>
                    </div>
                </div>

                <div style={{ marginRight: 10, width: 42, height: 48 }}>
                    <DynamicAntdTheme
                        primaryColor='42C0C5'
                        placement='bottomLeft'
                    />
                </div>
                <a className='loginout'><span style={{ marginRight: 24 }}>主题</span></a>

                <Select
                    showSearch
                    style={{ width: 300, marginRight: 24 }}
                    placeholder={<Icon type="search" />}
                    optionFilterProp="children"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>

                <Modal
                    title="退出登陆"
                    visible={visible}
                    onOk={this.handleOk}
                    okText="退出"
                    cancelText="取消"
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                ><p>{ModalText}</p></Modal>

                <div className='quit' style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: 24 }}>
                    <a className="loginout" onClick={this.openNotification}><Badge count="1" dot><Icon type="message" className="logt" style={{ marginRight: 4 }} /></Badge><span className="logt" style={{ marginRight: 16 }}>消息</span></a>
                    <Avatar src={adminInfo.useruri} className="avadar" onClick={this.showDrawer} />
                    <Drawer
                    title="个人信息"
                    placement={this.state.placement}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.DrawerVisible}
                >
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <p style={{fontSize:20}}>{adminInfo.username}</p>

                        <Avatar size="large" style={{}} icon={adminInfo.useruri===''?'user':null} src={adminInfo.useruri===""?null:adminInfo.useruri}/>
                    </div>
                    <Divider style={{marginTop:12,marginBottom:12}}/>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <p>身份：</p><p>{adminInfo.level===1?'职员':'管理员'}</p>
                    </div>
                    <Divider style={{marginTop:12,marginBottom:12}}/>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <p>编号：</p><p>{adminInfo.usernum}</p>
                    </div> 
                    <Divider style={{marginTop:12,marginBottom:12}}/>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <p>年龄：</p><p>{adminInfo.age}</p>
                    </div>
                    <Divider style={{marginTop:12,marginBottom:12}}/>
                                        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <p>性别：</p><p>{adminInfo.usersex}</p>
                    </div>                   
                    <Divider style={{marginTop:12,marginBottom:12}}/>
                     <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <p>公司：</p><p>{adminInfo.userCompony}</p>
                    </div>                   
                    <Divider style={{marginTop:12,marginBottom:12}}/>
                     <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <p>邮箱：</p><p>{adminInfo.useremail}</p>
                    </div>                    
                    <Divider style={{marginTop:12,marginBottom:12}}/>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <p>备忘录：</p><p>{adminInfo.selfInfp}</p>
                    </div>                    
                    <Divider style={{marginTop:12,marginBottom:12}}/>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <p>个人说明：</p><p>{adminInfo.userInfo}</p>
                    </div>                    
                    <Divider style={{marginTop:12,marginBottom:12}}/>
                </Drawer>
                    <a className="loginout" onClick={this.goLogin}> <Icon type='logout' style={{ marginLeft: 16, marginRight: 4 }} className='logt' /><span className='logt' id='logout' style={{}}>退出</span></a>
                </div>

            </div>
        )
    }
}

export default Top;