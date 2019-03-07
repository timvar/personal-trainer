import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

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
      postcode: '',
      customeradded: false
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

  goToCustomer = () => {
    this.setState({
      customeradded: true
    });
  }
  
  render() {
    const { firstname, lastname, streetaddress, postcode, city, email, phone, customeradded } = this.state;
    
    if (customeradded) {
      return <Redirect to='/customers' />
    }

    return (
      <div className="container">
        <div className="add-customer">
          <h3>Add Customer</h3> 
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col-8">
          <form onSubmit={this.addCustomer}>
            <div className="form-group row">
              <label htmlFor="firstname" className="col-sm-4 col-form-label">First name</label>
              <div className="col-sm-8">
                <input 
                  type="text"
                  onChange={this.inputChanged}
                  className="form-control" 
                  id="firstname"
                  name="firstname"
                  value={firstname}
                  placeholder="First name"
                  />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="lastname" className="col-sm-4 col-form-label">Last name</label>
              <div className="col-sm-8">
                <input 
                  type="text"
                  onChange={this.inputChanged}
                  className="form-control" 
                  id="lastname"
                  name="lastname"
                  value={lastname}
                  placeholder="Last name"
                  />
              </div>
            </div>
            <div className="form-group row">
              
              <label htmlFor="lastname" className="col-sm-4 col-form-label">Street address</label>
              
              <div className="col-sm-8">
                <input 
                  type="text"
                  onChange={this.inputChanged}
                  className="form-control" 
                  id="streetaddress"
                  name="streetaddress"
                  value={streetaddress}
                  placeholder="Street address"
                  />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="lastname" className="col-sm-4 col-form-label">Postcode</label>
              <div className="col-sm-8">
                <input 
                  type="text"
                  onChange={this.inputChanged}
                  className="form-control" 
                  id="postcode"
                  name="postcode"
                  value={postcode}
                  placeholder="Postcode"
                  />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="lastname" className="col-sm-4 col-form-label">City</label>
              <div className="col-sm-8">
                <input 
                  type="text"
                  onChange={this.inputChanged}
                  className="form-control" 
                  id="city"
                  name="city"
                  value={city}
                  placeholder="City"
                  />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="lastname" className="col-sm-4 col-form-label">Email</label>
              <div className="col-sm-8">
                <input 
                  type="text"
                  onChange={this.inputChanged}
                  className="form-control" 
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="lastname" className="col-sm-4 col-form-label">Phone</label>
              <div className="col-sm-8">
                <input 
                  type="text"
                  onChange={this.inputChanged}
                  className="form-control" 
                  id="phone"
                  name="phone"
                  value={phone}
                  placeholder="Phone"
                  />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Submit</button>
          </form>
          </div>
          <div className="col"></div>
        </div>

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
              Customer added!
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
