
export default class Footer extends React.Component {

  render() {
    return(
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
              <h2>Worker && Employer</h2>
              <p>Our work is find your work!</p>
              <p>Copyright &copy; 2016 Worker && Employer        
              | Design: <a rel="nofollow" href="" target="_parent">Busygin Dmitry</a></p>
            </div>
            <div className="link-list col-md-2 col-sm-2 wow fadeInUp" data-wow-delay="0.3s">
              <h2>Company</h2>
              <a href="#">About</a>
                  <a href="#">Blog</a>
              <a href="#">Team</a>
              <a href="#">Career</a>
            </div>
            <div className="link-list col-md-2 col-sm-2 wow fadeInUp" data-wow-delay="0.3s">
              <h2>Support</h2>
              <a href="#">Email Us</a>
              <a href="#">FAQs</a>
              <a href="#">Service Terms</a>
              <a href="#">Licenses</a>
            </div>
            <div className="col-md-2 col-sm-2 wow fadeInUp" data-wow-delay="0.3s">
              <h2>Network</h2>
              <ul className="social-icon">
                <li><a href="https://facebook.com" className="fa fa-facebook wow fadeIn" data-wow-delay="0.3s" target="blank"></a></li>
                <li><a href="https://twitter.com" className="fa fa-twitter wow fadeIn" data-wow-delay="0.6s" target="blank"></a></li>
                <li><a href="https://youtube.com" className="fa fa-youtube wow fadeIn" data-wow-delay="0.6s" target="blank"></a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-sm-12">
          <div className="copyright-text wow bounceIn">
          </div>
        </div>
      </footer>
    )
  }
  
}
