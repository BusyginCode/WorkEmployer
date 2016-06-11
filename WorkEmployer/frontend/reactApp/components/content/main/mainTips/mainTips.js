import { MainTip } from 'components'

export default class MainTips extends React.Component {

  generateTips() {
    return this.props.tips.map((tip, key) => {
      return (
        <MainTip 
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
      <section id="blog" className="paralla-section">
        <div className="container">
          <div className="row">
            <h2>OUR BLOG</h2>
            <h4>Simple and Powerful tips</h4>
            <div className="blog-masonry masonry-true">
              {
                this.generateTips()
              }
            </div>
          </div>
        </div>
      </section>
    )
  }
}
