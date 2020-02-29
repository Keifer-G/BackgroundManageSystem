import React,{Component} from 'react';
import { Button, message, Form, Input} from 'antd';
import actions from '../redux/actions';
import store from '../redux/store';

const { TextArea } = Input;
class HorizontalCommitForm extends React.Component {

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
    let {dispatch} = store;
    let {form} = this.props;
    
    dispatch(actions.isCommit(this.props.curCommit))

    this.props.onClose();
    message.success('消息反馈成功！');

    form.setFieldsValue({
      'message':'',
  });
  };

  render() {
    const { getFieldDecorator} = this.props.form;
    return (
      <Form layout="inline" style={{display:'flex',justifyContent:'center'}}>
        <Form.Item>
          {getFieldDecorator('message', {
            rules: [{ required: false, message: '请输入您需要反馈的消息！' }],
          })(
            <TextArea
              style={{width:'100vh'}}
              rows='5'
              placeholder="请输入您需要反馈的消息！"
            />,
          )}
        </Form.Item>

        <Form.Item style={{marginLeft:36,marginTop:36}}>
        <Button type="primary" onClick={this.props.onClose}>
            取消
          </Button>
          <Button type="primary" onClick={this.handleSubmit} style={{marginLeft:24}}>
            反馈
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const goCommit = Form.create({ name: 'horizontal_login' })(HorizontalCommitForm);

export default goCommit;