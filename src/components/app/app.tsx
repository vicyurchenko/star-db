import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import PeopleList from '../people-list';
import PersonDetails from '../person-details';
import './app.css';

type appProps = Record<string, unknown>

type appState = {
  selectedItem: number
}

export default class App extends Component<appProps, appState> {

  constructor(props: appProps) {
    super(props);
    this.state = {
      selectedItem: 0
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