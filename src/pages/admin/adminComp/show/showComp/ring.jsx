import store from '../../../../../redux/store'
import React,{Component} from 'react';

import { Ring } from '@antv/g2plot';

class RingPic extends Component{

  constructor(props){
    super(props)
    this.state={
      isSlide:true
  }
  }

    componentDidMount(){
        const data = [
            {
              type: '分类一',
              value: 27,
            },
            {
              type: '分类二',
              value: 25,
            },
            {
              type: '分类三',
              value: 18,
            },
            {
              type: '分类四',
              value: 15,
            },
            {
              type: '分类五',
              value: 10,
            },
            {
              type: '其它',
              value: 5,
            },
          ];
          
          const ringPlot = new Ring(document.getElementById('ring'), {
            forceFit: true,
            radius: 0.8,
            data,
            angleField: 'value',
            colorField: 'type',
            style:{fontSize:12},
            legend:{
                visible:false,
            }
          });

                    
          const ringPlot2 = new Ring(document.getElementById('ring2'), {
            forceFit: true,
            radius: 0.8,
            data,
            angleField: 'value',
            colorField: 'type',
            style:{fontSize:12},
            legend:{
                visible:false,
            }
          });

          const ringPlot3 = new Ring(document.getElementById('ring3'), {
            forceFit: true,
            radius: 0.8,
            data,
            angleField: 'value',
            colorField: 'type',
            style:{fontSize:12},
            legend:{
                visible:false,
            }
          });

          ringPlot.render();
          ringPlot2.render();
          ringPlot3.render();
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

      let {isSlide} = this.state;
        return (
            <div style={{}}>
                <div id="ring" style={{width:'100%',transform:isSlide===true?'translateY(-80px)':null,transition:'0.2s easy'}}></div>
                <div id="ring2" style={{width:'100%',transform:isSlide===true?'translateY(-260px)':null,transition:'0.2s easy'}}></div>
                <div id="ring3" style={{width:'100%',transform:isSlide===true?'translateY(-440px)':null,transition:'0.2s easy'}}></div>
            </div>
        )
    }
}

export default RingPic;