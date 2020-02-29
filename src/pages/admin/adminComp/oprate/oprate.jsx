import React, { Component } from 'react';
import { Radio, Table, Input, Button, Icon, Tag, Divider, Drawer } from 'antd';
import Highlighter from 'react-highlight-words';
import store from '../../../../redux/store';
import actions from '../../../../redux/actions';
import GoCommit from '../../../../components/goCommit';
import BScroll from 'better-scroll';
import ShowItem from './showItem';


// 可选框
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

class Oprate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentOprate: "a",
            searchText: '',
            searchedColumn: '',
            reciveData: [],
            clickState: '',
            isdisabled: false,
            a: 'a',
            visible: false,
            curCommit: 0,
            placement: 'bottom',
            showVisible: false,
            itemInfo:{},
            isGoData:[],
            isGoPage:10
        }
    }

    // 筛选，表格呈现部分方法
    shaixuan = (num) => {
        let {
            getState,
        } = store;
        let {
            reciveData
        } = this.state;
        reciveData = [];
        let data = getState().baseData;
        data = data.filter(item => item.isGo === num)

        for (let i = 0; i < data.length; i++) {
            let state;
            let item = data[i];
            if (item.isGo === 1) {
                state = "通过"
            } else if (item.isGo === 0) {
                state = "淘汰"
            } else {
                state = "待审核"
            }

            reciveData.push({
                key: `${i}`,
                title: item['title'],
                username: item['username'],
                tags: item['tags'],
                level: item['level'],
                follow: item['follow'],
                state: state
            })
        }
        this.setState({
            reciveData
        })
    }

    allOprate = () => {
        
        let { getState, } = store;
        let { reciveData, } = this.state;
        let data = getState().baseData;
        reciveData = [];
        for (let i = 0; i < data.length; i++) {
            let state;
            let item = data[i];
            if (item.isGo === 1) {
                state = "通过"
            } else if (item.isGo === 0) {
                state = "淘汰"
            } else {
                state = "待审核"
            }

            reciveData.push({
                key: `${i}`,
                title: item['title'],
                username: item['username'],
                tags: item['tags'],
                level: item['level'],
                follow: item['follow'],
                state: state
            })
        }
        this.setState({
            reciveData,
            isdisabled: false,
            clickState: "all",
            a: 'a'
        })
    }

    willOprate = () => {
        let {dispatch} = store;
        let {clickState,isGoData} = this.state;

        dispatch(actions.setIsGo(isGoData))

        this.shaixuan(2);
        this.setState({
            isdisabled: true,
            clickState:'will'
        })

    }

    didOprate = () => {
        let { getState, } = store;
        let { reciveData, } = this.state;
        reciveData = [];
        let data = getState().baseData;
        data = data.filter(item => item.isGo !== 2)

        for (let i = 0; i < data.length; i++) {
            let state;
            let item = data[i];
            if (item.isGo === 1) {
                state = "通过"
            } else if (item.isGo === 0) {
                state = "淘汰"
            } else {
                state = "待审核"
            }

            reciveData.push({
                key: `${i}`,
                title: item['title'],
                username: item['username'],
                tags: item['tags'],
                level: item['level'],
                follow: item['follow'],
                state: state
            })
        }
        this.setState({
            reciveData,
            isdisabled: false,
            clickState: "did",
            a: 'a'
        })
    }

    goOprate = () => {
        this.setState({
            a: 'f'
        })
        let { getState, } = store;
        let { reciveData, } = this.state;
        switch (this.state.clickState) {
            case 'all':
                this.shaixuan(1);
            case 'did':
                reciveData = [];
                let data = getState().baseData;
                let odata = data.filter(item => item.isGo !== 2);
                data = odata.filter(item => item.isGo === 1);

                for (let i = 0; i < data.length; i++) {
                    let state;
                    let item = data[i];
                    if (item.isGo === 1) {
                        state = "通过"
                    } else if (item.isGo === 0) {
                        state = "淘汰"
                    } else {
                        state = "待审核"
                    }

                    reciveData.push({
                        key: `${i}`,
                        title: item['title'],
                        username: item['username'],
                        tags: item['tags'],
                        level: item['level'],
                        follow: item['follow'],
                        state: state
                    })
                }
                this.setState({
                    reciveData
                })
        }
    }

    noGoOprate = () => {
        this.setState({
            a: 'e'
        })
        let { getState, } = store;
        let { reciveData, } = this.state;
        switch (this.state.clickState) {
            case 'all':
                this.shaixuan(0);
            case 'did':
                reciveData = [];
                let data = getState().baseData;
                let odata = data.filter(item => item.isGo !== 2);
                data = odata.filter(item => item.isGo === 0);

                for (let i = 0; i < data.length; i++) {
                    let state;
                    let item = data[i];
                    if (item.isGo === 1) {
                        state = "通过"
                    } else if (item.isGo === 0) {
                        state = "淘汰"
                    } else {
                        state = "待审核"
                    }

                    reciveData.push({
                        key: `${i}`,
                        title: item['title'],
                        username: item['username'],
                        tags: item['tags'],
                        level: item['level'],
                        follow: item['follow'],
                        state: state
                    })
                }
                this.setState({
                    reciveData
                })
        }
    }

    // 表格部分
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
            </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                    text
                ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };


    // 滚动

    componentDidMount() {
        const wrapper = document.querySelector('.wrapperoprate')
        const scroll = new BScroll(wrapper, {
            scrollX: false,
            click: true,
            scrollY: true,
            mouseWheel: true
        })

        // 初始化
        this.allOprate();

    }

    // 操作部分
    // 查看
    showItem = (e) => {
        let index = Number(e.currentTarget.getAttribute('data-index'))
        let { getState } = store;
        this.setState({
            showVisible: true
        })
        let itemInfo = getState().baseData[index]
        this.setState({
            itemInfo
        })
    }

    //关闭查看
    onShowClose = () => {
        this.setState({
            showVisible: false
        })
    }

    // 反馈
    showDrawer = (e) => {
        let index = Number(e.currentTarget.getAttribute('data-index'))
        this.setState({
            visible: true,
            curCommit: index
        })
    }
    onClose = () => {
        this.setState({
            visible: false
        })
    }

    // 通过
    goOk = (e) =>{
        let {reciveData,isGoData,isGoPage,clickState} = this.state;
        let index = Number(e.currentTarget.getAttribute('data-index'))
        reciveData[index].state = "通过";
        let level = reciveData[index].level
        isGoData.push({level:level,goNo:1})
        this.setState({
            isGoData,
            reciveData
        })
        if(isGoData.length===isGoPage){
            isGoPage+=10;
            this.setState({
                isGoPage
            })
        }
    }
    // 淘汰
    goNo = (e) =>{
        let {reciveData,isGoData,isGoPage} = this.state;
        let index = Number(e.currentTarget.getAttribute('data-index'))
        reciveData[index].state = "淘汰";
        let level = reciveData[index].level
        isGoData.push({level:level,goNo:0});
        this.setState({
            isGoData,
            reciveData
        })
        if(isGoData.length===isGoPage){
            isGoPage+=10;
            this.setState({
                isGoPage
            })
        }
    }

    componentWillUnmount(){
        let {dispatch} = store;
        let {isGoData} = this.state;
        dispatch(actions.setIsGo(isGoData));
    }

    componentWillUpdate(){
        let {dispatch} = store;
        let {isGoData} = this.state;
        dispatch(actions.setIsGo(isGoData))
    }

    render() {
        let { reciveData, isdisabled, curCommit, a, showVisible ,itemInfo} = this.state;

        const columns = [
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title',
                width: '18%',
                ellipsis: true,
                ...this.getColumnSearchProps('title'),
            },
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
                width: '12%',
                ...this.getColumnSearchProps('username'),
            },
            {
                title: '等级',
                dataIndex: 'level',
                key: 'level',
                width: '8%',
                ...this.getColumnSearchProps('level'),
            },
            {
                title: '关注',
                dataIndex: 'follow',
                key: 'follow',
                width: '8%',
                ...this.getColumnSearchProps('follow'),
            },
            {
                title: '标签',
                key: 'tags',
                dataIndex: 'tags',
                width: '18%',
                render: tags => (
                    <span>
                        {tags.map(tag => {
                            let color = tag.length > 6 ? 'geekblue' : 'green';
                            if (tag === 'loser') {
                                color = 'volcano';
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </span>
                ),
            },
            {
                title: '操作',
                width: '20%',
                key: 'oprate',
                render: (text, record, index) => (
                    <span>
                        <a data-index={index} onClick={this.showItem}>查看 {record.name}</a>
                        <Divider type="vertical" />
                        <a data-index={index} onClick={this.showDrawer}>反馈</a>
                        <Divider type="vertical" />
                        <a data-index={index} onClick={this.goNo}>淘汰</a>
                        <Divider type="vertical" />
                        <a data-index={index} onClick={this.goOk}>通过</a>
                    </span>
                ),
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
            },
        ];
        return (
            <div style={{ height: 'calc(100vh - 120px)', boxShadow: '0px 4px 10px #bbb', borderRadius: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: 24, paddingTop: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', }}>
                        <p style={{ fontSize: 14 }}>操作状态：</p>
                        <Radio.Group defaultValue="a">
                            <Radio.Button value="a" onClick={this.allOprate}>全部</Radio.Button>
                            <Radio.Button value="b" onClick={this.willOprate}>未操作</Radio.Button>
                            <Radio.Button value="c" onClick={this.didOprate}>已操作</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div style={{ marginRight: 24, display: 'flex', alignItems: 'center', }}>
                        <p style={{ fontSize: 14 }}>状态筛选：</p>
                        <Radio.Group defaultValue="d" value={a}>
                            <Radio.Button value="e" disabled={isdisabled} onClick={this.noGoOprate}>淘汰</Radio.Button>
                            <Radio.Button value="f" disabled={isdisabled} onClick={this.goOprate}>通过</Radio.Button>
                        </Radio.Group>
                    </div>
                </div>

                <div className='wrapperoprate' style={{ height: 'calc(100vh - 190px)', overflow: 'hidden', marginTop: 12 }}>
                    <div className="content">
                        <Table rowSelection={rowSelection} columns={columns} dataSource={reciveData} pagination={false} style={{ marginLeft: 24, marginRight: 24, marginTop: 12 }} />
                    </div>
                </div>
                <Drawer
                    title="反馈信息"
                    placement={this.state.placement}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <GoCommit onClose={this.onClose} curCommit={curCommit} />
                </Drawer>
                <ShowItem showVisible={showVisible} onShowClose={this.onShowClose} itemInfo={itemInfo} />
            </div>
        )
    }
}

export default Oprate;