import React, { Component } from 'react';
import { List, Typography } from 'antd';
import axios from 'axios';
import store from '../../../../../redux/store';

class MissionTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            missionData: [],
            resetCode:0
        }
    }

    componentWillMount() {
        let { missionData } = this.state;
        let { getState } = store;
        let username = getState().adminInfo.username
        let data = { username: username }
        console.log(data);
        axios.post('http://localhost:3001/mission',data).then(res => {
            missionData = res.data
            this.setState({
                missionData
            })
        })

    }

    componentWillUpdate() {
        let { getState, subscribe } = store;

        subscribe(() => {
            let { resetCode,missionData } = this.state;
            let resetState = getState().resetState;
            let username = getState().adminInfo.username
            let data = { username: username }
            if (resetCode !== resetState) {
                axios.post('http://localhost:3001/mission', data).then(res => {
                    missionData = res.data
                    this.setState({
                        missionData
                    })
                })
            }
            this.setState({
                resetCode
            })
        })
    }


    render() {
        let { missionData } = this.state;
        let data = [];
        for (let i = 0; i < missionData.length; i++) {
            let item = missionData[i];
            data.push(item.time + '    ' + item.mission)
        }
        return (
            <div>
                <div>
                    <List
                        size="large"
                        header={<div>任务列表</div>}
                        bordered
                        dataSource={data}
                        renderItem={item => <List.Item>{item}</List.Item>}
                    />
                </div>
            </div>
        )
    }
}

export default MissionTable;