import React, {Component} from 'react';
import SwapiService from "../../services/swapi-service";
import LoadSpinner from '../load-spinner';

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
  loading: boolean
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
  }

  constructor(props: randomPlanetProps) {
    super(props);
    this.swapiService = new SwapiService();
    this.updatePlanet();
  }

  updatePlanet() {
    let planetsCount = 0;
    this.swapiService.getAllPlanets().then(p => planetsCount = p.length)

    this.swapiService.getAllPlanets().then((planets) => {
      const id: number = Math.floor(Math.random() * (planets.length-1) + 1);
      this.swapiService.getPlanet(id).then((planet) => {
        this.setState({planet, loading: false});
      });
    });
  }


  apiService: SwapiService = new SwapiService();

  render() {

    const { planet, loading } = this.state;

    const spinner = loading ? <LoadSpinner/> : null; 
    const content = !loading ? <PlanetView planet={planet}/> : null;

    return (
        <div className="random-planet jumbotron rounded">
          {spinner}
          {content}
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