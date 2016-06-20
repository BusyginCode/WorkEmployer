import { ajax } from 'utils'
import { Loader } from 'components'
export default class Resume extends React.Component {

  constructor() {
    super()
    this.state = {
      message: '',
      subject: '',
      error: false
    }
  }

  componentWillMount() {
    if (window.localStorage['resumeId'] || window.localStorage['id']) {
      ajax(
        '/getResume',
        { id: window.localStorage['resumeId'], userId: (window.localStorage['openResumeId'] ? window.localStorage['openResumeId'] : window.localStorage['seeResumeId'] ? window.localStorage['seeResumeId'] : window.localStorage['id']) },
        (data) => {
          this.setState({
              data: {
                name: data.name,
                email: data.email,
                post: data.post,
                phone: data.phone,
                about: data.about,
                city: data.city,
                currentSkill: this.state.currentSkill,
                currentDescription: this.state.currentDescription,
                skills: data.skills,
                companies: data.companies,
                id: window.localStorage['id'],
                education: data.education,
                institution: data.institution,
                profession: data.profession
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

  componentWillUnmount() {
    localStorage.removeItem('resumeId');
    localStorage.removeItem('openResumeId');
  }

  sendFeedback() {
    if (this.state.data.email) {
      ajax(
        '/sendFeedback',
        { subject: this.state.subject, message: this.state.message, email: this.state.data.email, id: window.localStorage['id'] },
        (data) => {
          this.setState({
            subject: '',
            message: '',
            success: true
          })
        }
      )
    }
  }

  setUserValues(value, e) {
    this.state[value] = e.target.value
    this.forceUpdate()
  }

  render() {
    return(
      this.state.data && !this.state.error ?
        <div id="doc2" className="yui-t7">
          {
            window.localStorage['openResumeId'] && this.state.data.email ?
              <div className="form-group" style={{ marginBottom: '15px', marginTop: '80px', marginLeft: '50px', maxWidth: '50%' }}>
                <h2>Invitation</h2>
                <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
                <input className="form-control" id="subject" value={ this.state.subject } onChange={ this.setUserValues.bind(this, 'subject') } />
                <br />
                <label className="col-sm-2 control-label">Message</label>
                <textarea className="form-control" rows="3" value={ this.state.message } onChange={ this.setUserValues.bind(this, 'message') }></textarea>
                {
                  this.state.subject && this.state.message ?
                    <button style={{ marginTop: 10 + 'px' }} className="btn btn-default" onClick={ this.sendFeedback.bind(this) }>Send invitation</button>
                  : null
                }
                {
                  this.state.success ?
                    <p style={{ color: 'green', marginTop: 10 + 'px', width: '50%', background: 'rgba(0,255,0,0.2)', borderRadius: '5px', padding: '5px', textAlign: 'center' }}>Success</p>
                  : null
                }
              </div>
            : null
          }
          <div id="inner">
            <div id="hd">
              <div className="yui-gc">
                <div className="yui-u first">
                {
                  this.state.data.name ?
                    <h1>{ this.state.data.name }</h1>
                  : null
                }
                {
                  this.state.data.post ?
                    <h2>{ this.state.data.post }</h2>
                  : null
                }
                {
                  this.state.data.city ?
                    <h2>{ this.state.data.city }</h2>
                  : null
                }
                </div>
                <div className="yui-u">
                  <div className="contact-info">
                    {
                      this.state.data.email ?
                        <h3><a>{ this.state.data.email }</a></h3>
                      : null
                    }
                    {
                      this.state.data.phone ?
                        <h3>{ this.state.data.phone }</h3>
                      : null
                    } 
                  </div>
                </div>
              </div>
            </div>
            <div id="bd">
              <div id="yui-main">
                <div className="yui-b">
                  <div className="">
                    <div className="yui-u first">
                      <h2>Profile</h2>
                    </div>
                    <div className="yui-u">
                    {
                      this.state.data.about ?
                        <p className="enlarge">{ this.state.data.about }</p>
                      : null
                    }
                    </div>
                  </div>
                  {
                    this.state.data.skills ?
                      <div className="">
                        <div className="yui-u first" style={{ marginBottom: -20 + 'px' }}>
                          <h2>Skills</h2>
                        </div>
                        <div className="yui-u">
                          {
                            this.state.data.skills ?
                              this.state.data.skills.map((skill, key) => {
                                return (
                                  <div className="talent" key={ key }>
                                    <h3>{ skill.skill }</h3>
                                    <p>{ skill.description }</p>
                                  </div>
                                )
                              })
                            : <Loader />
                          }
                        </div>
                      </div>
                    : null
                  }
                  <br /><hr />
                  {
                    this.state.data.companies && this.state.data.companies.length ?
                      <div className="yui-gf" style={{ marginBottom: -20 + 'px' }}>
                        <div className="yui-u first">
                          <h2>Experience</h2>
                        </div>
                        <div className="yui-u">
                          {
                            this.state.data.companies ?
                              this.state.data.companies.map((company, key) => {
                                return (
                                  <div className="job" key={ key }>
                                    <h2>{ company.company }</h2>
                                    <h4>{ company.date }</h4>
                                    <p>{ company.expirience }</p>
                                  </div>
                                )
                              })
                            : <Loader />
                          }
                        </div>
                      </div>
                    : null
                  }
                  <br />
                  <div className="last">
                    {
                      this.state.data.education ?
                        <div className="yui-u first">
                          <h2>Education: { this.state.data.education }</h2>
                        </div>
                      : null
                    }
                    <div className="yui-u">
                    {
                      this.state.data.institution ?
                        <h2>Institution: { this.state.data.institution }</h2>
                      : null
                    }
                    {
                      this.state.data.profession ?
                        <h3>Profession: { this.state.data.profession }</h3>
                      : null
                    }
                    </div>
                  </div>
                  <br /><br /><br /><br />
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