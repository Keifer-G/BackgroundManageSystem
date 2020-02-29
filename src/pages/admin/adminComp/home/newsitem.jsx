import React, {
    Component
} from 'react';
import SmallNews from './smallnews';
import './newlist.less';
import { Statistic, Card, Row, Col, Icon, Divider } from 'antd';
import BScroll from 'better-scroll';

class NewsItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newsList: [],
        }
    }

    componentDidMount() {
        const wrapper= document.querySelector('.wrapper2')
        const scroll = new BScroll(wrapper, {
            mouseWheel: true,
            click: true,
            scrollY: true,
        })
    }


    loadMore = () => {
        let { newsList } = this.state;
        newsList.push([<SmallNews/>,<SmallNews/>]);
        this.setState({
            newsList,
        })
    }

    render() {
        let { newsList } = this.state;
        return (
                <div className="wrapper2  " style={{ width: 640, height: 'calc(100vh - 462px)', borderRadius: 4, overflow: 'hidden' }}>
                    <div className="content1" >

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ marginLeft: 16, fontSize: 16, width: 294 }}>
                                <a style={{ color: '#666' }}><p className="titlehover">武汉加油！我们来啦！</p></a>
                                <a style={{ color: '#999' }}> <p style={{ fontSize: 12 }}>
                                    全国行动，为武汉加油，直至今天早上7点，全国范围内除湖北，增长人数均为个位数······
                                        </p></a>
                                <Divider style={{ marginTop: 12, marginBottom: 8 }} />

                                <a style={{ color: '#666' }}><p className="titlehover">中国疾控：尚无证据表明医疗机构中发生超级传播者事件</p></a>
                                <a  style={{ color: '#999' }}> <p style={{ fontSize: 12 }}>
                                    全国行动，为武汉加油，直至今天早上7点，全国范围内除湖北，增长人数均为个位数······
                                        </p></a>

                                <Divider style={{ marginTop: 12, marginBottom: 8 }} />

                                <a  style={{ color: '#666' }}><p className="titlehover">中国疾控：尚无证据表明医疗机构中发生超级传播者事件</p></a>
                                <a style={{ color: '#999' }}> <p style={{ fontSize: 12 }}>
                                    全国行动，为武汉加油，直至今天早上7点，全国范围内除湖北，增长人数均为个位数······
                                        </p></a>

                                <Divider style={{ marginTop: 12, marginBottom: 8 }} />

                                <a style={{ color: '#666' }}><p className="titlehover">中国疾控：尚无证据表明医疗机构中发生超级传播者事件</p></a>
                                <a style={{ color: '#999' }}> <p style={{ fontSize: 12 }}>
                                    全国行动，为武汉加油，直至今天早上7点，全国范围内除湖北，增长人数均为个位数······
                                        </p></a>
                                <Divider style={{ marginTop: 12, marginBottom: 8 }} />

                            </div>
                            <div className="newstop">
                                <div>
                                    <p style={{ fontSize: 16, width: 300, textAlign: 'center' }}>今日疫情</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Row gutter={8} style={{ display: 'flex' }}>
                                            <Col span={12.8}>
                                                <Card >
                                                    <Statistic
                                                        title="增长速率"
                                                        value={-9.3}
                                                        precision={2}
                                                        valueStyle={{ color: '#3f8600' }}
                                                        prefix={<Icon type="arrow-down" />}
                                                        suffix="%"
                                                    />
                                                </Card>
                                            </Col>
                                            <Col span={12.8}>
                                                <Card>
                                                    <Statistic
                                                        title="增长人数"
                                                        value={1754}
                                                        valueStyle={{ color: '#cf1322' }}
                                                        prefix={<Icon type="arrow-up" />}
                                                    />
                                                </Card>
                                            </Col>
                                        </Row>

                                    </div>
                                    <div style={{ marginTop: 12, marginRight: 16 }}>
                                        <img src={require('../../../../assets/images/yiqing.png')} alt=""
                                            style={{
                                                width: 294,
                                            }} />
                                        <p style={{ textAlign: 'center' }}>疫情分布图</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            newsList.map(item => {
                                return item;
                            })
                        }
                        <a onClick={this.loadMore} style={{ color: '#999' }}><p style={{ textAlign: "center", paddingBottom: 8 }}>加载更多······</p></a>
                    </div>
                </div>
        )
    }
}

export default NewsItem;