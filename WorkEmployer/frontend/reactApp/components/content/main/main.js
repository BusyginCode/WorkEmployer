import { 
  EmployerContact, 
  MainTips, 
  Counter, 
  Home, 
  Description 
} from 'components'
import { ajax } from 'utils'

export default class MainContent extends React.Component {

  constructor() {
    super()
    this.state = {
      employers: 0,
      developers: 0,
      tips: []
    }
  }

  getData() {
    ajax (
      '/getMainData',
      '',
      (data) => {
        this.setState({
          employers: data.employers,
          developers: data.developers,
          tips: data.tips.slice(0, 6)
        })
      },
      'GET'
    )
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    return(
      <div>
        <Home />
        <Description />
        <Counter employers={ this.state.employers } developers={ this.state.developers } />
        <MainTips tips={ this.state.tips } />
        <EmployerContact />
      </div>
    )
  }

}