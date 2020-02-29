import React, { Component } from 'react';
import { Modal } from 'antd';

class ChangeAvatar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
        };
    }

    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { visible, confirmLoading, ModalText } = this.state;

        return (
            <div>
                <Modal
                    title="Title"
                    visible={this.props.isVisible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <p>{ModalText}</p>
                </Modal>
            </div>
        )
}
}

export default ChangeAvatar;