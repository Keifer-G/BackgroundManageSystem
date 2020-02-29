import React, { Component } from 'react';
import { List, Avatar, Icon } from 'antd';

import store from '../../../../redux/store';
import './homelist.less';

import BScroll from 'better-scroll';

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

class HomeList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            listData: [],
            collapseState:true
        }
    }

    componentWillMount() {
        let { listData } = this.state;
        for (let i = 0; i <12; i++) {
            listData.push({
                href: 'http://ant.design',
                title: ` 新闻${i}号`,
                avatar: require('../../../../assets/images/meone.jpg'),
                description:
                    '这里描述信息哦！',
                content:
                    'Keifer的React项目实战任务，这里是首页内容，内容主要为资讯为主，还有数据的管理、展示以及设置内容等功能，尽请期待！',
            });
        }
        this.setState({
            listData
        })
    }

    componentDidMount() {
        const wrapper = document.querySelector('.wrapper')
        const scroll = new BScroll(wrapper, {
            scrollX: false, 
            click: true,  
            scrollY: true, 
            mouseWheel:true
        })
    }

    listMore=()=>{
        let {listData} = this.state;
        for(let i= 0;i<6;i++){
            listData.push({
                href: 'http://ant.design',
                title: ` 新闻${i}号`,
                avatar: require('../../../../assets/images/meone.jpg'),
                description:
                    '这里描述信息哦！',
                content:
                    'Keifer的React项目实战任务，这里是首页内容，内容主要为资讯为主，还有数据的管理、展示以及设置内容等功能，尽请期待！',
            });
        }
        this.setState({
            listData
        })
    }

    render() {
        let {getState,subscribe} = store;

        subscribe(()=>{
            let {collapseState} = this.state;
            collapseState = getState().slideState;
            this.setState({
                collapseState
            })
        })

        let { listData,collapseState } = this.state;

        return (
            <div className='wrapper' style={{ marginLeft: 24, boxShadow: '0px 4px 10px #aaa',height:'calc(100vh - 120px)',overflow:'hidden' }}>
                <div className='content'>
                    <List
                        itemLayout="vertical"
                        size="large"
                        bordered='true'
                        dataSource={listData}
                        renderItem={item => (
                            <List.Item
                                key={item.title}
                                actions={[
                                    <IconText type="star-o" text="99" key="list-vertical-star-o" />,
                                    <IconText type="like-o" text="99" key="list-vertical-like-o" />,
                                    <IconText type="message" text="99" key="list-vertical-message" />,
                                ]}
                                extra={
                                    <img
                                        width={collapseState===true? 180:272}
                                        style={{marginTop:collapseState===true?'24%':0}}
                                        className="homenews"
                                        alt="logo"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                    />
                                }
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={<a href={item.href}>{item.title}</a>}
                                    description={item.description}
                                />
                                {item.content}
                            </List.Item>
                        )}
                    />
                    <a style={{color:"#666"}}><p onClick={this.listMore} style={{fontSize:16,textAlign:"center",paddingBottom:12,paddingTop:12}}>加载更多······</p></a>
                </div>
            </div>
        );
    }
}

export default HomeList;