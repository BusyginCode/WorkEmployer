import { Tip, Loader } from 'components'
import { ajax } from 'utils'

export default class Tips extends React.Component {

  constructor() {
    super()
    this.state = {
      tips: null
    }
  }

  getData() {
    ajax (
      '/getMainData',
      '',
      (data) => {
        this.setState({
          tips: data.tips
        })
      },
      'GET'
    )
  }

  componentDidMount() {
    this.getData()
  }
  
  generateTips() {
    return this.state.tips.map((tip, key) => {
      return (
        <Tip 
          title={ tip.title } 
          img={ tip.img } 
          date={ tip.date } 
          text={ tip.text } 
          key={ key }
        />
      )
    })
  }
  
  render() {
    return(
      <div className="container" style={{ marginTop: 50 + 'px' }}>
        <div style={{ color: '#333' }}>
          <h3>Something new and interesting for you!</h3>
        </div>
        <br />
        {
          this.state.tips ?  
            this.generateTips()
          : <Loader />
        }
      </div>
    )
  }
}
  
