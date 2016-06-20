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

  inputMouseDown(e) {
    if (e.keyCode == 13) {
      this.sendRegisterRequest()
    }
  }

  sendRegisterRequest() {
    ajax(
      '/login',
      this.state.data,
      (data) => {
        if (data.success) {
          window.localStorage.setItem('id', data.userId)
          if (parseInt(data.worker)) {
            window.localStorage.setItem('worker', true)
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
        <div className="form-group" style={{ display: 'inline-block' }}>
          <label htmlFor="exampleInputEmail3">Login</label>
          <input type="login" className="form-control" id="exampleInputEmail3" style={{ margin: 5 + 'px' }} onKeyDown={ this.inputMouseDown.bind(this) } onChange={ this.setUserValues.bind(this, 'username') } />
        </div>
        <div className="form-group" style={{ display: 'inline-block', marginLeft: 10 + 'px'  }}>
          <label htmlFor="exampleInputPassword3">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword3" style={{ margin: 5 + 'px' }} onKeyDown={ this.inputMouseDown.bind(this) } onChange={ this.setUserValues.bind(this, 'password') } />
        </div>
        <button className="btn btn-default" onClick={ this.sendRegisterRequest.bind(this) } style={{ marginTop: '-3px', marginLeft: '15px' }}>Sign in</button>
        {
          this.state.unValid ?
            <p style={{ padding: 10 + 'px', borderRadius: 5 + 'px', backgroundColor: 'rgba(255, 0, 0, 0.4)', color: 'white', width: 300 + 'px' }}>{ this.state.unValid }</p>
          : null
        }
      </section>
    )
  }

}
