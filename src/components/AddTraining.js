import React, { Component } from 'react';
import axios from 'axios';

export default class AddTraining extends Component {
  constructor(props){
    super(props);
    this.state = { date: '', activity: '', duration: '', customer: '', firstname: '', lastname: '', email: '', phone: '', customerapi: '' }
  }

  inputChanged = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  getCustomer = () => {
    const url = 'https://customerrest.herokuapp.com/api/customers/' + this.props.match.params.id;
    console.log('url ', url);
    axios.get(url)
    .then( response => {
      console.log('customerapi: ', response.data.links[1].href);
      this.setState({ 
        firstname: response.data.firstname, 
        lastname: response.data.lastname, 
        email: response.data.email,
        phone: response.data.phone,
        customerapi: response.data.links[1].href
      });
    })
    .catch( err => console.log('Error msg: ', err));
  }

  addTraining = (e) => {
    e.preventDefault();
    console.log('add training');
    const url = 'https://customerrest.herokuapp.com/api/trainings';
    const training = {
        date: this.state.date, 
        activity: this.state.activity, 
        duration: this.state.duration,
        customer: this.state.customerapi
    }
    console.log('training: ', training);
    
    axios.post(url, training)
    .catch(err => console.log('Error: ', err));
    
  }

  componentDidMount() {
    this.getCustomer();
  }

  render() {
    const { date, activity, duration } = this.state
    console.log('props:', this.props);
    return (
      <div className="container">
        <h2>Add Training</h2>
        <div className="text-left">
          <h5>First name: {this.state.firstname}</h5>
          <h5>Last name: {this.state.lastname}</h5>
          <h5>Phone: {this.state.phone}</h5>
          <h5>Email: {this.state.email}</h5>
        </div>
        <form onSubmit={this.addTraining} >
          <div className="form-group row">
            <label htmlFor="firstname" className="col-sm-2 col-form-label">Date</label>
            <div className="col-sm-10">
              <input 
                type="date"
                onChange={this.inputChanged}
                className="form-control" 
                id="date"
                name="date"
                value={date}
                />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="lastname" className="col-sm-2 col-form-label">Activity</label>
            <div className="col-sm-10">
              <input 
                type="text"
                onChange={this.inputChanged}
                className="form-control" 
                id="activity"
                name="activity"
                value={activity}
                />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="lastname" className="col-sm-2 col-form-label">Duration (mins)</label>
            <div className="col-sm-10">
              <input 
                type="text"
                onChange={this.inputChanged}
                className="form-control" 
                id="duration"
                name="duration"
                value={duration}
                />
            </div>
          </div>
        <button type="submit" className="btn btn-primary">Add</button>  
      </form>
    </div>
    )
  }
}
