import React from 'react';
import { Button, Select, Form, Input, Drawer, message } from 'antd';
import axios from 'axios';
import Md5 from 'md5';  // 密码加密
import store from '../redux/store';
import actions from '../redux/actions';

const { Option } = Select;

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(

    class extends React.Component {

        constructor(props) {
            super(props)
            this.state = {
                confirmDirty: false,
            }
        }

        validateToNextPassword = (rule, value, callback) => {
            const { form } = this.props;
            if (value && this.state.confirmDirty) {
                form.validateFields(['confirm'], { force: true });
            }
            callback();
        };

        componentDidMount(){
            const { form } = this.props;
            form.setFieldsValue({
                'compony':'南京工程学院',
                'sex':'男',
            });
        }

        render() {
            const { form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Drawer
                    title="创建新职员"
                    width={720}
                    onClose={this.props.onClose}
                    visible={this.props.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <Form layout="vertical">
                        <Form.Item label="用户名">
                            {getFieldDecorator('username', {
                                rules: [
                                    {
                                        validator: (rule, value, callback) => {
                                            if (value.length < 5 && value.length > 0) {
                                                callback('用户名不能低于五位！')
                                            }
                                            callback();
                                        }
                                    },
                                    { required: true, message: '请输入您的用户名！' },
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="密码">
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        validator: (rule, value, callback) => {
                                            if (value.length < 6 && value.length > 0) {
                                                callback('密码不得少于6位！')
                                            }
                                            callback();
                                        },
                                    },
                                    { required: true, message: '您输入您的密码！' },
                                ],
                            })(<Input.Password type="password" />)}
                        </Form.Item>
                        <Form.Item label="性别">
                            {getFieldDecorator('sex', {
                                rules: [{ required: false, message: '请选择对象性别' },
                                ],
                            })(
                                <Select placeholder="请选择对象性别">
                                    <Option value="男">男</Option>
                                    <Option value="女">女</Option>
                                </Select>)}
                        </Form.Item>

                        <Form.Item label="编号" >
                            {getFieldDecorator('usernum', {
                                rules: [
                                    {
                                        validator: (rule, value, callback) => {
                                            if (value.length < 6 && value.length > 0) {
                                                callback('编号格式不得少于6位！')
                                            }
                                            callback();
                                        },

                                    },
                                    { required: true, message: '请输入您的编号！' },
                                ],
                            })(<Input type="textarea" />)}
                        </Form.Item>
                        <Form.Item label="公司" >
                            {getFieldDecorator('compony', {
                                rules: [{ required: false, message: '请输入您需要更改的公司名' }],
                            })(
                                <Select placeholder="请输入您需要更改的公司名">
                                    <Option value="南京工程学院">南京工程学院</Option>
                                    <Option value="京城">京城</Option>
                                    <Option value="DJ">DJ</Option>
                                    <Option value="世贸">世贸</Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="邮箱" required>
                            {getFieldDecorator('email', {
                                rules: [
                                    { required: true, message: '请输入您的邮箱地址！' }
                                ]
                            })(<Input type="textarea" />)}
                        </Form.Item>
                    </Form>
                    <div
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.props.onClose} style={{ marginRight: 8 }}>
                            取消
            </Button>
                        <Button onClick={this.props.onCreate} type="primary">
                            确认添加
            </Button>
                    </div>
                </Drawer>
            );
        }
    },
);

class AddAdminer extends React.Component {
    state = {
        visible: false,
        reset: 0,
    };

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

    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
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

            values.password = Md5(values.password);
            axios.post('http://localhost:3001/add', values).then(res => {
                dispatch(actions.resetUser())
                if (res.data.addcode === 1) {
                    dispatch(actions.resetUser())
                    message.success('添加成功');
                } else {
                    message.error('添加失败!');
                }
            })

            form.resetFields();
            this.setState({ visible: false });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        return (
            <div>
                <Button type="primary" icon="plus" onClick={this.showDrawer} style={{ fontSize: 12, padding: 8 }}>
                    添加新职员
                </Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onClose={this.onClose}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default AddAdminer;