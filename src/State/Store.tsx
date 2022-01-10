import React, {createContext, useReducer} from 'react';
import Reducer from './Reducer';

const initialState = {
    user: {
        status: 'UNAUTHORIZED',
        userId: null,
        email: null,
        userName: null,
        phone: null,
        gender: null,
        dob: null,
        maritalStatus: null,
        countryCode: null,
        managerId:0,
    },
  
    error: null,
};

const Store = ({children}:any) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    );
};

const Context = createContext<any>(initialState);
export {initialState, Context};
export default Store;

// usage
// import {Context} from '../State/Store'
// const [STATE, dispatch] = useContext(Context)
//  dispatch({type: 'TYPE', payload: {status: 'A'}})