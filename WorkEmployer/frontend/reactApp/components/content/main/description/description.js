import { DescriptionItem } from 'components'

export default class Description extends React.Component {
  render() {
    return(
      <section id="about" className="paralla-section">
        <div className="container">
          <DescriptionItem left>
            <h4>The most friendly service for you</h4>
            <h3>Sign to W&E</h3>
            <p>You have much fun with us! Finding work, will be easy, and similar to game. You must only create account, write your resume and wait for thousand sentences.</p>
          </DescriptionItem>
          <DescriptionItem>
            <h4>The best search in all professions</h4>
            <h3>Employers come to us and find your best workers!</h3>
            <p>If you are employer and you need find workers, this service is the best of you can find.</p>
          </DescriptionItem>
        </div>
      </section>
    )
  }
}

