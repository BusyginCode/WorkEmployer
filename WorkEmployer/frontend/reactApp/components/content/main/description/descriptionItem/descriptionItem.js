
export default class DescriptionItem extends React.Component {

  render() {
    return(
      <div className="row"> 
        { 
          (this.props.left ?
          <div className="col-md-6 col-sm-12">
            <img src="/static/images/mobile-worker-1.jpg" className="img-responsive" alt="about img 1" />
          </div>  
          : null)
        }                 
        <div className="col-md-6 col-sm-12">
          <div className="about-des">
            {
              this.props.children
            }
          </div>
        </div>
        { 
          (!this.props.left ?
          <div className="col-md-6 col-sm-12">
            <img src="/static/images/Office-Worker-Girl.jpg" className="img-responsive" alt="about img 1" />
          </div>  
          : null)
        }     
      </div>
    )
  }
}
