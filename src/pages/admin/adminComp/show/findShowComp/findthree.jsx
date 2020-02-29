import React,{Component} from 'react';
import { Ring } from '@antv/g2plot';
class FindThree extends Component{
    

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
              type: '全部',
              value: 27,
            },
            {
              type: '通过',
              value: 25,
            },
            {
              type: '淘汰',
              value: 18,
            },
            {
              type: '反馈',
              value: 15,
            },
          ];
          
          const ringPlot = new Ring(document.getElementById('mainPer'), {
            forceFit: true,
            title: {
              visible: true,
              text: '筛选比例',
            },
            radius: 0.8,
            padding: 'auto',
            data,
            angleField: 'value',
            colorField: 'type',
          });
          
          ringPlot.render();

        // 判断是否在主显示中
        let getmain = document.getElementById('mainPer');
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
                <div id="mainPer" style={{ width: isMain === true ? 896 : 240, height: isMain === true ? 440 : 212 }}></div>
            </div>
        )
    }
}

export default FindThree;