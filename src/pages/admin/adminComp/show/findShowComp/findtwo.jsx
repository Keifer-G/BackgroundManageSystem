import React,{Component} from 'react';
import { Rose } from '@antv/g2plot';

class FindTwo extends Component{

    constructor(props) {
        super(props)
        this.state = {
            isMain: false
        }
    }

    componentDidMount() {

        let { isMain } = this.state
        const data = [
            {
              type: '游戏',
              value: 27,
            },
            {
              type: '影视',
              value: 25,
            },
            {
              type: '历史',
              value: 18,
            },
            {
              type: '社会',
              value: 15,
            },
            {
              type: '科技',
              value: 10,
            },
            {
              type: '其它',
              value: 5,
            },
          ];
          
          const rosePlot = new Rose(document.getElementById('tagPer'), {
            forceFit: true,
            title: {
              visible: true,
              text: '标签分类比例',
            },
            radius: 0.8,
            data,
            radiusField: 'value',
            categoryField: 'type',
            colorField: 'type',
            label: {
              visible: true,
              type: 'outer',
              formatter: (text) => text,
            },
          });
          
          rosePlot.render();
      

        // 判断是否在主显示中
        let getmain = document.getElementById('tagPer');
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
            <div style={{overflow:'hidden'}}>
                <div id="tagPer" style={{ width: isMain === true ? 900 : 220,overflow:'hidden',height:isMain === true ? 400 :300}}></div>
            </div>
        )
    }
}

export default FindTwo;