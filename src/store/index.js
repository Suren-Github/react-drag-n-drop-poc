import { combineReducers, createStore,applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

// import ProductReducer from '../reducers/product-reducer';
// import CartReducer from '../reducers/cart-reducer';
import LanguageReducer from '../reducers/languageReducer';

const Reducers = combineReducers({
    selectedLanguage: LanguageReducer,
    // productList : ProductReducer,
    // loginStatus : LoginReducer,
    // cart:CartReducer
});

export const store = createStore(Reducers, applyMiddleware(ReduxThunk));