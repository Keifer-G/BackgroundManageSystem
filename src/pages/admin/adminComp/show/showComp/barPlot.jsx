import React,{Component} from 'react';
import { Bar } from '@antv/g2plot';

class BarPlot extends Component{

    componentDidMount(){
        const data = [
            { 标签: '游戏', 数量: 46 },
            { 标签: '历史', 数量: 41 },
            { 标签: '生活', 数量: 26 },
            { 标签: '科技', 数量: 2 },
            { 标签: '影视', 数量: 13 },
            { 标签: '其他', 数量: 8 },
          ];
          
          const barPlot = new Bar(document.getElementById('barplot'), {
            forceFit: true,
            data,
            xField: '数量',
            yField: '标签',
          });
          
          barPlot.render();
    }

    render(){
        return (
            <div>
                <div id="barplot"></div>
            </div>
        )
    }
}

export default BarPlot;