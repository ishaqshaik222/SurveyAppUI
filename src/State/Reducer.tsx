import {initialState} from './Store'

const Reducer = (state:any, action:any) => {
    switch (action.type) {

        case 'UPDATE_LOGIN_DATA':
            return {
                ...state,
                user: {...state.user,
                    ...action.payload
                }
            };
        case 'CLEAR_DATA':
            return {
                ...initialState
            };
        default:
            return state;
    };
};

export default Reducer;

