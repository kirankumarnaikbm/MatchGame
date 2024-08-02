import {Component} from 'react'
import TabItem from './Components/TabItem'
import ImageItem from './Components/ImageItem'
import './index.css'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clock: 60,
      activeTabId: props.tabsList[0].tabId,
      imgId: 'b11ec8ce-35c9-4d67-a7f7-07516d0d8186',
      count: 0,
    }
  }

  componentDidMount() {
    this.timerID = setInterval(this.tick, 1000)
  }

  clickTabItem = tabValue => {
    this.setState({activeTabId: tabValue})
  }

  getFilteredImages = () => {
    const {activeTabId} = this.state
    const {imagesList} = this.props
    const filteredImages = imagesList.filter(
      eachImageDetails => eachImageDetails.category === activeTabId,
    )
    return filteredImages
  }

  getFilteredImage = () => {
    const {imgId} = this.state
    const {imagesList} = this.props
    const filteredImage = imagesList.filter(
      eachImageDetails => eachImageDetails.id === imgId,
    )
    return filteredImage
  }

  randomImg = id => {
    const {imgId} = this.state
    if (id === imgId) {
      const randomNum = Math.floor(Math.random() * 30)
      const {imagesList} = this.props
      this.setState(prevState => ({
        count: prevState.count + 1,
        imgId: imagesList[randomNum].id,
      }))
    } else {
      this.setState({
        clock: 0,
      })
    }
  }

  playAgain = () => {
    const {tabsList} = this.props
    this.componentDidMount()
    this.setState({
      clock: 60,
      activeTabId: tabsList[0].tabId,
      imgId: 'b11ec8ce-35c9-4d67-a7f7-07516d0d8186',
      count: 0,
    })
  }

  tick = () => {
    this.setState(prevState => ({clock: prevState.clock - 1}))
  }

  render() {
    const {clock, activeTabId, count} = this.state
    const {tabsList} = this.props
    const filteredImages = this.getFilteredImages()
    const filteredImage = this.getFilteredImage()
    let element
    if (clock === 0) {
      clearInterval(this.timerID)
      element = (
        <div className="d-flex justify-content-center">
          <div className="game-over d-flex flex-column justify-content-end align-items-center p-4">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
              alt="trophy"
              className="h-25"
            />
            <p className="h4">YOUR SCORE</p>
            <p className="h1">{count}</p>
            <button
              type="button"
              className="btn button-c"
              onClick={this.playAgain}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                alt="reset"
              />
              PLAY AGAIN
            </button>
          </div>
        </div>
      )
    } else {
      element = (
        <div>
          <div className="d-flex flex-column align-items-center ">
            <img
              src={filteredImage[0].imageUrl}
              className="ranImg"
              alt="match"
            />
            <div>
              <ul className="d-flex list-style justify-content-between">
                {tabsList.map(tabDetails => (
                  <TabItem
                    key={tabDetails.tabId}
                    tabDetails={tabDetails}
                    clickTabItem={this.clickTabItem}
                    isActive={activeTabId === tabDetails.tabId}
                  />
                ))}
              </ul>
            </div>
            <div>
              <ul className="d-flex flex-wrap justify-content-center list-style img-container">
                {filteredImages.map(imageDetails => (
                  <ImageItem
                    key={imageDetails.id}
                    imageDetails={imageDetails}
                    randomImg={this.randomImg}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="bg-container">
        <ul className="p-4 d-flex flex-row justify-content-between t-card list-style">
          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
              className="match-logo"
              alt="website logo"
            />
          </li>
          <li className="d-flex">
            <div className="d-flex align-items-center">
              <p className="h6 p-2">
                Score: <span className="color-i">{count}</span>
              </p>
            </div>
            <div className="d-flex p-1">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="time-img"
              />
              <p className="h5 p-1 color-i">{clock} sec</p>
            </div>
          </li>
        </ul>
        {element}
      </div>
    )
  }
}

export default Game
