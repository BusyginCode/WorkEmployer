import { Link } from 'react-router'

export default class MainTip extends React.Component {

  render() {
    return(
      <Link to={"/tips"}>
        <div className="post-masonry col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
          <div className="blog-wrapper">
            <img src={ this.props.img } className="img-responsive" alt="blog img" />
            <h3>{ this.props.title }</h3>
            <small>{ this.props.date }</small>
            <p>
              { this.props.text.length > 250 ?
                  this.props.text.slice(0, 165) + "..." 
                : this.props.text
              }
            </p>
          </div>
        </div>
      </Link>
    )
  }
  
}

