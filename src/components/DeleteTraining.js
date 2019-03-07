import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Redirect } from 'react-router-dom';

export default class DeleteTraining extends Component {
  constructor(props){
    super(props);
    this.state = { 
      date: '', 
      activity: '', 
      duration: '', 
      trainingDeleted: false 
    }
  }

  getTraining = () => {
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

  deleteTraining = () => {
    const url = 'https://customerrest.herokuapp.com/api/trainings/' + this.props.match.params.id;
    axios.delete(url)
    .then( ()  => {
      this.setState({ 
        date: '',
        activity: '', 
        duration: '',
        trainingDeleted: true
      });
    })
    .catch( err => console.log('Error msg: ', err));
  }

  componentDidMount() {
    this.getTraining();
  }

  render() {
    if (this.state.trainingDeleted === true) {
      return <Redirect to='/trainings' />
    }

    return (
      <div className="container">
        <h3 className="delete-training-header">Delete Training</h3>
        <p>Date: { this.state.date.length ? moment(this.state.date).format("DD-MM-YYYY") : ''}</p>
        <p>Activity: {this.state.activity}</p>
        <p>Duration: { this.state.duration }</p>
        
        <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal">
          Delete
        </button>
      
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Delete Training</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Delete Training - are you sure?
              </div>
              <div class="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.deleteTraining}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
