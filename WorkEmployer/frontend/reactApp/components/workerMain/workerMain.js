import { Loader } from 'components'
import { ajax } from 'utils'

export default class WorkerMain extends React.Component {

  constructor() {
    super()
    this.state = {
      data: '',
      post: '',
      city: '',
      dateOpen: false,
      postOpen: false,
      cityOpen: false,
      resumesCount: 8,
      allResumesCount: 0
    }
  }

  openMenu(value) {
    this.state[value] = !this.state[value]
    this.forceUpdate()
  }

  setFilters(value, e) {
    this.state[value] = e.target.value
    this.forceUpdate()
  }

  componentWillMount() {
    let data = {}
    for (let i in this.state) {
      if ((i == 'post' || i == 'city' || i == 'data') && this.state[i]) {
        data[i] = this.state[i]
      }
    }
    console.log(data)
    ajax(
      '/getWorkerInfo',
      { id: window.localStorage['id'], data: (Object.keys(data).length > 0 ? data : false), count: this.state.resumesCount },
      (data) => {
        this.setState({
          username: data.username,
          email: data.email,
          description: data.description,
          resumes: data.resumes,
          allResumesCount: data.allResumesCount
        })
      },
    )
  }

  render() {
    return (
      this.state.username ?
        <div style={{ marginTop: 50 + 'px', marginBottom: -120 + 'px'}}>
            <div className="sidebar-collapse" style={{ marginLeft: 10 + 'px', maxWidth: 400 + 'px', display: 'inline-block', minWidth: 250 + 'px', position: 'absolute' }}>
              <ul className="nav" id="main-menu">
                <li>
                  <div style={{ color: 'gray', fontWeight: 'bold', textAlign: 'center', margin: 10 + 'px' }}>
                    <div className="inner-text">
                        { this.state.username }
                      <br />
                      <small>{ this.state.email }</small>
                    </div>
                  </div>
                </li>
                <li className={ this.state.dateOpen ? 'active' : '' }>
                    <a style={{ cursor: 'pointer' }} onClick={ this.openMenu.bind(this, "dateOpen") } className="menu-top"><i className="fa fa-edit "></i>Date<span className="fa arrow"></span></a>
                    { 
                      this.state.dateOpen ?
                        <ul className="nav nav-second-level">
                          <li>
                            <a><input type="date" className="form-control" onChange={ this.setFilters.bind(this, "data") } value={ this.state.data } /></a>
                          </li>
                          <li>
                            <a style={{ cursor: 'pointer' }} onClick={ () => this.setState({ data: '' }) }>Clear</a>
                          </li>
                        </ul>
                      : null
                    }
                </li>
                <li className={ this.state.postOpen ? 'active' : '' }>
                  <a style={{ cursor: 'pointer' }} style={{ cursor: 'pointer' }} onClick={ this.openMenu.bind(this, "postOpen") }><i className="fa fa-edit "></i>Post<span className="fa arrow"></span></a>
                    { 
                      this.state.postOpen ?
                    <ul className="nav nav-second-level">
                      <li>
                        <a><input type="text" className="form-control" onChange={ this.setFilters.bind(this, "post") } /></a>
                      </li> 
                    </ul>
                    : null
                    }
                </li>
                <li className={ this.state.cityOpen ? 'active' : '' }>
                  <a style={{ cursor: 'pointer' }} onClick={ this.openMenu.bind(this, "cityOpen") }><i className="fa fa-edit  "></i>City <span className="fa arrow"></span></a>
                  { 
                      this.state.cityOpen ?
                  <ul className="nav nav-second-level">
                    <li>
                      <a><input type="text" className="form-control" onChange={ this.setFilters.bind(this, "city") } /></a>
                    </li>
                  </ul>
                  : null
                  }
                </li>
                <li>
                  <a style={{ cursor: 'pointer' }} onClick={ this.componentWillMount.bind(this) }><i className="fa fa-recycle "></i>Find</a>
                </li>
              </ul>
            </div>

            <div className="panel-body" style={{ display: 'inline-block', width: '80%',  marginLeft: '20%', overflow: 'auto', height: 446 + 'px', marginTop: 54 + 'px' }}>
                <div className="list-group">
                  {
                    this.state.resumes.length > 0 ?
                      this.state.resumes.map((resume, key) => {
                        return (
                          <a className="list-group-item" key={ key }>
                            <i className=" icon-comment"></i> { resume.post }
                            <span className="pull-right text-muted small"><em>{ resume.date.slice(0, 10) }</em></span>
                          </a>
                        )
                      })
                    : <span>Резюме не найдены</span>
                  }
                </div>
                {
                  this.state.allResumesCount > this.state.resumesCount ?
                    <a onClick={ () => { this.setState({ resumesCount: this.state.resumesCount + 8 }); this.componentWillMount();}  }  className="btn btn-default btn-block btn-default">View More</a>
                  : null
                }
                
            </div>
        </div>
      : <Loader />
    )
  }
  
}