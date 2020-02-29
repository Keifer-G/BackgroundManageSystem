import React, { Component } from 'react';
import { Drawer, Avatar, Tag } from 'antd';

class ShowItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            placement: 'right',
        }
    }

    render() {
        let { itemInfo } = this.props;
        return (
            <div>
                <Drawer
                    placement={this.state.placement}
                    closable={false}
                    onClose={this.props.onShowClose}
                    visible={this.props.showVisible}
                >
                    <div>
                        <img src={itemInfo.contentpic} alt="" style={{ width: '100%' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 12, justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 500 }}><span style={{ fontSize: 12, color: '#999', fontWeight: 400 }}>用户名：</span>{itemInfo.username}</p>
                        <Avatar size='large' src={itemInfo.headpic} style={{ border: '1px solid #eee' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 12, justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 500 }}><span style={{ fontSize: 12, color: '#999', fontWeight: 400 }}>等级：</span>{itemInfo.level}</p>
                        <p style={{ fontWeight: 500 }}><span style={{ fontSize: 12, color: '#999', fontWeight: 400 }}>关注：</span>{itemInfo.follow}</p>
                    </div>
                    <div style={{ marginTop: 12 }}>
                        <span style={{ fontSize: 12, color: '#999', fontWeight: 400 }}>标签：</span>
                        {
                            itemInfo.tags ? (
                                itemInfo.tags.map((item, index) => {
                                    return (
                                        <Tag color='gold' key={index}>{item}</Tag>
                                    )
                                })
                            ) : null
                        }
                    </div>
                    <div style={{ marginTop: 8 }}>
                        <p style={{ fontSize: 12, color: '#999'}}>标题：<span style={{ fontSize: 14, color: '#666' }}>{itemInfo.title}</span></p>
                    </div>
                    <div style={{ marginTop: 8 }}>
                        <p style={{ fontSize: 12, color: '#999'}}>内容：<span style={{ fontSize: 14, color: '#666' }}>{itemInfo.content}</span></p>
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default ShowItem;