import React, { Component } from 'react'
import ReactGA from 'react-ga'
import Countdown from 'Components/countdown/Countdown'
import GlobalFooter from 'Components/global-footer/GlobalFooter'

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
      <article className="react-root">
        <main>
          <Countdown
            openingDay="03/29/2018 10:10 AM"
            year="2018"
          />
        </main>
        <GlobalFooter />
      </article>
    )
  }
}

export default App
