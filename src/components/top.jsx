import React, { Component } from 'react';
import { Avatar, Icon, Modal, Select ,Badge} from 'antd';

import './top.less'

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
            visible: false,
            confirmLoading: false,
        };

    }

    goLogin = () => {
        let { visible } = this.state;
        visible = true;
        this.setState({
            visible
        })
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    handleOk = () => {
        this.props.history.push('/login')
    }
    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        return (
            <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
                <Select
                    showSearch
                    style={{ width: 300 ,marginRight:24}}
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
                    <button className="loginout"><Badge count="1" dot><Icon type="message" className="logt" style={{ marginRight: 4 }} /></Badge><span className="logt" style={{ marginRight: 16 }}>消息</span></button>
                    <Avatar src={require('../assets/images/image.png')} className="avadar" />
                    <button className="loginout" onClick={this.goLogin}> <Icon type='logout' style={{ marginLeft: 16, marginRight: 4 }} className='logt' /><span className='logt' style={{}}>退出</span></button>
                </div>
            </div>
        )
    }
}

export default Top;