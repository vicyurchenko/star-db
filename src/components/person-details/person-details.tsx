import React, {Component} from 'react';

import './person-details.css';
import SwapiService from "../../services/swapi-service";
import LoadSpinner from "../load-spinner";
import ErrorIndicator from "../error-indicator";
import {personDetails, personState, personData} from "../../models/types";

export default class PersonDetails extends Component<personDetails, personState>{
  swapiService: SwapiService;

  constructor(props: personDetails) {
    super(props);
    this.swapiService = new SwapiService();
    this.state = {
      person: null,
      loading: true,
      error: false
    }
  }

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps: Readonly<personDetails>, prevState: Readonly<personState>) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updatePerson();
    }
  }

  onError = (): void => {
    this.setState({ error: true, loading: false });
  };

  updatePerson() {
    const { itemId } = this.props;
    if (itemId == 0) {
      return;
    }
    this.setState({loading: true});
    this.swapiService.getPerson(itemId)
      .then((person) => this.setState({person, loading: false}))
      .catch(this.onError);

  }

  renderPerson = (person: personData): JSX.Element => {
    return (
      <div className="person-details card">
        <img
          className="person-image"
          alt={person.name}
          src={person.image}
        />

        <div className="card-body">
          <h4>{person.name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{person.gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{person.birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{person.eyeColor}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  render(): JSX.Element  {

    const { person, error, loading } = this.state;

    if (person == null) {
      return <span>Select a person from List</span>
    }

    const hasData = !(error || loading);

    const spinner = loading ? <LoadSpinner /> : null;
    const content = hasData ? this.renderPerson(person) : null;
    const errorMessage = error ? <ErrorIndicator /> : null;

    return (
      <>
        {spinner}
        {content}
        {errorMessage}
      </>
    );



  }
}