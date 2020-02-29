import React, { Component } from 'react';
import 'animate.css';
import store from '../../../../redux/store';
import actions from '../../../../redux/actions';

import { Card, Avatar, Tag, Button, Drawer } from 'antd';
import BScroll from 'better-scroll';
import GoCommit from '../../../../components/goCommit';
import ShowItem from './showItem';

class PicOprate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentIndex: -1,
            commitdata: [],
            page: 0,
            placement: 'bottom',
            visible: false,
            curCommit:0,
            showVisible:false,
            itemInfo:{}
        }
    }


    // 横向滚动处理
    componentDidMount() {
        const wrapper = document.querySelector('.wrapperpicoprate')
        const scroll = new BScroll(wrapper, {
            scrollX: true,
            click: true,
            mouseWheel: true,
        })

        let { getState } = store;
        let { commitdata } = this.state;
        commitdata = getState().baseData;
        this.setState({
            commitdata
        })
    }

    // 事件处理
    clickGo = (e) => {
        let key = Number(e.currentTarget.getAttribute('data-key'));
        //let index = Number(e.currentTarget.getAttribute('data-index'));
        let { currentIndex, commitdata, page } = this.state;
        let { getState, dispatch, subscribe } = store;

        key = key - page * 20;
        // 解决移动的bug
        currentIndex = key + page * 20;
        this.setState({
            currentIndex
        })

        let datacount = commitdata.filter(item => item['isGo'] === 2);
        if (datacount.length === 1) {

            setTimeout(() => {
                commitdata[key]["isGo"] = 1;
                this.setState({
                    commitdata
                })
            }, 400)

            setTimeout(() => {
                page++;
                const data = [];
                for (let i = 0; i < 20; i++) {
                    data.push({
                        "username": '惊城小王子' + i + page * 20 + '号',
                        "headpic": "http://img17.3lian.com/201612/20/62561e504966c1bd37f63b6554619363.jpg",
                        "tags": ['history', 'person'],
                        "title": '震惊！男子一人在家竟作出这种事！',
                        "level": i + page * 20,
                        "follow": 233 + i + page * 20,
                        "account": "keifer" + i + page * 20,
                        "isGo": 2,
                        "iscommon": false,
                        "content": "一男子在家太无聊，竟然翻出了历史书，历史书上这样说到:“苏美尔阿卡德城邦的建立和统一、苏美尔的政治结构神庙、大经济阿卡德统治、南部两河流域乌尔第三王朝、古巴比伦王国时期、古巴比伦王国的兴起、汉谟拉比的统治、亚述帝国、亚述国家的产生和演变、亚述帝国的建立、新巴比伦王国、新巴比伦王国灭亚述、古代两河流域的文化、楔形文字、吉尔伽美什史诗、古代两河流域的科技、巴比伦的天文学、巴比伦的数学成就、腓尼基文明、腓尼基的兴起、腓尼基发达的经济、赫梯和古巴勒斯坦、赫梯的兴亡、古巴勒斯坦的统一、犹太教的产生、古代印度文明、早期哈拉巴文化阶级的产生和国家的出现、四大吠陀婆罗门教的创立、列国时代的印度、十六国的建立、摩竭陀国称霸、城市的再度兴起、沙门新思潮佛教的产生与释迦牟尼”。 \n 中国第一王朝——夏朝、大禹治水、阶级社会的产生、夏启建国、少康中兴、夏桀亡国、商朝的兴衰、成汤建商、商朝的灭亡、商朝的农业生产技术、神奇的甲骨文、发达的青铜文化、礼乐统治下的西周等级、森严的分封制、周公制礼作乐、西周的宗庙祭祀、国人暴动与宣王中兴、三星堆文化、纷乱的东周、平王东迁、春秋五霸与战国七雄、“清净无为”的道家、孔子创立儒学、《考工记》问世。\n波斯帝国的兴衰、波斯帝国的建立、大流士一世改革、大流士的对外政策、波斯帝国的经济、波斯帝国的衰亡。",
                        "contentpic": 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1957130074,3391914680&fm=26&gp=0.jpg'
                    })
                }
                commitdata = data;
                dispatch(actions.addBaseData(commitdata));
                this.setState({
                    commitdata,
                    page
                })
            }, 400)
        }

        setTimeout(() => {
            commitdata[key]["isGo"] = 1;
            this.setState({
                commitdata
            })
        }, 400)
    }

    clickNoGo = (e) => {
        let key = Number(e.currentTarget.getAttribute('data-key'));
        //let index = Number(e.currentTarget.getAttribute('data-index'));
        let { currentIndex, commitdata, page } = this.state;
        let { getState, dispatch, subscribe } = store;

        key = key - page * 20;
        // 解决移动的bug
        currentIndex = key + page * 20;
        this.setState({
            currentIndex
        })

        let datacount = commitdata.filter(item => item['isGo'] === 2);
        if (datacount.length === 1) {

            setTimeout(() => {
                commitdata[key]["isGo"] = 0;
                this.setState({
                    commitdata
                })
            }, 400)

            setTimeout(() => {
                page++;
                const data = [];
                for (let i = 0; i < 20; i++) {
                    data.push({
                        "username": '惊城小王子' + i + page * 20 + '号',
                        "headpic": "http://img17.3lian.com/201612/20/62561e504966c1bd37f63b6554619363.jpg",
                        "tags": ['history', 'person'],
                        "title": i+page*20+' 震惊！男子一人在家竟作出这种事！',
                        "level": i + page * 20,
                        "follow": 233 + i + page * 20,
                        "account": "keifer" + i + page * 20,
                        "isGo": 2,
                        "iscommon": false,
                        "content": "一男子在家太无聊，竟然翻出了历史书，历史书上这样说到:“苏美尔阿卡德城邦的建立和统一、苏美尔的政治结构神庙、大经济阿卡德统治、南部两河流域乌尔第三王朝、古巴比伦王国时期、古巴比伦王国的兴起、汉谟拉比的统治、亚述帝国、亚述国家的产生和演变、亚述帝国的建立、新巴比伦王国、新巴比伦王国灭亚述、古代两河流域的文化、楔形文字、吉尔伽美什史诗、古代两河流域的科技、巴比伦的天文学、巴比伦的数学成就、腓尼基文明、腓尼基的兴起、腓尼基发达的经济、赫梯和古巴勒斯坦、赫梯的兴亡、古巴勒斯坦的统一、犹太教的产生、古代印度文明、早期哈拉巴文化阶级的产生和国家的出现、四大吠陀婆罗门教的创立、列国时代的印度、十六国的建立、摩竭陀国称霸、城市的再度兴起、沙门新思潮佛教的产生与释迦牟尼”。 \n 中国第一王朝——夏朝、大禹治水、阶级社会的产生、夏启建国、少康中兴、夏桀亡国、商朝的兴衰、成汤建商、商朝的灭亡、商朝的农业生产技术、神奇的甲骨文、发达的青铜文化、礼乐统治下的西周等级、森严的分封制、周公制礼作乐、西周的宗庙祭祀、国人暴动与宣王中兴、三星堆文化、纷乱的东周、平王东迁、春秋五霸与战国七雄、“清净无为”的道家、孔子创立儒学、《考工记》问世。\n波斯帝国的兴衰、波斯帝国的建立、大流士一世改革、大流士的对外政策、波斯帝国的经济、波斯帝国的衰亡。",
                        "contentpic": 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1957130074,3391914680&fm=26&gp=0.jpg'
                    })
                }
                commitdata = data;
                dispatch(actions.addBaseData(commitdata));
                this.setState({
                    commitdata,
                    page
                })
            }, 400)
        }

        setTimeout(() => {
            commitdata[key]["isGo"] = 0;
            this.setState({
                commitdata
            })
        }, 400)
    }

    clickCommit = (e) => {
        this.setState({
            visible: true
        })

        let key = Number(e.currentTarget.getAttribute('data-key'));
        let { currentIndex,  page } = this.state;

        key = key - page * 20;
        currentIndex = key + page * 20;
        this.setState({
            curCommit:currentIndex
        })
    }

    onClose = () => {
        this.setState({
            visible: false,
        });
    }

    componentWillUnmount() {
        let { dispatch, getState } = store;
        let { commitdata } = this.state;
        commitdata = getState().baseData;
        dispatch(actions.baseData(commitdata))
    }

    showItem= (e) =>{
        let index = Number(e.currentTarget.getAttribute('data-level'));
        let {commitdata,itemInfo} = this.state;
        commitdata = commitdata.filter(item=>item.level===index);
        itemInfo = commitdata[0];
        this.setState({
            itemInfo,
            showVisible:true
        })
    }

    onShowClose = ()=>{
        this.setState({
            showVisible:false
        })
    }

    render() {
        let { commitdata, currentIndex, curCommit,itemInfo ,showVisible } = this.state;
        commitdata = commitdata.filter(item => item['isGo'] === 2)
        return (
            <div style={{ height: 'calc(100vh - 110px)', width: '100%', overflow: 'hidden' }} className='wrapperpicoprate'>
                <ul style={{ display: 'flex', width: `${commitdata.length * 284}px` }} >
                    {
                        commitdata.map((item, index) => {
                            return (
                                <li key={index} style={{ marginRight: 24, width: 260, height: 'calc(100vh - 120px)', borderRadius: 4, boxShadow: '0px 4px 10px #bbb', padding: 10, transitionDuration: '0.4s', transform: item.level === currentIndex ? "translateY(-900px)" : null }}>
                                    <Card
                                        hoverable
                                        bodyStyle={{ padding: 12 }}
                                        bordered='false'
                                        style={{ width: 240 }}
                                        cover={<img alt="example" src={item.contentpic} style={{ height: 148 }} />}
                                        onClick={this.showItem}
                                        data-level={item.level}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar src={item.headpic} style={{ border: '1px solid #eee' }} size='default' />
                                                <p style={{ fontSize: 12, marginLeft: 8 }}>{item.username}</p>
                                                <Avatar shape="square" size="small" style={{ backgroundColor: '#ff6666', marginLeft: 4 }}>{item.level}</Avatar>
                                            </div>
                                            <div>
                                                <p>{item.follow}</p>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: 8 }}>

                                            <span style={{ fontSize: 12, color: '#999', }}>标签：</span>
                                            {
                                                item.tags.map((item, index) => {
                                                    return (
                                                        <Tag color='gold' key={index}>{item}</Tag>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div style={{ marginTop: 8 }}>
                                            <p style={{ fontSize: 12, color: '#999', display: '-webkit-box', textOverflow: 'ellipsis', WebkitBoxOrient: 'vertical', WebkitLineClamp: '2', overflow: 'hidden' }}>标题：<span style={{ fontSize: 14, color: '#666' }}>{item.title}</span></p>
                                        </div>
                                        <div style={{ marginTop: 8 }}>
                                            <p style={{ fontSize: 12, color: '#999', display: '-webkit-box', textOverflow: 'ellipsis', WebkitBoxOrient: 'vertical', WebkitLineClamp: '5', overflow: 'hidden' }}>内容：<span style={{ fontSize: 14, color: '#666' }}>{item.content}</span></p>
                                        </div>
                                    </Card>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                                        <p style={{ fontSize: 12, color: '#999' }}>用户名：</p>
                                        <p style={{ fontSize: 14, color: '#666' }}>{item.account}</p>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                                        <p style={{ fontSize: 12, color: '#999' }}>内容是否违禁?</p>
                                        <a onClick={(e) => { e.preventDefault() }}><p>前往封禁</p></a>
                                    </div>
                                    <div style={{ marginTop: 24 }}>
                                        <Button type="danger" data-key={item.level} onClick={this.clickNoGo}>淘汰</Button>
                                        <Button style={{ marginLeft: 23, marginRight: 23 }} onClick={this.clickCommit} data-key={item.level}>反馈</Button>
                                        <Button data-key={item.level} data-index={index} type="primary" onClick={this.clickGo}>通过</Button>
                                    </div>
                                </li>
                            )
                        })
                    }
                    <Drawer
                        title="反馈信息"
                        placement={this.state.placement}
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                        <GoCommit onClose={this.onClose}  curCommit={curCommit}/>
                    </Drawer>
                    <ShowItem showVisible={showVisible} onShowClose={this.onShowClose} itemInfo={itemInfo} />
                </ul>
            </div>
        )
    }
}

export default PicOprate;