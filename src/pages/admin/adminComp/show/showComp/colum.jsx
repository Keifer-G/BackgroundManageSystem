import { OverlappedComboPlot } from '@antv/g2plot';

import React, { Component } from 'react';

class ColumnPic extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dataBase: [],
      goCount: 0,
      goNoCount: 0,
      goCommitCount:0
    }
  }

  componentDidMount() {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        let baseData = this.props.baseData;
        resolve(baseData)
      })
    }).then(res => {

      let { goCount, goNoCount, goCommitCount } = this.state;
      let go = res.filter(item => item.isGo === 1);
      goCount = go.length;
      let goNo = res.filter(item => item.isGo === 0);
      goNoCount = goNo.length;
      let goCommit = res.filter(item=>item.isCommon===true);
      goCommitCount = goCommit.length;
      this.setState({
        dataBase: res,
        goCount,
        goNoCount,
        goCommitCount
      })

      const uvData = [
        { time: '全部', value: res.length },
        { time: '通过', value: goCount },
        { time: '淘汰', value: goNoCount },
        { time: '反馈', value: goCommitCount },
      ];

      const transformData = [
        { time: '全部', value: res.length },
        { time: '通过', value: goCount },
        { time: '淘汰', value: goNoCount },
        { time: '反馈', value: goCommitCount },
      ];

      const comboPlot = new OverlappedComboPlot(document.getElementById('column'), {
        layers: [
          {
            type: 'column',
            name: '任务',
            data: uvData,
            xField: 'time',
            yField: 'value',
          },

          {
            type: 'line',
            name: '比率',
            data: transformData,
            xField: 'time',
            yField: 'value',
            color: '#f8ca45',
          },
        ],
      });

      comboPlot.render();
    })


  }

  render() {

    return (
      <div>
        <div id="column"></div>
      </div>
    )
  }
}

export default ColumnPic;