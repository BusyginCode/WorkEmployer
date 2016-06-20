import { Tip, Loader } from 'components'
import { ajax } from 'utils'

export default class Tips extends React.Component {

  constructor() {
    super()
    this.state = {
      tips: null,
      tipsCount: 4
    }
  }

  getData() {
    ajax (
      '/getMainData',
      '',
      (data) => {
        this.setState({
          tips: data.tips,
          tipsAllCount: data.tipsAllCount
        })
      },
      'GET'
    )
  }

  componentDidMount() {
    this.getData()
  }
  
  generateTips() {
    let tips = []
    if (this.state.tipsAllCount > this.state.tipsCount) {
      tips = this.state.tips.slice(0, this.state.tipsCount)
    } else {
      tips = this.state.tips
    }
    return tips.map((tip, key) => {
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
        <div>
          {
            this.state.tipsAllCount > this.state.tipsCount ?
               <a onClick={ () => { this.setState({ tipsCount: this.state.tipsCount + 8 }, () => { this.componentWillMount(); }); }  } style={{ width: 100 + '%' }}  className="btn btn-default">View More</a>
            : null
          }
        </div>
      </div>
    )
  }
}
  
