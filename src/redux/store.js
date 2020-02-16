import {createStore} from 'redux';  // 结构createStore对象解决'redux' does not contain a default export (imported as 'Redux').错误问题
import reducer from './reducer'

let store = createStore(reducer); 

export default store;