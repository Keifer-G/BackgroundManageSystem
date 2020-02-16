import actions from './actions'

export default function reducer(state={num:0},action){
    switch(action.type){
        case 'INCREMENT':
            return {...state,num:state.num+1};
        case 'DECREMENT':
            console.log(state.num)
            return {...state,num:state.num-1};
        default:
            return state;
    }
}
