import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class CustomerDetails extends Component {
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
      customerDeleted: false,
      customerUpdated: false
    };
  }

  getCustomer = () => {
    const url = 'https://customerrest.herokuapp.com/api/customers/' + this.props.match.params.id;
    axios.get(url)
    .then( response => {
      this.setState({ 
        firstname: response.data.firstname, 
        lastname: response.data.lastname, 
        streetaddress: response.data.streetaddress,
        postcode: response.data.postcode,
        city: response.data.city,
        email: response.data.email,
        phone: response.data.phone
      });
    })
    .catch( err => console.log('Error msg: ', err));
  }

  inputChanged = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  updateCustomer = (e) => {
    e.preventDefault();
    console.log('update customer');
    const url = 'https://customerrest.herokuapp.com/api/customers/' + this.props.match.params.id;
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
    axios.put(url, customer).then( () => {
      this.setState({
        firstname: '', 
        lastname: '', 
        streetaddress: '', 
        city: '', 
        email: '', 
        phone: '', 
        postcode: '',
        customerUpdated: true
      });
    })
    .catch(err => console.log('Error: ', err));
  }

  deleteCustomer = () => {
    console.log('delete customer');
    const url = 'https://customerrest.herokuapp.com/api/customers/' + this.props.match.params.id;
    console.log('url ', url);
    axios.delete(url).then( () => {
      this.setState({
            firstname: '', 
            lastname: '', 
            streetaddress: '', 
            city: '', 
            email: '', 
            phone: '', 
            postcode: '',
            customerDeleted: true
          });
    })
    .catch(err => console.log('Error: ', err));
  }

  componentDidMount () {
    this.getCustomer();
  }
  
  render() {
    const { firstname, lastname, streetaddress, postcode, city, email, phone, customerDeleted, customerUpdated } = this.state
    
    if (customerDeleted) {
      return <Redirect to='/customers' />
    }

    if (customerUpdated) {
      return <Redirect to='/customers' />
    }

    return (
      <div className="container">
        <div className="customer-details">
          <h3>Update Customer</h3>  
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col-8">
            <form onSubmit={this.updateCustomer} >
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
                    />
                </div>
              </div>
            <button type="submit" className="update-customer btn btn-primary">Update</button>  
          </form>
      </div>
      <div className="col"></div>
      </div>
      
      <button type="button" className="btn btn-danger delete-customer" data-toggle="modal" data-target="#exampleModal">
        Delete
      </button>
      
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Delete Customer</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Delete Customer - are you sure?
            </div>
            <div class="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.deleteCustomer}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
