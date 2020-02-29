import * as TYPES from './action-types';

// slide状态
let localState = {
    slideState(data){
        return {
            type:TYPES.SLIDESTATE,
            data:data
        }
    },
    adminInfo(data){
        return {
            type:TYPES.ADMININFO,
            data:data
        }
    },
    resetUser(){
        return {
            type:TYPES.RESETUSER
        }
    },
    userAvatar(data){
        return {
            type:TYPES.USERAVATAR,
            data:data
        }
    },
    baseData(data){
        return {
            type:TYPES.BASEDATA,
            data:data
        }
    },
    addBaseData(data){
        return {
            type:TYPES.ADDBASEDATA,
            data:data
        }
    },
    isCommit(data){
        return {
            type:TYPES.ISCOMMIT,
            data:data
        }
    },
    setIsGo(data){
        return {
            type:TYPES.SETISGO,
            data:data
        }
    }
}


export default localState;


