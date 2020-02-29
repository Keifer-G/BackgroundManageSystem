import actions from './actions'

const data = [];

for (let i = 0; i < 20; i++) {
    data.push({
        "username": '惊城小王子' + i + '号',
        "headpic": "http://img17.3lian.com/201612/20/62561e504966c1bd37f63b6554619363.jpg",
        "tags": ['history', 'person'],
        "title": i + ' 震惊！男子一人在家竟作出这种事！',
        "level": i,
        "follow": 233 + i,
        "account": "keifer" + i,
        "isGo": 2,
        "isCommon": false,
        "content": "一男子在家太无聊，竟然翻出了历史书，历史书上这样说到:“苏美尔阿卡德城邦的建立和统一、苏美尔的政治结构神庙、大经济阿卡德统治、南部两河流域乌尔第三王朝、古巴比伦王国时期、古巴比伦王国的兴起、汉谟拉比的统治、亚述帝国、亚述国家的产生和演变、亚述帝国的建立、新巴比伦王国、新巴比伦王国灭亚述、古代两河流域的文化、楔形文字、吉尔伽美什史诗、古代两河流域的科技、巴比伦的天文学、巴比伦的数学成就、腓尼基文明、腓尼基的兴起、腓尼基发达的经济、赫梯和古巴勒斯坦、赫梯的兴亡、古巴勒斯坦的统一、犹太教的产生、古代印度文明、早期哈拉巴文化阶级的产生和国家的出现、四大吠陀婆罗门教的创立、列国时代的印度、十六国的建立、摩竭陀国称霸、城市的再度兴起、沙门新思潮佛教的产生与释迦牟尼”。 \n 中国第一王朝——夏朝、大禹治水、阶级社会的产生、夏启建国、少康中兴、夏桀亡国、商朝的兴衰、成汤建商、商朝的灭亡、商朝的农业生产技术、神奇的甲骨文、发达的青铜文化、礼乐统治下的西周等级、森严的分封制、周公制礼作乐、西周的宗庙祭祀、国人暴动与宣王中兴、三星堆文化、纷乱的东周、平王东迁、春秋五霸与战国七雄、“清净无为”的道家、孔子创立儒学、《考工记》问世。\n波斯帝国的兴衰、波斯帝国的建立、大流士一世改革、大流士的对外政策、波斯帝国的经济、波斯帝国的衰亡。",
        "contentpic": 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1957130074,3391914680&fm=26&gp=0.jpg'
    })
}

export default function reducer(state = {
    num: 0,
    slideState: true,
    adminInfo: {},
    resetState: 0,
    baseData: data
}, action) {
    switch (action.type) {
        case actions.slideState().type:
            return {
                ...state, slideState: !state.slideState
            }
            case actions.adminInfo().type:
                return {
                    ...state, adminInfo: action.data
                }
                case actions.resetUser().type:
                    return {
                        ...state, resetState: state.resetState + 1
                    };
                case actions.userAvatar().type:
                    let {
                        adminInfo
                    } = state
                    adminInfo.useruri = action.data
                    return {
                        ...state, adminInfo
                    }
                    case actions.baseData().type:
                        return {
                            ...state, baseData: action.data
                        }
                        case actions.addBaseData().type:
                            let {
                                baseData
                            } = state
                            baseData.push(...action.data)
                            return {
                                ...state, baseData
                            }
                            case actions.isCommit().type:
                                let newData = state.baseData
                                newData[action.data]['isCommon'] = true;
                                return {
                                    ...state, newData
                                }
                                case actions.setIsGo().type:
                                    let setData = state.baseData
                                    let levelData = action.data
                                    for (let i = 0; i < levelData.length; i++) {
                                        let item = levelData[i];
                                        let level = item.level;
                                        for (let j = 0; j < setData.length; j++) {
                                            let current = setData[j];
                                            if (current["level"] === level) {
                                                current['isGo'] = item.goNo
                                            }
                                        }
                                    }
                                    return {
                                        ...state, setData
                                    }
                                    default:
                                        return state;
    }
}