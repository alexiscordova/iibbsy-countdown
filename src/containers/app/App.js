import React, { Component } from 'react'
import ReactGA from 'react-ga'
import Helmet from 'react-helmet'
import Countdown from 'Components/countdown/Countdown'
import GlobalFooter from 'Components/global-footer/GlobalFooter'
import Data from '../../data.json'
import '../../styles/style.scss'

ReactGA.initialize('UA-347921-6')

class App extends Component {
  constructor(props) {
    super(props)

    // Since we'll be reloading this file a lot during development, we want to
    // prevent localhost hits from counting towards our Google Analytics visitor count
    // This will only send the pageview if the URL is *not* localhost
    if (window.location.href.indexOf('localhost') === -1) {
      ReactGA.set({
        page: window.location.href
      })

      ReactGA.pageview(window.location.href)
    }
  }

  render() {
    return (
      <article className="content-wrapper">
        <Helmet>
          <title>Is It Baseball Season Yet | MLB Opening Day {Data.year}</title>
        </Helmet>
        <main>
          <Countdown
            openingDay={Data.openingDay}
            year={Data.year}
          />
        </main>
        <GlobalFooter />
      </article>
    )
  }
}

export default App
