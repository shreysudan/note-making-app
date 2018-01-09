/*import _ from 'lodash';*/
import shortid from 'shortid';

export const SELECT_NOTE = "SELECT_NOTE";
export const CREATE_NOTE = "CREATE_NOTE";
export const FETCH_NOTES = "FETCH_NOTES";
export const DELETE_NOTE = "DELETE_NOTE";

export function fetch_notes() {
	let notes;
	if(!localStorage.notes){
		localStorage.setItem('notes', JSON.stringify([]));
		notes = [];
	} else {
		let retrievedObject = localStorage.getItem('notes');
		console.log(retrievedObject);
		notes = JSON.parse(retrievedObject);
	}

	return {
		type: FETCH_NOTES,
		payload: notes
	};
}

export function select_note(id) {
	let retrievedObject = localStorage.getItem('notes');
	let notes = JSON.parse(retrievedObject);
	let note;
	for(let obj of notes){
		if(obj[id] === id){
			note = obj;
		}
	}

	return {
		type: SELECT_NOTE,
		payload: note
	}
}

export function create_note(values, callback) {
	const created = new Date();
	const id = shortid.generate();
	const newValues = Object.assign({}, values, {created: created}, {id: id});

	if(localStorage.notes){
		let arr = JSON.parse(localStorage.getItem('notes'));
		arr.push(newValues);
		localStorage.setItem('notes', JSON.stringify(arr));
	} else {
		let arr = [newValues];
		localStorage.setItem('notes', JSON.stringify(arr));
	}
	
	callback();

	return {
		type: CREATE_NOTE,
		payload: newValues
	}
}

export function delete_note(id, callback) {
	let notes = JSON.parse(localStorage.getItem('notes'));
	let index;

	for(let note of notes){
		if(note[id] === id){
			index = notes.indexOf(note);
		}
	}
	notes.splice(index, 1);
	console.log(notes);
	localStorage.setItem('notes', JSON.stringify(notes));

	callback();

	return {
		type: DELETE_NOTE,
		payload: id
	}
}