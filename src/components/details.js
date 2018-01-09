import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { select_note, delete_note } from '../actions';

class Details extends Component {
	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.select_note(id);
	}

	handleDelete() {
		const { id } = this.props.match.params;
		this.props.delete_note(id, () => this.props.history.push('/'));
	}

	render() {
		const { note } = this.props;

		if(!note){
			return <div>Loading...</div>;
		}

		return (
			<div className="container">
				<h4>Title</h4> 
				<p>{ note.title }</p>
				<h4>Content</h4>
				<p>{ note.content }</p>
				<h4>Created on</h4>
				<p> { note.created.toString() }</p>
				<div className="container">
					<div className="buttons">
						<Link to="/" className="btn btn-secondary">Go Back To Main Page</Link>
						<button	className="btn btn-danger" onClick={this.handleDelete.bind(this)}> Delete </button>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({notes}, ownProps){
	return {note: notes[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {select_note: select_note, delete_note: delete_note})(Details); 