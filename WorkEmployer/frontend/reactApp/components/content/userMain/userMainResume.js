import { ajax } from 'utils'
import { Link } from 'react-router'
export default class UserMainResume extends React.Component {

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

  deleteResume(e) {
    e.stopPropagation()
    ajax(
      '/deleteResume',
      { id: this.props.id, post: this.props.post, userId: this.props.userId },
      (data) => {
        this.props.updateComponent()
      }
    )
  }

  openResume() {
    window.localStorage.setItem("resumeId", this.props.id)
  }

  render() {
    return(
      <div style={{ position: 'relative' }}>
        <Link to="/resume" onClick={ this.openResume.bind(this) }>
          <span style={{ position: 'relative', top: 7 + "px" }}>{ this.props.post }</span>
        </Link>
        <span style={{ position: 'absolute', right: 10, top: 0 }}>
          <button type="button" className="btn btn-default" onClick={ () => this.props.changeEdit(this.props.id) }>Change</button>
          <button type="button" onClick={ this.deleteResume.bind(this) } className="btn btn-default" style={{ marginLeft: 5 + 'px' }}>Delete</button>
        </span>
        <hr />
      </div>
    )
  }

}