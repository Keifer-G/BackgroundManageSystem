import actions from './actions'

export default function reducer(state={num:0,slideState:true},action){
    switch(action.type){
        case 'INCREMENT':
            return {...state,num:state.num+1};
        case 'DECREMENT':
            console.log(state.num)
            return {...state,num:state.num-1};
        case actions.slideState().type:
            return  {...state,slideState:!state.slideState}
        default:
            return state;
    }
}
