import { ajax } from 'utils'

export default class SignInForm extends React.Component {

  constructor() {
    super()
    this.state = {
      unValid: false,
      data: {
        username: '',
        password: ''
      }
    }
  }

  setUserValues(value, e) {
    this.state.unValid = false
    this.state.data[value] = e.target.value
    this.forceUpdate()
  }

  sendRegisterRequest() {
    ajax(
      '/login',
      this.state.data,
      (data) => {
        if (data.success) {
          window.localStorage.setItem('id', data.userId)
          if (parseInt(data.worker)) {
            window.location.href = '/worker/'
          } else {
            window.location.href = '/user/'
          }
        } else {
          this.setState({
            unValid: (data.errorCode == 1 ? 'user not found' : false)
          })
        }
      },
      "POST",
    )
  }

  render() {

    return (
      <section style={{ marginTop: 50 + 'px', padding: 10 + 'px' }}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail3">Login</label>
          <input type="login" className="form-control" id="exampleInputEmail3" style={{ margin: 5 + 'px' }} onChange={ this.setUserValues.bind(this, 'username') } />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword3">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword3" style={{ margin: 5 + 'px' }} onChange={ this.setUserValues.bind(this, 'password') } />
        </div>
        <button className="btn btn-default" onClick={ this.sendRegisterRequest.bind(this) }>Sign in</button>
        {
          this.state.unValid ?
            <p style={{ marginTop: 10 + 'px', padding: 10 + 'px', borderRadius: 5 + 'px', backgroundColor: 'rgba(255, 0, 0, 0.4)', color: 'white', width: 300 + 'px' }}>{ this.state.unValid }</p>
          : null
        }
      </section>
    )
  }

}
