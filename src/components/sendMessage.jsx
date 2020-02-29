import React,{Component} from 'react';
import { Button, message, Form, Input} from 'antd';
import axios from 'axios';
import actions from '../redux/actions';
import store from '../redux/store';

const { TextArea } = Input;
class HorizontalLoginForm extends React.Component {

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
            axios.post('http://localhost:3001/sendmessage',values).then(res=>{
            if(res.data.messagecode===1){
                message.success('广播消息推送成功！');
                this.props.onClose();
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
          {getFieldDecorator('message', {
            rules: [{ required: false, message: '请输入您需要发送的广播消息！' }],
          })(
            <TextArea
              style={{width:'100vh'}}
              rows='5'
              placeholder="请输入您需要发送的广播消息！"
            />,
          )}
        </Form.Item>

        <Form.Item style={{marginLeft:36,marginTop:36}}>
        <Button type="primary" onClick={this.props.onClose}>
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

const SendMessage = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

export default SendMessage;