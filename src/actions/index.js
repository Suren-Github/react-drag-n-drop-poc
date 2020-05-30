import { SELECT_LANGUAGE } from '../data/actionTypes';

export const selectLanguage = (payload) => {
    return {
        type: SELECT_LANGUAGE,
        payload
    }
}