import React, {Component} from 'react';
import './people-list.css';
import SwapiService from "../../services/swapi-service";
import LoadSpinner from '../load-spinner';
import ErrorIndicator from '../error-indicator';

type person = {
  id: number,
  name: string
};

type peopleViewProps = {
  people: person[]
}


type peopleListProps = {}

type peopleListState = {
  people: person[],
  error: boolean,
  loading: boolean
}

export default class PeopleList extends Component<peopleListProps> {

  state: peopleListState = {
    people: [],
    error: false,
    loading: true
  };

  swapiService: SwapiService;

  constructor(props: peopleListProps) {
    super(props);
    this.swapiService = new SwapiService();
  }

  onError = (err: any) => {
    this.setState({error: true, loading: false})
  };

  updatePeopleList = async () => {
    await this.swapiService.getAllPeople().then( (people) => {this.setState({people, loading: false})}).catch(this.onError);
  }

  componentDidMount() {
    this.updatePeopleList();
  }



  render() {


    const {people, error, loading} = this.state;


    const hasData = !(error || loading);

    const spinner = loading ? <LoadSpinner/> : null;
    const content = hasData ? <PeopleView people={people}/> : null;
    const errorMessage = error ? <ErrorIndicator/> : null;


    return (
        <div className="random-planet jumbotron rounded">
          {spinner}
          {content}
          {errorMessage}
        </div>

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

const PeopleView = ({people}:peopleViewProps) => {

  let peoplesJSX: any;

  peoplesJSX = people.map((person) => { return (<li className="list-group-item">{person.name}</li>)} );


  return (
    <ul className="item-list list-group">
      {peoplesJSX}
    </ul>
  )
}