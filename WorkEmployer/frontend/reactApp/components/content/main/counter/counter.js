
export default class Counter extends React.Component {

  render() {
    return (
      <section id="counter" className="paralla-section">
        <div className="container">
          <div className="row" id="counterContainer">
            <div className="col-md-3 col-sm-3 counter-item">  
              <h3 className="counter-number" data-from="1" data-to="256" data-speed="1000">{ this.props.employers }</h3>
              <span className="counter-text">EMPLOYERS</span>
            </div> 
            <div className="col-md-3 col-sm-3 counter-item">  
              <h3 className="counter-number" data-from="1" data-to="512" data-speed="2000">{ this.props.developers }</h3>
              <span className="counter-text">DEVELOPERS</span>
            </div>   
          </div>
        </div>
      </section>
    )
  }
}




