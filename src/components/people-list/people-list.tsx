import React, { Component } from 'react';
import './people-list.css';
import SwapiService from '../../services/swapi-service';
import LoadSpinner from '../load-spinner';
import ErrorIndicator from '../error-indicator';
import {person, itemListProps, peopleListState} from "../../models/types";

export default class PeopleList extends Component<itemListProps, peopleListState> {
  swapiService: SwapiService;

  constructor(props: itemListProps) {
    super(props);
    this.state = {
      people: [],
      error: false,
      loading: true,
    };
    this.swapiService = new SwapiService();
  }

  componentDidMount(): void {
    this.updatePeopleList();
  }

  onError = (): void => {
    this.setState({ error: true, loading: false });
  };

  updatePeopleList = (): void => {
    this.swapiService.getAllPeople().then((people) => this.setState({ people, loading: false })).catch(this.onError);
  }

  renderItemList = (items: person[]): JSX.Element => {
    const itemsJSX = items.map((el) => (<li key={el.id} className="list-group-item" onClick={() => this.props.onItemSelect(el.id)}>{el.name}</li>));

    return (
      <ul className="item-list list-group">
        {itemsJSX}
      </ul>
    )
  }

  render(): JSX.Element {
    const { people, error, loading } = this.state;

    const hasData = !(error || loading);

    const spinner = loading ? <LoadSpinner /> : null;
    const content = hasData ? this.renderItemList(people) : null;
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


