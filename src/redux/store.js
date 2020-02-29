import {createStore, applyMiddleware} from 'redux';  // 结构createStore对象解决'redux' does not contain a default export (imported as 'Redux').错误问题
import reducer from './reducer';
import thunk from 'redux-thunk';

let store = createStore(
    reducer,
    applyMiddleware(thunk)
); 

export default store;