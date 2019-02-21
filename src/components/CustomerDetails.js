import axios from 'axios';
import React, { Component } from 'react';

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
    };
  }

  getCustomer = () => {
    //console.log('customer id: ', this.props.match.params.id);
    const url = 'https://customerrest.herokuapp.com/api/customers/' + this.props.match.params.id;
    //console.log('url ', url);
    axios.get(url)
    .then( response => {
      console.log('firstname: ', response.data.firstname);
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
    axios.put(url, customer)
    .catch(err => console.log('Error: ', err));
  }

  deleteCustomer = () => {
    console.log('delete customer');
    const url = 'https://customerrest.herokuapp.com/api/customers/' + this.props.match.params.id;
    console.log('url ', url);
    axios.delete(url)
    .catch(err => console.log('Error: ', err));
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

  componentDidMount () {
    this.getCustomer();
  }
  
  render() {
    const { firstname, lastname, streetaddress, postcode, city, email, phone } = this.state
    return (
      <div className="container">
        <h2>Update Customer</h2>  
        <form onSubmit={this.updateCustomer} >
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
        <button type="submit" className="btn btn-primary">Update</button>  
      </form>
      
      
      <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal">
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
