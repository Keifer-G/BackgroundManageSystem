import React,{Component} from 'react';
import { Liquid } from '@antv/g2plot';


class Mission extends Component{
    constructor(props){
        super(props)
        this.state={
            dataBase:[],
            goCount:0,
            goNoCount:0
        }
    }

    componentDidMount(){
        new Promise((resolve,reject)=>{
            setTimeout(()=>{
                let baseData = this.props.baseData;
                resolve(baseData)
            })
        }).then(res=>{

            let {goCount,goNoCount}= this.state;
            let go = res.filter(item=>item.isGo===1);
            goCount =  go.length;
            let goNo = res.filter(item=>item.isGo===0);
            goNoCount =  goNo.length;
            this.setState({
                dataBase:res,
                goNoCount,
                goCount
            })
            const liquidPlot = new Liquid(document.getElementById('tags'), {
                width:170,
                height:170,
                min:0,
                max: res.length,
                value: res.length,
                statistic: {
                    formatter: (value) => value,
                    style:'font-size:36px'
                },
            });
            liquidPlot.render();
            const liquidPlot2 = new Liquid(document.getElementById('tags2'), {
                width:170,
                height:170,
                color:'#73deb3',
                min: 0,
                max: res.length,
                value: goCount,
                statistic: {
                    formatter: (value) => (value*100 / res.length).toFixed(1)+'%',
                    style:'font-size:36px'
                },
            });
            liquidPlot2.render();
            const liquidPlot3 = new Liquid(document.getElementById('tags3'), {
                width:170,
                height:170,
                min: 0,
                max: res.length,
                value: goNoCount,
                statistic: {
                    formatter: (value) => (value*100 / res.length).toFixed(1)+'%',
                    style:'font-size:36px'
                },
                color:'#eb8167',
            });
            liquidPlot3.render()
        })
            
       
    }

    render(){

        return (
            <div>
                <div style={{display:'flex',justifyContent:'space-around',}}>
                        <div id="tags"><p style={{textAlign:'center',transform:'translateY(36px)'}}>全部</p></div>
                        <div id="tags2"><p style={{textAlign:'center',transform:'translateY(36px)'}}>通过</p></div>
                        <div id="tags3"><p style={{textAlign:'center',transform:'translateY(36px)'}}>淘汰</p></div>
                    </div>
            </div>
        )
    }
}

export default Mission;