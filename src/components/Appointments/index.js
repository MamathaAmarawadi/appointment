import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import './index.css'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointList: [],
    isFavorite: false,
    isOpen: true,
    isReal: [],
  }

  onSubmitData = event => {
    event.preventDefault()
    const {title, date, appointList, isFavorite} = this.state
    const objNew = {
      id: uuidv4(),
      title,
      date,
      isFavorite,
    }
    this.setState({
      appointList: [...appointList, objNew],
      isReal: [...appointList, objNew],
      title: '',
      date: '',
    })
  }

  onTitle = event => {
    this.setState({title: event.target.value})
  }

  onDate = event => {
    const fullDate = format(new Date(event.target.value), 'dd MMMM yyyy, EEEE')
    this.setState({date: fullDate})
  }

  onStarfilled = title => {
    this.setState(prevState => ({
      appointList: prevState.appointList.map(e => {
        if (e.title === title) {
          return {...e, isFavorite: !e.isFavorite}
        }

        return e
      }),
    }))
    this.setState(prevState => ({
      isReal: prevState.isReal.map(e => {
        if (e.title === title) {
          return {...e, isFavorite: !e.isFavorite}
        }

        return e
      }),
    }))
  }

  onStarBtn = () => {
    const {appointList, isOpen, isReal} = this.state
    console.log(isReal)
    const filterDetails = isOpen
      ? appointList.filter(e => e.isFavorite === true)
      : isReal
    this.setState({appointList: filterDetails, isOpen: !isOpen})
  }

  render() {
    const {appointList, title, date} = this.state

    return (
      <div className="container">
        <div className="card">
          <div className="row">
            <div className="form-details">
              <form onSubmit={this.onSubmitData}>
                <h1>Add Appointment</h1>
                <div className="row1">
                  <label htmlFor="TitleName" name="TitleName">
                    TITLE
                  </label>
                  <br />
                  <input
                    type="text"
                    name="TitleName"
                    className="input"
                    placeholder="Title"
                    onChange={this.onTitle}
                    value={title}
                  />
                </div>
                <div className="row1">
                  <label htmlFor="DATE" name="DATE">
                    DATE
                  </label>
                  <br />
                  <input
                    type="date"
                    name="DATE"
                    className="input"
                    onChange={this.onDate}
                    placeholder="dd/mm/yy"
                    value={date}
                  />
                </div>
                <button className="btn" data-testid="star">
                  Add
                </button>
              </form>
            </div>

            <div className="pic">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                className="img"
                alt="appointments"
              />
            </div>
          </div>

          <hr />
          <div className="bottom-heading">
            <h1 className="bottom-heading">Appointments</h1>
            <button className="star" onClick={this.onStarBtn}>
              Starred
            </button>
          </div>
          <ul className="ul">
            {appointList.map(e => (
              <AppointmentItem
                appointItem={e}
                key={e.id}
                starFilled={this.onStarfilled}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
