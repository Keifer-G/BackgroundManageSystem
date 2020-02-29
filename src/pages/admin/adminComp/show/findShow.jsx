import React, { Component } from 'react';
import { Progress, Button } from 'antd';
import store from '../../../../redux/store';
import BScroll from 'better-scroll';

import FindOne from './findShowComp/findone';
import FindTwo from './findShowComp/findtwo';
import FindThree from './findShowComp/findthree';
import MainFind from './findShowComp/mainFind';

const ButtonGroup = Button.Group;

class FindShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inMain: false,
            findPage: [],
            mainPage: [],
            percent: 100,
            isSlide:true,
            baseData:[]
        }
    }

    increase = () => {
        let percent = this.state.percent + 10;
        if (percent > 100) {
            percent = 100;
        }
        this.setState({ percent });
    };

    decline = () => {
        let percent = this.state.percent - 10;
        if (percent < 0) {
            percent = 0;
        }
        this.setState({ percent });
    };



    changeKey = (e) => {
        //console.log(e.currentTarget.getAttribute('data-key'))
        let newKey = e.currentTarget.getAttribute('data-key');
        let mainKey = Number(newKey);  // 索引
        let { mainPage, findPage } = this.state;
        let currentPage = findPage[mainKey];
        let keyPage = mainPage[0];

        if (mainKey === 0) {
            findPage = [keyPage, findPage[1], findPage[2]]
        } else if (mainKey === 1) {
            findPage = [findPage[0], keyPage, findPage[2]]
        } else {
            findPage = [findPage[0], findPage[1], keyPage]
        }
        mainPage[0] = currentPage;
        this.setState({
            findPage,
            mainPage
        })
    }

    componentDidMount() {
        const wrapper = document.querySelector('.wrapperfindm')
        const scroll = new BScroll(wrapper, {
            click: true,
            scrollY: true,
            mouseWheel: true
        })

        let {getState,subscribe} = store;
        subscribe(()=>{
            let {isSlide,baseData} = this.state;
            baseData = getState().baseData;
            isSlide = getState().slideState;
            this.setState({
                isSlide,
                baseData
            })
        })
        let {mainPage,findPage,baseData} = this.state;
        baseData = getState().baseData;
        findPage = [<FindOne baseData={baseData}/>, <FindTwo baseData={baseData}/>, <FindThree baseData={baseData}/>];
        mainPage = [<MainFind baseData={baseData}/>];
        this.setState({
            findPage,
            mainPage,
            baseData
        })
    }

    render() {

        let { findPage, mainPage ,isSlide} = this.state;

        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{position:'fixed',left:isSlide===true?'35%':'28%',bottom:'10%',width:400,transition:'0.2s linear'}}>
                    <Progress showInfo={false} percent={this.state.percent} />
                    <ButtonGroup style={{marginLeft:160}}>
                        <Button onClick={this.decline} icon="minus" />
                        <Button onClick={this.increase} icon="plus" />
                    </ButtonGroup>
                </div>
                <div id="mainpage" style={{ flex: 1, height: 'calc(100vh - 120px)', boxShadow: '0px 4px 10px #bbb', borderRadius: 4, overflow: 'hidden' }}>
                    {mainPage[0]}
                </div>
                <div className="wrapperfindm" style={{ marginLeft: 24, width: 240, height: 'calc(100vh - 120px)', overflow: 'hidden' }}>
                    <div >
                        <div onClick={this.changeKey} data-key='0' className="showsmall1" style={{
                            height: '28%', marginLeft: 10, marginRight: 10, overflow: 'hidden', borderTop: '1px #eee solid', boxShadow: '0px 4px 10px #bbb',
                            borderRadius: 4
                        }}>
                            {findPage[0]}
                        </div>
                        <div onClick={this.changeKey} data-key='1' className="showsmall2" style={{ height: '28%', overflow: 'hidden', marginLeft: 10, marginRight: 10, boxShadow: '0px 4px 10px #bbb', borderRadius: 4, marginTop: 24 }}>
                            {findPage[1]}
                        </div>
                        <div onClick={this.changeKey} data-key='2' className="showsmall31" style={{ height: '28%', overflow: 'hidden', marginLeft: 10, borderBottom: '1px solid #eee', marginRight: 10, boxShadow: '0px 4px 10px #bbb', borderRadius: 4, marginTop: 24, }}>
                            {findPage[2]}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FindShow;