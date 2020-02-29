import React, { Component } from 'react';
import { Rose } from '@antv/g2plot';

class Meigui extends Component {

    componentDidMount(){
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
              type: '科技',
              value: 18,
            },
            {
              type: '历史',
              value: 15,
            },
            {
              type: '生活',
              value: 10,
            },
            {
              type: '其它',
              value: 5,
            },
          ];
          
          const rosePlot = new Rose(document.getElementById('meigui'), {
            forceFit: true,
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
    }
    render() {
 
        return (
            <div>
                <div id="meigui"></div>
            </div>
        )
    }
}

export default Meigui;