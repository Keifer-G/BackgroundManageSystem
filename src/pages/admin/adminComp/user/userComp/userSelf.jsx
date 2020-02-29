import React, { Component } from 'react';

import InfoChange from '../../../../../components/changeAdmin';
import { Avatar, Modal, Upload, Icon, message ,Divider} from 'antd';
import './userSelf.less';
import store from '../../../../../redux/store';
import actions from '../../../../../redux/actions'
import axios from 'axios';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('您仅可以选择 PNG/JPG 格式的图片！');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片必须小于2MB！');
    }
    return isJpgOrPng && isLt2M;
}


class UserSelf extends Component {
    constructor(props) {
        super(props)
        this.state = {
            adminInfo: {},
            visible: false,
            confirmLoading: false,
            loading: false,
        }
    }

    handleOk = () => {
        let {dispatch} = store;
        let {imageUrl,adminInfo} = this.state;
        this.setState({
            ModalText: '窗口将在2秒后关闭！',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);

        axios.post('http://localhost:3001/upload',{imageUri:imageUrl,username:adminInfo.username}).then(res=>{
            if(res.data.uploadcode===1){
                message.success('更换成功')
                dispatch(actions.userAvatar(imageUrl))
            }
        })

    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    setAvatar = () => {
        let { visible } = this.state;
        visible = true
        this.setState({
            visible
        })
    }


    // 头像上传
    handleChange = info => {

        
        let {adminInfo} =this.state;
        let {dispatch} = store
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>{
                this.setState({
                    imageUrl,
                    loading: false,
                })
            })
        }
    };

    componentWillUpdate(){


    }

    componentDidMount(){
        let { getState, subscribe } = store;
        let adminInfo = getState().adminInfo
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

    render() {

        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        let { adminInfo, visible, confirmLoading, imageUrl } = this.state;

        return (
            <div>
                <div style={{ height: 540, width: 240, borderRadius: 4, boxShadow: '0px 4px 10px #aaa' }}>
                    <div className="useravatart" style={{ paddingLeft: 95, paddingTop: 30, }}>
                        <div style={{ width: 50 }}>
                            <Avatar size='large' icon={adminInfo.useruri === '' ? 'user' : null} src={adminInfo.useruri} style={{ marginLeft: 5 }} />
                            <a onClick={this.setAvatar}><p style={{ fontSize: 12, color: '#666', marginTop: 2, textAlign: 'center' }}>更换头像</p></a>
                        </div>
                    </div>
                    <p style={{ fontSize: 24, textAlign: 'center' }}>{adminInfo.username}</p>

                    <div className="userInfo">
                        <p style={{ fontWeight: 500, marginTop: 20 }}>身份: {adminInfo.level === 0 ? '管理员' : '职员'}</p>
                        <p>性别: {adminInfo.usersex}</p>
                        <p>编号: {adminInfo.usernum}</p>
                        <p>公司: {adminInfo.userCompony}</p>
                        <p>联系邮箱: {adminInfo.useremail}</p>
                        <p>备忘录: {adminInfo.userInfo === '' ? '写点有计划的东西……' : adminInfo.userInfo}</p>
                        <p>个人说明: {adminInfo.selfInfp}</p>
                    </div>

                    <div className="infoChange" style={{ marginTop: 24, marginLeft: 80  }}>
                        <InfoChange />
                    </div>

                    <Modal
                        title="更换头像"
                        okText="确定"
                        cancelText="取消"
                        visible={visible}
                        onOk={this.handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={this.handleCancel}
                    >
                        <div style={{display:'flex',justifyContent:'space-around'}} >
                            <p style={{marginLeft:'10%' ,marginTop:'5%'}}> <Avatar size={64} src={adminInfo.useruri === '' ? null : adminInfo.useruri} icon={adminInfo.useruri === '' ? 'user' : null} /></p>
                            <div  style={{width:500,marginLeft:24,marginRight:24,marginTop:'5%'}}> <Divider type="horizontal">更换</Divider></div>
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                action="http://localhost:3001/upload"
                                method="post"
                                data={{imageUri:imageUrl}}
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </div>
                    </Modal>
                </div>

            </div>
        )
    }
}

export default UserSelf;