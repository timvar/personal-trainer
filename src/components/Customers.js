import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Customers extends Component {

  constructor(props){
    super(props);
    this.state = {customers: []};
  }

  getCustomers = () => {
    axios.get('https://customerrest.herokuapp.com/api/customers')
    .then( response => {
      console.log(response.data);
      this.setState({ customers: response.data.content });
    })
    .catch( err => console.log('Error msg: ', err));
  }

  editCustomer(idx) {
    console.log('click row:', idx);
  }

  componentDidMount () {
    this.getCustomers();
  }

  render() {
    const columns = [{
      Header: 'First Name',
      accessor: 'firstname',
    },
    {
      Header: 'Last Name',
      accessor: 'lastname'
    },
    {
      Header: 'Street Address',
      accessor: 'streetaddress'
    },
    {
      Header: 'Post Code',
      accessor: 'postcode'
    },
    {
      Header: 'City',
      accessor: 'city'
    },
    {
      Header: 'Email',
      accessor: 'email'
    },
    {
      Header: 'Phone',
      accessor: 'phone'
    },
    { id: 'customerId',
      Header: 'Edit Customer',
      accessor: d => {
        const href = d.links[0].href
        const pos = href.lastIndexOf("/");
        const id = href.slice(pos+1);
        return (  
          <Link to={'/customers/' + id}>
            <button type="button" className='btn btn-danger'>Edit</button>
          </Link> );
      }
    },
    { id: 'addTraining',
      Header: 'New Training',
      accessor: d => {
        const href = d.links[0].href
        const pos = href.lastIndexOf("/");
        const id = href.slice(pos+1);
        return (  
          <Link to={'/addtraining/' + id}>
            <button type="button" className='btn btn-danger'>New Training</button>
          </Link> );
      }
    }
  ]
  
  return (
    <div className="container">
      <h2>Customers</h2>
      <Link to={'/addcustomer'}>
        <button type="button" className='btn btn-danger'>Add Customer</button>
      </Link>
      <ReactTable 
          data={this.state.customers}
          filterable
          columns={columns}
          defaultPageSize={10}
      />
      
    </div>
  )
  }
}
   
/*

 Cell: row => {
              return (  
                <Link to={'/customers/' + row.index}>
                  <button type="button" className='btn btn-danger'  onClick={(e) => this.editCustomer(row.index)}>Edit</button>
                </Link> );
              } 
*/