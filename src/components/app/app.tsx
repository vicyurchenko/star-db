import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import PeopleList from '../people-list';
import PersonDetails from '../person-details';
import './app.css';
import {emptyProps, appState} from "../../models/types";

export default class App extends Component<emptyProps, appState> {

  constructor(props: emptyProps) {
    super(props);
    this.state = {
      selectedItem: 1
    }
  }

  onPersonSelect = (id: number) => {
    this.setState({selectedItem: id})
  }

  render() {
    return (<div>
      <Header/>
      <RandomPlanet/>
      <div className="row mb2">
        <div className="col-md-6">
          <PeopleList onItemSelect={this.onPersonSelect} />
        </div>
        <div className="col-md-6">
          <PersonDetails itemId={this.state.selectedItem}/>
        </div>
      </div>
    </div>);
  }

}