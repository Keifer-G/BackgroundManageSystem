import React, { Component } from 'react';
import BScroll from 'better-scroll';
import store from '../../../../redux/store';

import Column from './showComp/colum';
import Meigui from './showComp/meigui';
import BarPlot from './showComp/barPlot';
import Mission from './showComp/mission';
import RingPic from './showComp/ring';
import { get } from 'mongoose';

class Show extends Component {
    constructor(props) {
        super(props)
        this.state={
            baseData:[]
        }
    }

    componentDidMount() {
        
        // 滚动 
        const wrapper = document.querySelector('.wrappermeigui')
        const scroll = new BScroll(wrapper, {
            scrollX: false, 
            click: true,  
            scrollY: true, 
            mouseWheel:true
        })
        const wrappermid = document.querySelector('.wrappermid')
        const scrollmid = new BScroll(wrappermid, {
            scrollX: false, 
            click: true,  
            scrollY: true, 
            mouseWheel:true
        })

        const wrapperleft= document.querySelector('.wrapperleft')
        const scrollleft = new BScroll(wrapperleft, {
            scrollX: false, 
            click: true,  
            scrollY: true, 
            mouseWheel:true
        })

        let {getState,subscribe} = store;
        subscribe(()=>{
            let {baseData} = this.state;
            baseData = getState().baseData;
            this.setState({
                baseData
            })
        })
        let baseData= getState().baseData;
        this.setState({
            baseData
        })
    }

    render() {
        let {baseData} = this.state;
        return (
            <div style={{display:'flex'}}>

                <div className="wrapperleft" style={{overflow:'hidden',flex:1,height:'calc(100vh - 120px)',boxShadow: '0px 4px 10px #bbb', borderRadius: 4, }}>
                        <div>
                        <p style={{textAlign:'center',fontSize:16,transform:'translateY(24px)'}}>其他数据</p>
                        <RingPic style={{}} baseData={baseData}/>
                    </div>
                </div>
                <div className="wrappermid" style={{overflow:'hidden',width:510,height:'calc(100vh - 120px)',boxShadow: '0px 4px 10px #bbb', borderRadius: 4,marginLeft:24 }}>
                   <div style={{display:'flex',flexDirection:'column',}}>
                        <p style={{textAlign:'center',fontSize:16,transform:'translateY(24px)'}}>今日数据</p>
                        <Mission baseData={baseData}/>
                    <div >
                        <Column baseData={baseData} />
                    </div>
                   </div>
                </div>
                <div className="wrappermeigui" style={{overflow:'hidden',display:'flex',flexDirection:'column',width:360,height:'calc(100vh - 120px)',boxShadow: '0px 4px 10px #bbb', borderRadius: 4,marginLeft:24 }}>
                    <div>
                        <p style={{textAlign:'center',fontSize:16,transform:'translateY(24px)'}}>标签分类</p>
                        <Meigui baseData={baseData}/>
                        <BarPlot baseData={baseData}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Show;