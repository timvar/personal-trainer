import React, { Component } from 'react'
import Calendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import axios from 'axios';

const localizer = Calendar.momentLocalizer(moment);

export default class Reservations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          title: '',
          desc: '',
          start: '',
          end: '',
          allDay: true,
        }
      ]
    }
  }
  
  getTrainings = () => {
    axios.get('https://customerrest.herokuapp.com/gettrainings')
    .then( response => {
      response.data.forEach( training => {
        console.log('training', training);
        let newEvent = {
          title: training.activity,
          desc: training.duration,
          start: moment(training.date),
          end: moment(training.date),
          allDay: true
        }
        console.log('new event', newEvent)
        this.setState({
          events: [...this.state.events, newEvent]
        });
      })      
    })
    .catch( err => console.log('Error msg: ', err));
    
  }

  componentDidMount () {
    this.getTrainings();
    
  }

  render() {
    console.log('this.state.events: ', this.state.events);
    return (
      <div className="container">
      <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          views={{
            month: true,
            week: true,
            day: true
          }}
          events={this.state.events}
          style={{ height: "100vh" }}
        />
        
      
      </div>
    )
  }
}

