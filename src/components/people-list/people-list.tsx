import React, { Component } from 'react';
import './people-list.css';
import SwapiService from '../../services/swapi-service';
import LoadSpinner from '../load-spinner';
import ErrorIndicator from '../error-indicator';

type person = {
  id: number,
  name: string
};

type peopleViewProps = {
  people: person[]
}

type peopleListProps = Record<string, unknown>

type peopleListState = {
  people: person[],
  error: boolean,
  loading: boolean
}

export default class PeopleList extends Component<peopleListProps, peopleListState> {
  swapiService: SwapiService;

  constructor(props: peopleListProps) {
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

  render(): JSX.Element {
    const { people, error, loading } = this.state;

    const hasData = !(error || loading);

    const spinner = loading ? <LoadSpinner /> : null;
    const content = hasData ? <PeopleView people={people} /> : null;
    const errorMessage = error ? <ErrorIndicator /> : null;

    return (
      <>
        {spinner}
        {content}
        {errorMessage}
      </>

    );

    return (
      <ul className="item-list list-group">
        <li className="list-group-item">
          Luke Skywalker
        </li>
        <li className="list-group-item">
          Darth Vader
        </li>
        <li className="list-group-item">
          R2-D2
        </li>
      </ul>
    );
  }
}

const PeopleView = ({ people }:peopleViewProps) => {
  const peoplesJSX = people.map((el) => (<li className="list-group-item">{el.name}</li>));

  return (
    <ul className="item-list list-group">
      {peoplesJSX}
    </ul>
  );
};
