import React, {
    Component
} from 'react';
import NewsItem from './newsitem'
import './newlist.less'
import { Tabs } from 'antd';

import NewsItemNine from './newstitle/newsitemnine';
import NewsItemTen from './newstitle/newsitemten';
import NewsItemEight from './newstitle/newsitemeight';
import NewsItemSeven from './newstitle/newsitemseven';
import NewsItemFive from './newstitle/newsitemfive';
import NewsItemSix from './newstitle/newsitemsix';
import NewsItemFour from  './newstitle/newsitemfour';
import NewsItemThree from './newstitle/newsitemthree';

const { TabPane } = Tabs;

class NewsList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div >
                <Tabs defaultActiveKey="1"  style={{ marginTop: 24, width: 640, height: 'calc(100vh - 386px)', boxShadow: '0px 4px 10px #aaa' }}>
                    <TabPane tab="推荐" key="1">
                       <NewsItem/>
                    </TabPane>
                    <TabPane tab="热点" key="2">
                        <NewsItemThree/>
                      </TabPane>
                    <TabPane tab="数据" key="4">
                        <NewsItemFour/> 
                    </TabPane>
                    <TabPane tab="全球" key="5">
                        <NewsItemFive/>
                    </TabPane>
                    <TabPane tab="实时" key="6">
                        <NewsItemSix/>
                    </TabPane>
                    <TabPane tab="热门" key="7">
                        <NewsItemSeven/>
                    </TabPane>
                    <TabPane tab="热门" key="8">
                        <NewsItemEight/>
                    </TabPane>
                    <TabPane tab="热门" key="9">
                        <NewsItemNine/>
                    </TabPane>
                    <TabPane tab="热门" key="10">
                        <NewsItemTen/>
                    </TabPane>
                </Tabs>

            </div>

        )
    }
}

export default NewsList;