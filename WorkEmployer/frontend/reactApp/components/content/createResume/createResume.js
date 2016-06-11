import { ajax } from 'utils'
import { Loader, UserMainResume } from 'components'
import { Link } from 'react-router'

export default class CreateResume extends React.Component {

  constructor() {
    super()
    this.state = {
      data: {
        name: '',
        email: '',
        post: '',
        phone: '',
        about: '',
        currentSkill: '',
        city: '',
        currentDescription: '',
        skills: [],
        currentCompany: '',
        currentExpirience: '',
        companies: [],
        id: window.localStorage['id']
      }
    }
  }

  componentWillMount() {
    if (this.props.edit) {
      ajax(
        '/getResume',
        { id: this.props.resumeId, userId: window.localStorage['id'] },
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
              city: data.city,
              companies: data.companies,
              id: window.localStorage['id']
            }
          })
        }
      )
    }
  }

  sendResume() {
    if (this.props.edit) {
      ajax(
        '/editResume',
        { resumeId: this.props.resumeId, data: this.state.data },
      )
      this.props.changeEdit()
    } else {
      ajax(
        '/addResume',
        this.state.data,
      )
    }
  }

  addSkill() {
    this.state.data.skills = [...this.state.data.skills, {
      skill: this.state.data.currentSkill,
      description: this.state.data.currentDescription
    }]
    this.state.data.currentSkill = ''
    this.state.data.currentDescription = ''
    this.setState({
      data: this.state.data,
    })
  }

  addCompany() {
    this.state.data.companies = [...this.state.data.companies, {
      company: this.state.data.currentCompany,
      expirience: this.state.data.currentExpirience
    }]
    this.state.data.currentCompany = ''
    this.state.data.currentExpirience = ''
    this.setState({
      data: this.state.data,
    })
  }

  deleteSkill(key) {
    this.state.data.skills.splice(key, 1)
    this.setState({
      data: this.state.data
    })
  }

  deleteCompany(key) {
    this.state.data.companies.splice(key, 1)
    this.setState({
      data: this.state.data
    })
  }

  setUserValues(value, e) {
    this.state.data[value] = e.target.value
    this.forceUpdate()
  }

  render() {
    return(
      <div className="post-masonry col-md-4 col-sm-6 wow fadeInUp" style={{ width: 90 + '%', margin: 50 + 'px', marginTop: 100 + 'px', color: 'gray' }}>
        <div className="form-group">
          <label htmlFor="name" className="col-sm-2 control-label">First name, Last name</label>
          <input className="form-control" id="name" placeholder="name" onChange={ this.setUserValues.bind(this, 'name') } value={ this.state.data.name } />
        </div>
        <div className="form-group">
          <label htmlFor="post" className="col-sm-2 control-label">Post</label>
          <input className="form-control" id="post" placeholder="Post" onChange={ this.setUserValues.bind(this, 'post') } value={ this.state.data.post } />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="col-sm-2 control-label">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Email" onChange={ this.setUserValues.bind(this, 'email') } value={ this.state.data.email } />
        </div>
        <div className="form-group">
          <label htmlFor="city" className="col-sm-2 control-label">City</label>
          <input className="form-control" id="city" placeholder="City" onChange={ this.setUserValues.bind(this, 'city') } value={ this.state.data.city } />
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="col-sm-2 control-label">Phone</label>
          <input className="form-control" id="phone" placeholder="Phone" onChange={ this.setUserValues.bind(this, 'phone') } value={ this.state.data.phone } />
        </div>
        <div className="form-group">
          <label htmlFor="about" className="col-sm-2 control-label">About</label>
          <textarea className="form-control" id="about" rows="3" onChange={ this.setUserValues.bind(this, 'about') } value={ this.state.data.about }></textarea>
        </div>
        <hr />
        {
          this.state.data.skills && this.state.data.skills.length > 0 ?
            this.state.data.skills.map((skill, key) => {
              return (
                <div key={ key } style={{ display: 'inline-block', marginRight: 15 + 'px', marginBottom: 15 + 'px' }}>
                  <br />
                  <span style={{ fontWeight: 600 }}>Skill&nbsp;&nbsp;&nbsp;</span>
                  <span>{ skill.skill }</span>
                  <br />
                  <div>
                    <span style={{ fontWeight: 600 }}>Description&nbsp;&nbsp;&nbsp;</span>
                    <div style={{ maxWidth: 700 + 'px' }}>{ skill.description }</div>
                  </div>
                  <br />
                  <button className="btn btn-default" onClick={ this.deleteSkill.bind(this, key) }>Delete skill</button>
                </div>
              )
            })
          : null
        }
        <br />
        <hr />
        <div className="form-group">
          <label htmlFor="skill" className="col-sm-2 control-label">Skill</label>
          <input className="form-control" id="skill" placeholder="Skill" value={ this.state.data.currentSkill } onChange={ this.setUserValues.bind(this, 'currentSkill') } />
          <br />
          <label className="col-sm-2 control-label">Description</label>
          <textarea className="form-control" rows="3" value={ this.state.data.currentDescription } onChange={ this.setUserValues.bind(this, 'currentDescription') }></textarea>
        </div>
        <button type="submit" className="btn btn-default" onClick={ this.addSkill.bind(this) }>Add skill</button>
        <hr />
        {
          this.state.data.companies && this.state.data.companies.length > 0 ?
            this.state.data.companies.map((company, key) => {
              return (
                <div key={ key } style={{ display: 'inline-block', marginRight: 15 + 'px', marginBottom: 15 + 'px' }}>
                  <br />
                  <span style={{ fontWeight: 600 }}>Company&nbsp;&nbsp;&nbsp;</span>
                  <span>{ company.company }</span>
                  <br />
                  <div>
                    <span style={{ fontWeight: 600 }}>Expirience&nbsp;&nbsp;&nbsp;</span>
                    <div style={{ maxWidth: 700 + 'px' }}>{ company.expirience }</div>
                  </div>
                  <br />
                  <button className="btn btn-default" onClick={ this.deleteCompany.bind(this, key) }>Delete company</button>
                </div>
              )
            })
          : null
        }
        <hr />
        <div className="form-group">
          <label htmlFor="skill" className="col-sm-2 control-label">Company</label>
          <input className="form-control" id="skill" placeholder="Skill" value={ this.state.data.currentCompany} onChange={ this.setUserValues.bind(this, 'currentCompany') } />
          <br />
          <label className="col-sm-2 control-label">Expirience</label>
          <textarea className="form-control" rows="3" value={ this.state.data.currentExpirience } onChange={ this.setUserValues.bind(this, 'currentExpirience') }></textarea>
        </div>
        <button type="submit" className="btn btn-default" onClick={ this.addCompany.bind(this) }>Add expirience point</button>
        <hr />
        <div className="form-group">
          <div>
            <Link to="/user/" className="btn btn-default" onClick={ this.sendResume.bind(this) } style={{ marginTop: 10 + 'px' }}>{this.props.edit ? "Edit complete" : "Add resume"}</Link>
          </div>
        </div>
      </div>
    )
  }
}