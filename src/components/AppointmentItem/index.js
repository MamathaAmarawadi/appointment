import './index.css'

const AppointmentItem = props => {
  const {appointItem, starFilled} = props
  const {title, date, isFavorite} = appointItem
  const isBoll = isFavorite ? (
    <img
      src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
      className="pic"
      alt="star"
    />
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
      className="pic"
      alt="star"
    />
  )

  const onStarted = () => {
    starFilled(title)
  }

  return (
    <li className="bottom-card">
      <div>
        <h1>{title}</h1>
        <p>Date: {date}</p>
      </div>
      <div>
        <button onClick={onStarted} className="bottom-btn">
          {isBoll}
        </button>
      </div>
    </li>
  )
}

export default AppointmentItem
