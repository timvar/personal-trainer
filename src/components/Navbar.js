import React from 'react'
import {Link} from 'react-router-dom';

const Navbar = (props) => {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="/">My Personal Trainer</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/customers">Customers</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/trainings">Trainings</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reservations">Calendar</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;


