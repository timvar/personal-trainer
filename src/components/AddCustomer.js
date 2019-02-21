import React, { Component } from 'react';
import axios from 'axios';

export default class AddCustomer extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstname: '', 
      lastname: '', 
      streetaddress: '', 
      city: '', 
      email: '', 
      phone: '', 
      postcode: ''
    };
  }
  
  inputChanged = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  addCustomer = (e) => {
    e.preventDefault();
    console.log('add customer');
    console.log('customer: ', this.state);
    
    const url = 'https://customerrest.herokuapp.com/api/customers';
    const customer = {
        firstname: this.state.firstname, 
        lastname: this.state.lastname, 
        streetaddress: this.state.streetaddress,
        postcode: this.state.postcode,
        city: this.state.city,
        email: this.state.email,
        phone: this.state.phone
    }
    console.log(customer);
    console.log(url);
    axios.post(url, customer)
    .catch(err => console.log('error: ', err));
    
    this.setState({
      firstname: '', 
      lastname: '', 
      streetaddress: '', 
      city: '', 
      email: '', 
      phone: '', 
      postcode: ''
    });
  }
  
  render() {
    const { firstname, lastname, streetaddress, postcode, city, email, phone } = this.state;
    return (
      <div className="container">
      <h2>Add Customer</h2>  
      <form onSubmit={this.addCustomer}>
        <div className="form-group row">
          <label htmlFor="firstname" className="col-sm-2 col-form-label">First name</label>
          <div className="col-sm-10">
            <input 
              type="text"
              onChange={this.inputChanged}
              className="form-control" 
              id="firstname"
              name="firstname"
              value={firstname}
              />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="lastname" className="col-sm-2 col-form-label">Last name</label>
          <div className="col-sm-10">
            <input 
              type="text"
              onChange={this.inputChanged}
              className="form-control" 
              id="lastname"
              name="lastname"
              value={lastname}
              />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="lastname" className="col-sm-2 col-form-label">Street address</label>
          <div className="col-sm-10">
            <input 
              type="text"
              onChange={this.inputChanged}
              className="form-control" 
              id="streetaddress"
              name="streetaddress"
              value={streetaddress}
              />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="lastname" className="col-sm-2 col-form-label">Postcode</label>
          <div className="col-sm-10">
            <input 
              type="text"
              onChange={this.inputChanged}
              className="form-control" 
              id="postcode"
              name="postcode"
              value={postcode}
              />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="lastname" className="col-sm-2 col-form-label">City</label>
          <div className="col-sm-10">
            <input 
              type="text"
              onChange={this.inputChanged}
              className="form-control" 
              id="city"
              name="city"
              value={city}
              />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="lastname" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input 
              type="text"
              onChange={this.inputChanged}
              className="form-control" 
              id="email"
              name="email"
              value={email}
              />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="lastname" className="col-sm-2 col-form-label">Phone</label>
          <div className="col-sm-10">
            <input 
              type="text"
              onChange={this.inputChanged}
              className="form-control" 
              id="phone"
              name="phone"
              value={phone}
              />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
    )
  }
}
