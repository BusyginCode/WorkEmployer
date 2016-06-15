import { Resume , Loader} from 'components'
import { ajax } from 'utils'
import { Link } from 'react-router'

export default class Resumes extends React.Component {

  constructor() {
    super()
    this.state = {
      resumes: false,
      resumesCount: 8,
      allResumesCount: 0
    }
  }

  componentWillMount() {
    ajax(
      '/getResumes',
      { count: this.state.resumesCount, samples: (this.props.samples ? true : false) },
      (data) => {
        this.state.resumes = []
        data.resumes.map((resume, key) => {
          this.state.resumes = [...this.state.resumes, {
            post: resume.post,
            id: resume.id,
            userId: resume.userId,
            date: resume.date
          }]
        })
        this.setState({
          resumes: this.state.resumes,
          allResumesCount: data.allResumesCount
        })
      },
    )
  }

  seeResume(resumeId, userId) {
    window.localStorage.setItem("resumeId", resumeId)
    window.localStorage.setItem("seeResumeId", userId)
  }

  generateResumes() {
    return this.state.resumes.map((resume, key) => {
      return (
        <div style={{ position: 'relative' }} key={ key }>
          <Link to="/resume" onClick={ this.seeResume.bind(this, resume.id, resume.userId) }>
            <span style={{ position: 'relative', top: 7 + "px" }}>{ resume.post }</span>
            <span style={{ position: 'absolute', top: 7 + "px", right: 0 }}>{ resume.date }</span>
          </Link>
          <hr />
          {
            this.state.allResumesCount > this.state.resumesCount ?
               <a onClick={ () => { this.setState({ resumesCount: this.state.resumesCount + 8 }); this.componentWillMount();}  }  className="btn btn-default btn-block btn-default">View More</a>
            : null
          }
        </div>
      )
    })
  }

  render() {
    return (
      this.state.resumes ?
        <div style={{ width: 80 + '%', margin: '0 auto', paddingTop: 70 + 'px' }}>
          <h2>{ (!this.props.samples ? "Resumes" : "Samples") }</h2>
        {
          this.state.resumes.length ?
            this.generateResumes()
          : <h2>{ (!this.props.samples ? "Resumes" : "Samples") } not found.</h2>
        }
        </div>
      : <Loader />
    )
  }
}