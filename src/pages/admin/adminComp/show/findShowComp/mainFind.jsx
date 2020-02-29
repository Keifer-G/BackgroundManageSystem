import React,{Component} from 'react';
import { StackColumn } from '@antv/g2plot';
import store from '../../../../../redux/store';

class MainFind extends Component{

    constructor(props){
        super(props)
        this.state={
            isSlide:true,
            isMain:false
        }
    }

    componentDidMount(){
        const data = [
            { day: '日', type: 'redDeliciou', value: 10 },
            { day: '日', type: 'mcintosh', value: 15 },
            { day: '日', type: 'oranges', value: 9 },
            { day: '一', type: 'redDeliciou', value: 12 },
            { day: '一', type: 'mcintosh', value: 18 },
            { day: '一', type: 'oranges', value: 9 },
            { day: '二', type: 'redDeliciou', value: 5 },
            { day: '二', type: 'mcintosh', value: 20 },
            { day: '二', type: 'oranges', value: 8 },
            { day: '三', type: 'redDeliciou', value: 1 },
            { day: '三', type: 'mcintosh', value: 15 },
            { day: '三', type: 'oranges', value: 5 },
            { day: '四', type: 'redDeliciou', value: 2 },
            { day: '四', type: 'mcintosh', value: 10 },
            { day: '四', type: 'oranges', value: 4 },
            { day: '五', type: 'redDeliciou', value: 3 },
            { day: '五', type: 'mcintosh', value: 12 },
            { day: '五', type: 'oranges', value: 6 },
            { day: '六', type: 'redDeliciou', value: 4 },
            { day: '六', type: 'mcintosh', value: 15 },
            { day: '六', type: 'oranges', value: 8 },
          ];
          
          const columnPlot = new StackColumn(document.getElementById('mainPlot'), {
            forceFit: true,
            title: {
              visible: true,
              text: '审核任务',
            },
            padding: 'auto',
            data,
            xField: 'day',
            yField: 'value',
            yAxis: {
              min: 0,
            },
            label: {
              visible: false,
            },
            stackField: 'type',
            connectedArea: {
              visible: false,
              triggerOn: 'mouseenter',
            },
            legend:false
          });
          
          columnPlot.render();


          // 判断是否在主显示中
          let getmain = document.getElementById('mainPlot');
          let parentMain = getmain.parentNode.parentNode;
          let mainId = parentMain.getAttribute('id');
          if(mainId==='mainpage'){
              this.setState({
                  isMain:true
              })
          }else{
              this.setState({
                  isMain:false
              })
          }
          
    }
    render(){

        let {getState,subscribe} = store;

        subscribe(()=>{
            let {isSlide} = this.state;
            isSlide = getState().slideState;
            this.setState({
                isSlide
            })
        })

        let {isMain} = this.state;
        return(
            <div style={{overflow:'hidden'}}>
                <div id="mainPlot" style={{width:isMain===true?896:230,height:isMain===true?440:244}}></div>
            </div>
        )
    }
}

export default MainFind;