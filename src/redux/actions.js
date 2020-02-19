import * as TYPES from './action-types';


let action = {
    increment:{
        type:'INCREMENT'
    },
    decrement:{
        type:'DECREMENT'
    }
}

// slide状态
let slideState = {
    slideState(data){
        return {
            type:TYPES.SLIDESTATE,
            data:data
        }
    }
}


export default slideState;


