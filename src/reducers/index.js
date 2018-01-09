import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import NotesReducer from './reducer_notes';

const rootReducer = combineReducers({
	notes: NotesReducer,
	form: formReducer
});

export default rootReducer;