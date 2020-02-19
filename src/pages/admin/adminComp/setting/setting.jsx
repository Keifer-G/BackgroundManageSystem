import React,{Component} from 'react';
import {Upload,message,Icon} from 'antd';
import axios from 'axios';


// base64对图片进行转化
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

// 设置文件大小
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}


class Setting extends Component{
    constructor(props){
        super(props)

        this.state = {
            imageUrl: '',
            loading: false,
        }
    }

/*     handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
    }

    self = info => {
        getBase64( info.file,imageUrl=>{
            axios.post('http://localhost:3001/upload', { imgBase: imageUrl }).then((res)=>{
                console.log(res)
                this.setState({
                    imageUrl:res.data.imgBase,
                    loading: false,
                })
        })
        })
    }
 */

    render(){
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <div>
            <h1>我是设置</h1>
{/*             <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        customRequest={
                            this.self
                        }
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload> */}
            </div>
        )
    }
}

export default Setting;