import _ from 'lodash';
import { SELECT_NOTE, CREATE_NOTE, FETCH_NOTES, DELETE_NOTE } from '../actions/index';

export default function(state = {}, action){
	switch(action.type){
		case FETCH_NOTES:
			return _.mapKeys(action.payload, 'id');

		case SELECT_NOTE:
			return state;

		case DELETE_NOTE:
			return _.omit(state, action.payload);
		

		case CREATE_NOTE:
			return {...state, [action.payload.id]: action.payload};

		default:
			return state;
	}
}