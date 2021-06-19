export const initialState={
    userdt:[],
    user:null
}

const reducer=(state,action)=>{

    switch(action.type){
        
            case'ADD_USERDT':
            return {
                ...state,
                userdt:[...state.userdt,action.item],
            }
        case'ADD_USER':return{
            ...state,user:action.user
        }
       default:
    }
}

export default reducer
