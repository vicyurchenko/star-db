import React, {Component} from 'react';
import SwapiService from "../../services/swapi-service";
import LoadSpinner from '../load-spinner';
import ErrorIndicator from '../error-indicator';

import './random-planet.css';


type randomPlanetProps = {};

type randomPlanet = {
  name: string,
  image: string,
  rotationPeriod: number,
  population: number,
  diameter: number
}

type randomPlanetState = {
  planet: randomPlanet,
  loading: boolean,
  error: boolean
}

interface PlanetViewProps {
  planet: randomPlanet
}

export default class RandomPlanet extends Component<randomPlanetProps> {

  swapiService: SwapiService;

  state: randomPlanetState = {
    planet: {
      name: '',
      image: '',
      rotationPeriod: 0,
      population: 0,
      diameter: 0
    },
    loading: true,  
    error: false
  }

  constructor(props: randomPlanetProps) {
    super(props);
    this.swapiService = new SwapiService();
  }

  componentDidMount() {
    this.updatePlanet();
    setInterval(this.updatePlanet, 3000);
  }

  onError = (err: any) => {
    this.setState({error: true, loading: false})
  };

   updatePlanet = async () => {
    let planetsCount = 0;
    await this.swapiService.getAllPlanets().then(p => planetsCount = p.length).catch(this.onError);
    await this.swapiService.getPlanet(Math.floor(Math.random() * (planetsCount-1) + 1)).then((planet) => {
      this.setState({planet, loading: false});
    }).catch(this.onError);
  }


  apiService: SwapiService = new SwapiService();

  render() {

    const { planet, loading, error } = this.state;

    const hasData = !(error || loading);

    const spinner = loading ? <LoadSpinner/> : null; 
    const content = hasData ? <PlanetView planet={planet}/> : null;
    const errorMessage = error ? <ErrorIndicator/> : null;
    

    return (
        <div className="random-planet jumbotron rounded">
          {spinner}
          {content}
          {errorMessage}
        </div>

    );
  }
}

const PlanetView = ({planet}:PlanetViewProps) => {
  return (
    <React.Fragment>
      <img className="planet-image" alt={planet.name}
            src={planet.image}
      />
      <div>
        <h4>{planet.name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{planet.population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{planet.rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{planet.diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}