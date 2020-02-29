import React, { Component } from 'react';
import { Button, Drawer, Form, Input} from 'antd';
import UserTable from './userTable';
import MissionTable from './missionTable';
import AddAdminer from '../../../../../components/addAdminer';
import BScroll from 'better-scroll';
import store from '../../../../../redux/store';
import SendMessage from '../../../../../components/sendMessage';
import SendMission from '../../../../../components/sendMission';



class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAdmin: 0,
            visible: false,
            missionVisible:false,
            placement: 'bottom'
        }
    }

    componentDidMount() {
        const wrapper = document.querySelector('.wrapperuser')
        const scroll = new BScroll(wrapper, {
            scrollX: false,
            click: true,
            scrollY: true,
            mouseWheel: true
        })
    }

    componentWillMount() {
        let { getState } = store;
        let { isAdmin } = this.state;
        isAdmin = getState().adminInfo.level;
        this.setState({
            isAdmin
        })
    }

    // 推送广播消息
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

    onChange = e => {
        this.setState({
            placement: e.target.value,
        });
    };

     // 推送任务消息
     showMissionDrawer = () => {
        this.setState({
            missionVisible: true,
        });
    };

    onMissionClose = () => {
        this.setState({
            missionVisible: false,
        });
    };

    onMissionChange = e => {
        this.setState({
            placement: e.target.value,
        });
    };

    render() {
        let { isAdmin } = this.state;

        return (
            <div style={{ flex: 2, height: 'calc(100vh - 120px)', marginRight: 24, overflow: 'hidden', borderRadius: 4, boxShadow: '0px 4px 10px #aaa' }}>
                <div className="wrapperuser" style={{ height: isAdmin === 0 ? '90%' : '100%', overflow: 'hidden', borderBottom: '1px solid #eee' }}>
                    <div className="content">
                        {
                            isAdmin === 1 ? <MissionTable /> : <UserTable />
                        }
                    </div>
                </div>
                {
                    isAdmin === 0 ? (
                        <div style={{ display: "flex", justifyContent: 'space-between', marginTop: '2%' }}>
                            <div style={{ marginLeft: 24 }}>
                                <Button type="primary" onClick={this.showMissionDrawer}>推送任务</Button>
                                <Button type="primary" onClick={this.showDrawer} style={{ marginLeft: 24 }}>推送广播</Button>
                            </div>
                            <div style={{ marginRight: 24 }}><AddAdminer /></div>
                        </div>
                    ) : null
                }
                <Drawer
                    title="推送广播消息"
                    placement={this.state.placement}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <SendMessage onClose={this.onClose}/>
                </Drawer>
                <Drawer
                    title="推送任务消息"
                    placement={this.state.placement}
                    closable={false}
                    onClose={this.onMissionClose}
                    visible={this.state.missionVisible}
                >
                    <SendMission onMissionClose={this.onMissionClose}/>
                </Drawer>
            </div>
        )
    }
}

export default UserList;