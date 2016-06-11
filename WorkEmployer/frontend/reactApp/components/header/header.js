import { Link } from 'react-router'
import { ajax } from 'utils'

export default class Header extends React.Component {

  logOut() {
    ajax(
      '/logout',
      '',
      (data) => {
        window.localStorage.clear();
        this.forceUpdate()
      }
    )
  }

  render() {
    return(
      <section className="navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="">
            <button className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="icon icon-bar"></span>
              <span className="icon icon-bar"></span>
              <span className="icon icon-bar"></span>
            </button>
            <Link to={'/'} className="navbar-brand">W&E</Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right main-navigation">
              {
                window.localStorage['id'] ?
                  <li><Link to={ window.localStorage['worker'] ? '/worker/' : '/user/'}>PROFILE</Link></li>
                : null
              }
              <li><Link to={'/'}>HOME</Link></li>
              <li><Link to={'/tips'}>TIPS</Link></li>
              <li><Link to={'/resumes'}>RESUMES</Link></li>
              <li><Link to={'/samples'}>SAMPLES</Link></li>
              <li><Link to={'/feachures'}>FEACHURES</Link></li>
              {
                window.localStorage['id'] ?
                  <li><Link to='/' onClick={ this.logOut.bind(this) }>Log out</Link></li>
                : null
              }
            </ul>
          </div>
        </div>
      </section>
    )
  }
  
}