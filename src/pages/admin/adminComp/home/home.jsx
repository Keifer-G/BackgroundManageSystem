import React, { Component } from 'react';
import HomeList from './homelist';
import NewsList from './newslist'
import { Carousel } from 'antd';

class Home extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div style={{display:'flex',justifyContent:'space-between'}}>
                {/* 轮播图 */}
             <div>
              <div className="homebanner" style={{width:640,height:240,borderRadius:4,overflow:'hidden',boxShadow:'0px 4px 10px #666' }}>
                  <Carousel autoplay style={{width:'100%'}}>
                          <div style={{borderRadius:50}}>
                            <a href="https://i0.hdslb.com/bfs/archive/058056424b94c3ff8c1facc940f48ce3bfe423a5.jpg@1100w_484h_1c_100q.jpg" target="_blank"> <img  style={{width:'100%',height:240}} src={require('../../../../assets/images/wuhan.png')} alt=""/></a>
                          </div>
                          <div>
                              <a href="https://cn.vuejs.org/?" target="_blank"><img style={{width:'100%',height:240}} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582024397448&di=307d8c9c25a17ce7198df2eeb1b1e7ec&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181116%2Fa677a422791a413290810061f9d1682a.jpeg" alt=""/></a>
                          </div>
                          <div>
                          <a href="https://pro.ant.design/index-cn" target="_blank">  <img style={{width:'100%',height:240}} src={require('../../../../assets/images/antdpro4.png')} alt=""/></a>
                          </div>
                          <div>
                            <a href="https://baike.baidu.com/item/%E5%A4%A7%E6%95%B0%E6%8D%AE/1356941?fr=aladdin" target="_blank"><img style={{width:'100%',height:240}} src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3496773662,3094152737&fm=26&gp=0.jpg" alt=""/></a>
                          </div>
                      </Carousel>
                      </div>
                      <div className="newslist" >
                        <NewsList/>
                      </div>
             </div>

              <div className="news" style={{flex:1}}>
                <HomeList/>
              </div>
            </div>
        )
    }
}

export default Home;