import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class AddTraining extends Component {
  constructor(props){
    super(props);
    this.state = { 
      date: '', 
      activity: '', 
      duration: '', 
      customer: '', 
      firstname: '', 
      lastname: '', 
      email: '', 
      phone: '', 
      customerapi: '',
      trainingadded: false 
    }
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

  goToCustomer = () => {
    this.setState({
      trainingadded: true
    });
  }

  render() {
    const { date, activity, duration, trainingadded } = this.state
    console.log('props:', this.props);

    if (trainingadded) {
      return <Redirect to='/customers' />
    }

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
        <button type="submit" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Add</button>  
      </form>
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add Customer</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Training added!
            </div>
            <div class="modal-footer">
              <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.goToCustomer}>OK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
