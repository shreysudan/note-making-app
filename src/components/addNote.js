import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { create_note } from '../actions';
/*import _ from 'lodash';*/

class AddNote extends Component {
	renderField(field) {
		return (
			<div className="form-group has-error">
				<label>{field.title}</label>
				<input
					className = "form-control"
					type="text"
					{...field.input}
				/>
				<div className="text-help">
					{field.meta.touched ? field.meta.error : ''}
				</div>
			</div>
		)
	}

	renderFieldArea(field) {
		return (
			<div className="form-group has-error">
				<label>{field.title}</label>
				<textarea
					className = "form-control"
					{...field.input}
				/>
				<div className="text-help">
					{field.meta.touched ? field.meta.error : ''}
				</div>
			</div>
		)
	}

	onSubmit(values) {
		/*const date = Date.now();
		const id = _.uniqueId();
		const newValues = Object.assign({}, values, {date: date}, {id: id});
		console.log(newValues);*/
		this.props.create_note(values, () => {this.props.history.push('/')});
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<div className="container">
				<h3>Add a new Note</h3>

				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<Field
						title="Title"
						name="title"
						component={this.renderField}
					/>
					<Field
						title="Content"
						name="content"
						component={this.renderFieldArea}
					/>
					<div className="buttons">
						<button type="submit" className="btn btn-primary">Submit</button>
						<Link to="/" className="btn btn-danger button">Go Back</Link>
					</div>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};
	if(!values.title){
		errors.title = "Please enter a Title";
	}

	if(!values.content){
		errors.content = "Please enter some content for the note"
	}

	return errors;
}

export default reduxForm({
	validate: validate,
	form: 'PostsNewForm'
})(connect(null, { create_note: create_note})(AddNote)); 

