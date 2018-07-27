import { combineReducers } from 'redux';
import { commentReducer } from '../modules/comment';
import { movieReducer } from '../modules/movie';
import { personReducer } from '../modules/person';

const makeRootReducer = combineReducers({
    movie: movieReducer,
    person: personReducer,
    comment: commentReducer
});

export default makeRootReducer;