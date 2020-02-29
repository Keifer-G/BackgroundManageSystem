import React from 'react';
import { Table, Input, Button, Icon, Divider, Popconfirm, message, Drawer, List, Avatar,  Col, Row } from 'antd';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import store from '../../../../../redux/store';
import actions from '../../../../../redux/actions';
import SelfMission from '../../../../../components/selfMission';

class UserTable extends React.Component {
    state = {
        searchText: '',
        searchedColumn: '',
        adminer: [],
        resetCode: 0,
        reset: 0,
        resetState:0,
        resetNumber:0,
        visible: false,
        placement: 'right',
        currentUser:{},
        missionVisible: false,
        placementBottom:'bottom',
        curSendUser:''
    };

    // 请求数据
    componentDidMount() {
        let {subscribe,getState} = store;
        let newState = getState().resetState;
        let { adminer, resetState } = this.state;


        axios.get('http://localhost:3001/adminers').then(res => {
            for (let i = 0; i < res.data.length; i++) {
                let item = res.data[i]
                adminer.push({
                    key: item.key,
                    name: item.username,
                    status: '职员',
                    sex: item.usersex,
                    number: item.usernum,
                    age: item.age
                })
            }
            this.setState({
                adminer
            })
        })
    }


    // 表格处理
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`搜索 ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    搜索
        </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    重置
        </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                    text
                ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    // 删除请求
    deleteUser = (e) => {
        let index = e.currentTarget.getAttribute('data-index');
        let NumIndex = Number(index);

        let { adminer } = this.state;
        let username = adminer[NumIndex].name;

        // 监听删除事件来重新渲染
        let { reset } = this.state;
        let { getState, dispatch, subscribe } = store;
        reset = getState().resetState;

        subscribe(() => {
            let { reset } = this.state;
            reset = getState().resetState;
            this.setState({
                reset
            })
        })

        let data = { username: username }
        axios.post('http://localhost:3001/delete', data).then(res => {
            if (res.data.deletecode === 1) {
                dispatch(actions.resetUser())
                  message.success('删除成功');
            } else {
                message.error('删除失败');
            }
        })
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return state;
        }
    }

    componentWillUpdate() {
        let { getState, subscribe } = store;

        subscribe(() => {
            let { resetCode } = this.state;
            let resetState = getState().resetState;

            if (resetCode !== resetState) {
                let adminer = [];
                axios.get('http://localhost:3001/adminers').then(res => {
                    //console.log(res);
                    for (let i = 0; i < res.data.length; i++) {
                        let item = res.data[i]
                        adminer.push({
                            key: item.key,
                            name: item.username,
                            status: '职员',
                            sex: item.usersex,
                            number: item.usernum,
                            age: item.age
                        })
                    }
                    this.setState({
                        adminer
                    })
                })
            }

            this.setState({
                resetCode
            })
        })
    }

    // 用户信息查看
    showDrawer = (e) => {
        let index = Number(e.currentTarget.getAttribute('data-index'));
        let {adminer} = this.state;
        
        let username = adminer[index].name
        if(username){
            let data = { username: username }
            axios.post("http://localhost:3001/currentuser",data).then(res=>{
                let {currentUser} = this.state;
                currentUser = res.data;
                this.setState({
                    currentUser
                })
            })
        }
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    // 发送单人任务
    showMissionDrawer = (e) => {
        let {adminer,curSendUser} = this.state;
        let index = Number(e.currentTarget.getAttribute('data-index'));
        curSendUser = adminer[index].name;
        this.setState({
            missionVisible: true,
            curSendUser
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

        let { adminer,currentUser,curSendUser } = this.state;
        const columns = [
            {
                title: '用户名',
                dataIndex: 'name',
                key: 'name',
                width: '20%',
                ...this.getColumnSearchProps('name'),
            },
            {
                title: '编号',
                dataIndex: 'number',
                key: 'number',
                width: '15%',
                ...this.getColumnSearchProps('number'),
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: '15%',
                key: 'age',
                ...this.getColumnSearchProps('age'),
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                width: "15%",
                ...this.getColumnSearchProps('sex'),
            },
            {
                title: '身份',
                dataIndex: 'status',
                key: 'status',
                width: '15%',
                ...this.getColumnSearchProps('status'),
            },
            {
                title: '操作',
                key: 'oprate',
                render: (text, record, index) => (
                    <span>
                        <a data-index={index} onClick={this.showDrawer}>查看</a>
                        <Divider type="vertical" data-index={index} style={{ marginLeft: 12, marginRight: 12 }} />
                            <a style={{ color: '#ff0000' }} data-index={index} onClick={this.deleteUser} >删除</a>
                        <Divider type="vertical" style={{ marginLeft: 12, marginRight: 12 }} />
                        <a data-index={index} onClick={this.showMissionDrawer}>任务</a>
                    </span>
                ),
            },

        ];
        return (
            <div>
                <Table columns={columns} dataSource={adminer} pagination={false}/>
                <Drawer
                    title="职员信息"
                    placement={this.state.placement}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <p style={{fontSize:20}}>{currentUser.username}</p>

                        <Avatar size="large" style={{}} icon={currentUser.useruri===''?'user':null} src={currentUser.useruri===""?null:currentUser.useruri}/>
                    </div>
                    <Divider style={{marginTop:12,marginBottom:12}}/>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <p>身份：</p><p>职员</p>
                    </div>
                    <Divider style={{marginTop:12,marginBottom:12}}/>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <p>编号：</p><p>{currentUser.usernum}</p>
                    </div> 
                    <Divider style={{marginTop:12,marginBottom:12}}/>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <p>年龄：</p><p>{currentUser.age}</p>
                    </div>
                    <Divider style={{marginTop:12,marginBottom:12}}/>
                                        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <p>性别：</p><p>{currentUser.usersex}</p>
                    </div>                   
                    <Divider style={{marginTop:12,marginBottom:12}}/>
                     <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <p>公司：</p><p>{currentUser.userCompony}</p>
                    </div>                   
                    <Divider style={{marginTop:12,marginBottom:12}}/>
                     <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <p>邮箱：</p><p>{currentUser.useremail}</p>
                    </div>                    
                    <Divider style={{marginTop:12,marginBottom:12}}/>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <p>备忘录：</p><p>{currentUser.selfInfp}</p>
                    </div>                    
                    <Divider style={{marginTop:12,marginBottom:12}}/>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <p>个人说明：</p><p>{currentUser.userInfo}</p>
                    </div>                    
                    <Divider style={{marginTop:12,marginBottom:12}}/>
                </Drawer>
                
                <Drawer
                    title={"推送给 "+ curSendUser +" 的任务消息"}
                    placement={this.state.placementBottom}
                    closable={false}
                    onClose={this.onMissionClose}
                    visible={this.state.missionVisible}
                >
                    <SelfMission onMissionClose={this.onMissionClose} curSendUser={curSendUser}/>
                </Drawer>
            </div>
        );
    }
}


export default UserTable;