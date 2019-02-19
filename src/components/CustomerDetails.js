import axios from 'axios';
import React, { Component } from 'react';

export default class CustomerDetails extends Component {
  constructor(props){
    super(props);
    this.state = {customer: null};
  }

  getCustomer = () => {
    console.log('customer id: ', this.props.match.params.id);
    const url = 'https://customerrest.herokuapp.com/api/customers/' + this.props.match.params.id;
    console.log('url ', url);
    
    axios.get(url)
    .then( response => {
      console.log('customer: ', response.data);
      this.setState({ customer: response.data });
    })
    .catch( err => console.log('Error msg: ', err));
    
  }

  componentDidMount () {
    this.getCustomer();
  }
  
  render() {
    return (
      <div>
      <h2>Customer details</h2>  
    </div>
    )
  }
}
