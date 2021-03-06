import React, { Component } from 'react'
import ReactTable from 'react-table';
import "react-table/react-table.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class Trainings extends Component {
  constructor(props){
    super(props);
    this.state = {trainings: []};
  }

  getTrainings = () => {
    axios.get('https://customerrest.herokuapp.com/gettrainings')
    .then( response => {
      this.setState({ trainings: response.data });
    })
    .catch( err => console.log('Error msg: ', err));
  }

  componentDidMount () {
    this.getTrainings();
  }

  render() {
    const columns = [{
      id: 'trainingDate',
      Header: 'Date',
      accessor: d => {
        return moment(d.date).format("DD-MM-YYYY");
      }
    },
    {
      Header: 'Duration',
      accessor: 'duration'
    },
    {
      Header: 'Activity',
      accessor: 'activity'
    },
    {
      Header: 'Customer Firstname',
      accessor: 'customer.firstname'
    },
    {
      Header: 'Customer Lastname',
      accessor: 'customer.lastname'
    },
    { id: 'deleteTraining',
      Header: '',
      sortable: false, 
      filterable: false,
      accessor: d => {
        const id = d.id;
        return (  
          <Link to={'/deletetraining/' + id}>
            <button type="button" className='btn btn-danger'>Delete</button>
          </Link> );
    }
    }]
  
    return (
      <div className="container">
        <div className="trainings">
          <h3>Trainings</h3>
        </div>
        <ReactTable 
          data={this.state.trainings}
          filterable
          columns={columns}
          defaultPageSize={10}
        />
      </div>
    )
  }
}
