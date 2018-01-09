import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetch_notes, select_note } from '../actions/index.js';
import _ from 'lodash';

class AllNotes extends Component  {
	componentDidMount() {
		this.props.fetch_notes();
	}

	handleClick(id){
		this.props.history.push(`/notes/${id}`);
	}

	renderNotes() {
		return _.map(this.props.notes, (note) => {
			return (
				<tr key={note.id} onClick={this.handleClick.bind(this, note.id)}>
					<td key={note.title}>{note.title}</td>
					<td key={note.content}>{note.content.substring(0,100)}</td>
					<td key={note.created}>{note.created.toString()}</td>
				</tr>
			);
		});
	}

	render() {
		return (
			<div className="container">
				<table className="table">
					<thead>
						<tr>
      						<th scope="col">Title</th>
      						<th scope="col">Content</th>
      						<th scope="col">Created On</th>
    					</tr>
    				</thead>
    				<tbody>
    						{this.renderNotes()}
    				</tbody>					
				</table>
				<div className="buttons">
					<Link className="btn btn-primary" to="/notes/new">
						Add a New Note
					</Link>
				</div>				
			</div>
		);
	}
}


function mapStateToProps(state){
	return {
		notes: state.notes
	};
}


function mapDispatchToProps(dispatch){
	return bindActionCreators({fetch_notes: fetch_notes, select_note: select_note}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AllNotes);