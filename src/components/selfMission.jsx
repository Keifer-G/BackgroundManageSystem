import React,{Component} from 'react';
import { Button, message, Form, Input} from 'antd';
import axios from 'axios';
import actions from '../redux/actions';
import store from '../redux/store';

const { TextArea } = Input;
class HorizontaMissionFormMission extends React.Component {

    constructor(props){
        super(props)
        this.state={
            changeCode:0
        }
    }

  componentDidMount() {
    // To disable submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
      let {getState,subscribe,dispatch} = store;

      subscribe(()=>{
        let {changeCode} = this.state;
        changeCode = getState().resetState;
          this.setState({
              changeCode
          })
      })

    this.props.form.validateFields((err, values) => {
      if (!err) {
            let data = {values:values,username:this.props.curSendUser}
            axios.post('http://localhost:3001/currentmission',data).then(res=>{
            if(res.data.missioncode===1){
                message.success('任务派发成功');
                this.props.onMissionClose();
                dispatch(actions.resetUser());
            }
        })
      }
    });
  };

  render() {
    const { getFieldDecorator} = this.props.form;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit} style={{display:'flex',justifyContent:'center'}}>
        <Form.Item>
          {getFieldDecorator('mission', {
            rules: [{ required: false, message: '请输入您需要发送的任务消息！' }],
          })(
            <TextArea
              style={{width:'100vh'}}
              rows='5'
              placeholder="请输入您需要发送的任务消息！"
            />,
          )}
        </Form.Item>

        <Form.Item style={{marginLeft:36,marginTop:36}}>
        <Button type="primary" onClick={this.props.onMissionClose}>
            取消
          </Button>
          <Button type="primary" htmlType="submit" style={{marginLeft:24}}>
            发送
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const SelfMission = Form.create({ name: 'self_mission' })(HorizontaMissionFormMission);

export default SelfMission;