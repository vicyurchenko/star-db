import React from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import PeopleList from '../people-list';
import PersonDetails from '../person-details';

import './app.css';

const App = (): JSX.Element => (
  <div>
    <Header />
    <RandomPlanet />
    <div className="row mb2">
      <div className="col-md-6">
        <PeopleList />
      </div>
      <div className="col-md-6">
        <PersonDetails />
      </div>
    </div>
  </div>
);

export default App;
