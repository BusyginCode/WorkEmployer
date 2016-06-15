import { ajax } from 'utils'
import { Loader, UserMainResume, CreateResume } from 'components'
import { Link } from 'react-router'

export default class UserMain extends React.Component {

  constructor() {
    super()
    this.state = {
      username: '',
      email: '',
      resumes: null,
      edit: false,
      resumeId: false
    }
  }

  componentWillMount() {
    ajax(
      '/getUserInfo',
      { id: window.localStorage['id'] },
      (data) => {
        this.setState({
          username: data.username,
          email: data.email,
          resumes: data.resumes
        })
      },
    )
  }

  componentWillUpdate() {
    this.state.edit = false
  }

  changeEdit = (resumeId) => {
    this.setState({
      edit: !this.state.edit,
      resumeId: resumeId
    })
  };

  updateComponent() {
    ajax(
      '/getUserInfo',
      { id: window.localStorage['id'] },
      (data) => {
        this.setState({
          username: data.username,
          email: data.email,
          resumes: data.resumes
        })
      },
    )
  }

  generateResumes() {
    return this.state.resumes.map((resume, key) => {
      return (
        <UserMainResume 
          post={ resume.post } 
          key={ key } 
          id={ resume.id } 
          userId={ resume.userId }
          post={ resume.post } 
          updateComponent={ this.updateComponent.bind(this) }
          changeEdit={ this.changeEdit }
        />
      )
    })
  }

  render() {
    return(
      this.state.edit ?
        <CreateResume edit changeEdit={ this.changeEdit } resumeId={ this.state.resumeId } />
      :
        this.state.username ?  
          <div className="post-masonry col-md-4 col-sm-6 wow fadeInUp" style={{ width: 90 + '%', margin: 50 + 'px', marginTop: 100 + 'px', color: 'gray' }}>
            <section className="userHeader">
              <span style={{ fontSize: 25 + 'pt' }}>Hello { this.state.username }</span><br /><br />
              <span>{ this.state.email }</span>
              <Link to="/createResume" className="btn btn-default" style={{ marginLeft: 50 + 'px' }}>Create resume</Link>
              <hr />
            </section>
            <section className="userResumes">
            {
              this.state.resumes && this.state.resumes.length !== 0 ?
                this.generateResumes()
              : this.state.resumes.length == 0 ?
                <div>Do not have resumes</div>
              : <Loader />
            }
            </section>
          </div>
        : <Loader />
    )
  }
}