import { ajax } from 'utils'
import { Loader } from 'components'
export default class Resume extends React.Component {

	constructor() {
		super()
		this.state = {}
	}

	componentWillMount() {
		if (window.localStorage['resumeId'] && window.localStorage['id']) {
			ajax(
				'/getResume',
				{ id: window.localStorage['resumeId'], userId: window.localStorage['id'] },
				(data) => {
					this.setState({
	            data: {
	              name: data.name,
	              email: data.email,
	              post: data.post,
	              phone: data.phone,
	              about: data.about,
	              currentSkill: this.state.currentSkill,
	              currentDescription: this.state.currentDescription,
	              skills: data.skills,
	              companies: data.companies,
	              id: window.localStorage['id']
	            }
	          })
				}
			) 
		} else {
			this.setState({
				error: 'Can not open resume, try later'
			})
		}
	}

	render() {
		return(
			this.state.data && !this.state.error ?
				<div id="doc2" className="yui-t7">
				  <div id="inner">
				    <div id="hd">
				      <div className="yui-gc">
				        <div className="yui-u first">
				          <h1>{ this.state.data.name }</h1>
				          <h2>{ this.state.data.post }</h2>
				        </div>
				        <div className="yui-u">
				          <div className="contact-info">
				            <h3><a href="#">{ this.state.data.email }</a></h3>
				            <h3>{ this.state.data.phone }</h3>
				          </div>
				        </div>
				      </div>
				    </div>
				    <div id="bd">
				      <div id="yui-main">
				        <div className="yui-b">
				          <div className="yui-gf">
				            <div className="yui-u first">
				              <h2>Profile</h2>
				            </div>
				            <div className="yui-u">
				              <p className="enlarge">{ this.state.data.about }</p>
				            </div>
				          </div>
				          <div className="yui-gf">
				            <div className="yui-u first">
				              <h2>Skills</h2>
				            </div>
				            <div className="yui-u">
				            	{
				            		this.state.data.skills ?
					            		this.state.data.skills.map((skill, key) => {
					            			return (
					            				<div className="talent" key={ key }>
								                <h2>{ skill.skill }</h2>
								                <p>{ skill.description }</p>
								              </div>
					            			)
					            		})
					            	: <Loader />
				            	}
				            </div>
				          </div>
				          <div className="yui-gf">
				            <div className="yui-u first">
				              <h2>Experience</h2>
				            </div>
				            <div className="yui-u">
				            	{
				            		this.state.data.companies ?
					            		this.state.data.companies.map((company, key) => {
					            			return (
					            				<div className="job" key={ key }>
								                <h2>Facebook</h2>
								                <h3>{ company.company }</h3>
								                <h4>2005-2007</h4>
								                <p>{ company.expirience }</p>
								              </div>
					            			)
					            		})
					            	: <Loader />
				            	}
				            </div>
				          </div>
				          <div className="yui-gf last">
				            <div className="yui-u first">
				              <h2>Education</h2>
				            </div>
				            <div className="yui-u">
				              <h2>Indiana University - Bloomington, Indiana</h2>
				              <h3>Dual Major, Economics and English &mdash; <strong>4.0 GPA</strong> </h3>
				            </div>
				          </div>
				        </div>
				      </div>
				    </div>
				  </div>
				</div>
			: this.state.error ? 
					<h2 style={{ marginTop: 100 + 'px', marginLeft: 30 + 'px' }}>{ this.state.error }</h2>
				: <Loader />
		)
	}
}