import { Header, Footer, Sidebar } from 'components'
import BrowserHistory from 'react-router'

export default class Main extends React.Component {

  render() {
    //console.log(window.location.pathname)
    return(
      <div>
        <Header />
        {
          <div className="mainContainer">
          { //(window.location.pathname !== '/' ? <Sidebar /> : null) 
        }
          { 
            this.props.children 
          }
          </div>
        }
        <Footer />
      </div>
    )
  }
}

