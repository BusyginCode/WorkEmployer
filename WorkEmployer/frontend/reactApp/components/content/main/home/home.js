import { scrollToElement } from 'utils'
import { Link } from 'react-router'
import { SignInForm } from 'components'

export default class Home extends React.Component {

  constructor() {
    super()
    this.state = {
      signFormOpen: false
    }
  }

  signUp() {
    scrollToElement('contact')
  }

  signIn() {
    this.setState({
      signFormOpen: !this.state.signFormOpen
    })
  }

  render() {
    return(
      <div>
      {
          this.state.signFormOpen ?
            <SignInForm />
          : null
        }
        <section id="home" className="parallax-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <h3 className="wow fadeInDown" data-wow-delay="0.2s">FIND WORK IS SO EASY!</h3>
                <h1 className="wow fadeInDown">WORKER && EMPLOYER</h1>
                <a href="#" className="btn btn-danger wow fadeInUp" data-wow-delay="0.3s" onClick={ this.signUp.bind(this) }>SIGN UP</a>
                <a to="/feachures" className="btn btn-default smoothScroll wow fadeInUp" onClick={ this.signIn.bind(this) }>SIGN IN</a>
              </div>
            </div>
          </div>    
        </section>
      </div>
    )
  }

}

