import React,{Component} from 'react';

class About extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div style={{display:'flex',justifyContent:'center',marginTop:240}}>
                <p>欢迎您使用由keifer设计的后台管理系统</p>
            </div>
        )
    }
}

export default About;