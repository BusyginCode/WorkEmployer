import { ajax } from 'utils'
import { Loader } from 'components'
export default class EmployerContact extends React.Component {

  constructor() {
    super()
    this.state = {
      worker: false,
      data: {
        login: '',
        password: '',
        email: '',
        description: '',
      },
      wait: false,
      unValid: false
    }
  }

  workerChange() {
    this.setState({
      worker: !this.state.worker
    })
  }

  setUserValues(value, e) {
    this.state.unValid = false
    this.state.data[value] = e.target.value
    this.forceUpdate()
  }

  checkValid(value, regexp) {
    if (!regexp.test(this.state.data[value])) { 
      this.setState({
        unValid: value
      })
    }
  }

  sendRegisterRequest() {
    this.setState({
      wait: true
    })
    for (let val in this.state.data) {
      if ((this.state.data[val].length < 6 && val !== 'description') || this.state.unValid) {
        this.setState({
          wait: false,
          unValid: val
        })
        return
      }
    }
    ajax(
      '/addUser',
      this.state.data,
      (data) => {
        if (data.success) {
          if (parseInt(data.worker)) {
            window.location.href = '/worker/'
            window.localStorage.setItem('worker', true)
          } else {
            window.location.href = '/user/'
          }
          window.localStorage.setItem('id', data.userId)
        } else {
          this.setState({
            unValid: (data.errorCode == 1 ? { error: 'email is used' } : data.errorCode == 2 ? { error: 'password is used' } : data.errorCode == 3 ? { error: 'username is used' } : false)
          })
          this.setState({
            wait: false
          })
        }
      },
      "POST",
    )
  }

  render() {

    return (
      <section id="contact" className="parallax-section">
        {
          this.state.wait ?
            <img src="/static/images/loading.gif" style={{ width: 200 + 'px' }} />
          :
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 wow fadeInDown" data-wow-delay="0.6s" id="registrationForm">
              <div className="col-md-12 col-sm-12">
                <input type="text" className="form-control" placeholder="Login" name="Username" id="login" onBlur={ this.checkValid.bind(this, 'login', /^[a-zA-Z]*$/) } onChange={ this.setUserValues.bind(this, 'login') } />
                <input type="email" className="form-control" placeholder="Email" name="email" id="email" onBlur={ this.checkValid.bind(this, 'email', /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/) } onChange={ this.setUserValues.bind(this, 'email') } />
                <input type="password" className="form-control" placeholder="Password" name="password" onBlur={ this.checkValid.bind(this, 'password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/) } onChange={ this.setUserValues.bind(this, 'password') } />  
                <label htmlFor="code" style={{ marginRight: 10 + 'px', marginTop: -5 + 'px', color: 'white' }}>Worker</label>
                <input type="checkbox" style={{ position: 'absolute' }} onClick={ this.workerChange.bind(this) } />
                {
                  this.state.worker ?
                    <textarea className="form-control" rows="3" placeholder="Company description" onChange={ this.setUserValues.bind(this, 'description') }></textarea>
                  : null
                }
                {
                  this.state.unValid ?
                    <p className="text-danger" style={{ padding: 10 + 'px', borderRadius: 5 + 'px', backgroundColor: 'white' }}>{ (!this.state.unValid.error ? this.state.unValid + " is invalid" : this.state.unValid.error) }</p>
                  : null
                }
              </div>
              <div className="col-md-6 col-sm-6">
                <button className="form-control" onClick={ this.sendRegisterRequest.bind(this) }>Sign</button>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 wow fadeInUp" data-wow-delay="0.9s">
              <div className="contact-detail">
                <h2>CONTACT US</h2>
                  <div>
                    <h4>Worker && Employer</h4>
                    <p>160 New Smooth Road, San Francisco, California</p>
                  </div>
                  <div>
                    <h4>Talk to Us</h4>
                    <p>Email: workemployer@gmail.com</p>
                    <p>Tel: 010-020-0770 &nbsp;&nbsp;&nbsp; Fax: 090-080-0430</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
        }
      </section>
    )
  }

}

