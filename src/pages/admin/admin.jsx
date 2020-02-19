import React, { Component } from 'react';
import './admin.less';

// 使用redux
import store from '../../redux/store'
import actions from '../../redux/actions'

import { Layout, Menu,  Icon, Divider } from 'antd';

import Home from './adminComp/home/home';
import About from './adminComp/about/about';
import User from './adminComp/user/user';
import Oprate from './adminComp/oprate/oprate';
import Setting from './adminComp/setting/setting';
import Show from './adminComp/show/show';

import Top from '../../components/top'

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;



class Admin extends Component {


    constructor(props) {
        super(props)

        this.state = {
            themeColor: 'light',
            collapseState:false,
            currentPage:3,
            pages:[<Home/>,<Oprate/>,<Show/>,<User/>,<Setting/>,<About/>],
        }
    }

    pageChange=(e)=>{
        let page = Number(e.key);
        let {currentPage} = this.state;
        currentPage = page;
        this.setState({
            currentPage
        })
    }

    render() {
        let { currentPage,pages } = this.state;

        let {dispatch,subscribe,getState} = store;
        subscribe(()=>{
            let {collapseState} = getState();
            this.setState({
                collapseState
            })
        })
        
        return (
            <Layout style={{minHeight:'100vh'}}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth='0'
                    collapsible='true'  // 是否可收起
                    onBreakpoint={broken => {
                        //console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        dispatch(actions.slideState(collapsed));
                    }}
                    
                >
                    <div className="logo" style={{ width: 160, height: 40, marginLeft: 20, marginTop: 16,marginBottom:10,display:'flex',justifyContent:'space-around',alignItems:'center', }} >
                        <img src={require('../../assets/images/fanslogo.png')} alt="" style={{width:30,height:30}}/>
                        <p style={{color:'#425389',fontSize:20,marginLeft:4}}> 后台管理系统</p>
                    </div>
                    <Menu theme="light" mode="inline" defaultSelectedKeys={[`${currentPage}`]}>
                        <Menu.Item key="0" onClick={this.pageChange}
                        >
                            <Icon type="home" />
                            <span className="nav-text">首页</span>
                        </Menu.Item>
                       
                        <SubMenu key="sub1"
                            title={
                                <span>
                                    <Icon type="build"></Icon>
                                    <span>数据管理</span>
                                </span>
                            }
                        >
                            <Menu.Item key="1" onClick={this.pageChange}>
                                <Icon type="shop"></Icon>
                                <span>nav2</span>
                            </Menu.Item>
                            <Menu.Item key="10">
                                <Icon type="shop"></Icon>
                                <span>nav2</span>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2"
                            title={
                                <span>
                                    <Icon type="area-chart"></Icon>
                                    <span>数据展示</span>
                                </span>
                            }
                        >
                            <Menu.Item key="2" onClick={this.pageChange}>
                                <Icon type="shop"></Icon>
                                <span>nav2</span>
                            </Menu.Item>
                            <Menu.Item key="8">
                                <Icon type="shop"></Icon>
                                <span>nav2</span>
                            </Menu.Item>
                        </SubMenu>
                            <Menu.Item key="3" onClick={this.pageChange}>
                                <Icon type="user"></Icon>
                                <span>用户</span>
                            </Menu.Item>
                        <Menu.Item key="4" onClick={this.pageChange}>
                            <Icon type="tool" />
                            <span className="nav-text">设置</span>
                        </Menu.Item>
                        <Menu.Item key="5" onClick={this.pageChange}>
                            <Icon type="team" />
                            <span className="nav-text">关于设计</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0,paddingLeft:24 ,boxShadow:'0 2px 8px #ccc'}}>
                        <Top  history={this.props.history}/>
                    </Header>
                    <Content style={{ margin: '8px 0px 0' }}>
                        <div style={{ padding: 24, paddingTop:16,paddingBottom:16,background: '#fff', minHeight: 580 }}>
                            {
                                pages[currentPage]
                            }
                        </div>
                    </Content>
                    <p style={{position:'fixed',left:'calc(50% - 125px)',bottom:12}}>Background Management System by Keifer<img style={{width:14,height:14,marginLeft:6,marginBottom:2}} src={require('../../assets/images/fanslogo.png')}/></p>
                </Layout>
            </Layout>
        )
    }
}

export default Admin;