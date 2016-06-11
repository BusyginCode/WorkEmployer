
export default class Tip extends React.Component {

  constructor() {
    super()
    this.state = {
      openTip: false
    }
  }

  openTip(e) {
    this.setState({
      openTip: !this.state.openTip
    })
  }

  render() {
    return(
      <div onClick={ this.openTip.bind(this) } className="post-masonry col-md-4 col-sm-6 wow fadeInUp" style={{ cursor: 'pointer', width: 100 + '%', marginBottom: 15 + 'px' }}>
        <img src={ this.props.img } className="tipImage" alt="blog img" />
        <h3 style={{ display: 'inline-block' }}><span>{ this.props.title }</span></h3>
        <br />
        <small>{ this.props.date }</small>
        <p>
          {
            this.state.openTip ?
              this.props.text
            : this.props.text.slice(0, 1000)
          }
        </p>
      </div>
    )
  }

}