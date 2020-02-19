import React from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';

const {TextArea} = Input;
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="编辑信息"
                    okText="确认修改"
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="用户名">
                            {getFieldDecorator('username', {
                                rules: [{ message: 'Please input the title of collection!' }],
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="性别">
                            <Radio.Group defaultValue="a">
                                <Radio.Button value='a'>男</Radio.Button>
                                <Radio.Button value='b'>女</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="密码">
                            {getFieldDecorator('password')(<Input type="password" />)}
                        </Form.Item>
                        <Form.Item label="编号">
                            {getFieldDecorator('usernum')(<Input type="textarea" />)}
                        </Form.Item>                       
                         <Form.Item label="公司">
                            {getFieldDecorator('compony')(<Input type="textarea" />)}
                        </Form.Item>
                        <Form.Item label="邮箱">
                            {getFieldDecorator('email')(<Input type="textarea" />)}
                        </Form.Item>
                        <Form.Item label="个人说明">
                            <TextArea rows={3}></TextArea>
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

class CollectionsPage extends React.Component {
    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
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
                <Button type="primary" onClick={this.showModal} style={{fontSize:12,padding:8}}>
                    编辑资料
        </Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default CollectionsPage;