import './index.css'

const ImageItem = props => {
  const {imageDetails, randomImg} = props
  const {id, thumbnailUrl} = imageDetails
  const ran = () => {
    randomImg(id)
  }
  return (
    <li>
      <button type="button" onClick={ran} className="img-btn">
        <img className="image-item" src={thumbnailUrl} alt="thumbnail" />
      </button>
    </li>
  )
}

export default ImageItem
