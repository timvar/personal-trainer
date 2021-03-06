import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import CustomerDetails from './components/CustomerDetails';
import AddCustomer from './components/AddCustomer';
import AddTraining from './components/AddTraining';
import DeleteTraining from './components/DeleteTraining';
import Reservations from './components/Reservations';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/customers/:id" component={CustomerDetails} />
            <Route path="/customers" component={Customers} />
            <Route path="/addcustomer" component={AddCustomer} />
            <Route path="/trainings" component={Trainings} />
            <Route path="/addtraining/:id" component={AddTraining} />
            <Route path="/deletetraining/:id" component={DeleteTraining} />
            <Route path="/reservations" component={Reservations} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
