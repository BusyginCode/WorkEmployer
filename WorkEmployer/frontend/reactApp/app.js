import { 
	Main, 
	MainContent, 
	Resumes, 
	Feachures, 
	Tips, 
	UserMain, 
	CreateResume, 
	Resume,
	WorkerMain,
	Samples
} from 'components'

import { Route, Router, IndexRoute } from 'react-router'
import { createHistory } from 'history'

const history = createHistory()

ReactDOM.render(
	<Router history={ history }>
		<Route path="/" component={ Main }>
			<IndexRoute component={ MainContent } />
			<Route path="/resumes" component={ Resumes } />
			<Route path="/resume" component={ Resume } />
			<Route path="/tips" component={ Tips } />
			<Route path="/feachures" component={ Feachures } />
			<Route path="/user" component={ UserMain } />
			<Route path="/worker" component={ WorkerMain } />
			<Route path="/createResume" component={ CreateResume } />
			<Route path="*" component={ MainContent } />
	  </Route>
	</Router>
, document.getElementById('root'))
