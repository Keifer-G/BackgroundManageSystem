import React, { Component } from 'react';
import { RangeBar } from '@antv/g2plot';

class FindOne extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isMain: false
        }
    }

    componentDidMount() {

        let { isMain } = this.state

        const data = [
            { type: '游戏', values: [76, 100] },
            { type: '影视', values: [56, 108] },
            { type: '生活', values: [38, 129] },
            { type: '历史', values: [58, 155] },
            { type: '科技', values: [45, 120] },
            { type: '其他', values: [23, 99] }
        ];
        const barPlot = new RangeBar(document.getElementById('tagPlot'), {
            title: {
                visible: true,
                text: '标签分类',
            },
            data,
            xField: 'values',
            yField: 'type',
            color: 'l(0) 0:#3e5bdb 1:#dd3121',
            columnStyle: {
                fillOpacity: 0.8,
            },
            label: {
                visible: true,
                leftStyle: {
                    fill: '#3e5bdb',
                },
                rightStyle: {
                    fill: '#dd3121',
                },
            },
        });
        barPlot.render();


        // 判断是否在主显示中
        let getmain = document.getElementById('tagPlot');
        let parentMain = getmain.parentNode.parentNode;
        let mainId = parentMain.getAttribute('id');
        if (mainId === 'mainpage') {
            this.setState({
                isMain: true
            })
        } else {
            this.setState({
                isMain: false
            })
        }
    }
    render() {

        let {isMain}= this.state;
        return (
            <div>
                <div id="tagPlot" style={{ width: isMain === true ? 896 : 240, height: isMain === true ? 440 : 222 }}></div>
            </div>
        )
    }
}

export default FindOne;