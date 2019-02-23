import React, { Component } from 'react';
import axios from 'axios';

export default class DeleteTraining extends Component {
  constructor(props){
    super(props);
    this.state = { date: '', activity: '', duration: '', customer: '', firstname: '', lastname: '', email: '', phone: '', customerapi: '' }
  }

  getTraining = () => {
    console.log('props', this.props);
    const url = 'https://customerrest.herokuapp.com/api/trainings/' + this.props.match.params.id;
    console.log('url ', url);
    axios.get(url)
    .then( response => {
      this.setState({ 
        date: response.data.date, 
        activity: response.data.activity, 
        duration: response.data.duration
      });
    })
    .catch( err => console.log('Error msg: ', err));
  }

  componentDidMount() {
    this.getTraining();
    
  }

  render() {
    console.log('state', this.state);
    return (
      <div>
        <h2>Delete Training</h2>
      </div>
    )
  }
}
