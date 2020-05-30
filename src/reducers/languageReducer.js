import { SELECT_LANGUAGE } from '../data/actionTypes';

const LanguageReducer = (state = '', action) => {

    if (action.type === SELECT_LANGUAGE) {
        return action.payload;
    }
    return state;
}

export default LanguageReducer;