import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import reducers from './reducers';
import AllNotes from './components/allnotes.js';
import AddNote from './components/addNote.js';
import Details from './components/details.js';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDom.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<BrowserRouter>
			<div className="container">
				<div className="row">
					<div className="customCol">
						<h2>Note Making App - Made with React</h2>
					</div>
				</div>
				<Switch>
					<Route path="/notes/new" component={AddNote} />
					<Route path="/notes/:id" component={Details} />
					<Route path="/" component={AllNotes} />
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>
	, document.getElementById('root'));
