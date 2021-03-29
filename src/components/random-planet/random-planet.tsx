import React, {Component} from 'react';
import SwapiService from "../../services/swapi-service";

import './random-planet.css';


type randomPlanetProps = {};

type randomPlanetState = {
  name: string,
  image: string,
  rotationPeriod: number,
  population: number,
  diameter: number
}


export default class RandomPlanet extends Component<randomPlanetProps> {

  swapiService: SwapiService;

  state: randomPlanetState = {
    name: '',
    image: '',
    rotationPeriod: 0,
    population: 0,
    diameter: 0
  }

  constructor(props: randomPlanetProps) {
    super(props);
    this.swapiService = new SwapiService();
    this.updatePlanet();
  }

  updatePlanet() {
    this.swapiService.getAllPlanets().then((planets) => {
      const id: number = Math.floor(Math.random() * (planets.length-1) + 1);
      this.swapiService.getPlanet(id).then((planet) => {
        this.setState({
          name: planet.name,
          image: `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`,
          rotationPeriod: planet.rotation_period,
          population: planet.population,
          diameter: planet.diameter
        });
      });
    });
  }


  apiService: SwapiService = new SwapiService();

  render() {

    return (
        <div className="random-planet jumbotron rounded">
          <img className="planet-image" alt={this.state.name}
               src={this.state.image}
          />
          <div>
            <h4>{this.state.name}</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span className="term">Population</span>
                <span>{this.state.population}</span>
              </li>
              <li className="list-group-item">
                <span className="term">Rotation Period</span>
                <span>{this.state.rotationPeriod}</span>
              </li>
              <li className="list-group-item">
                <span className="term">Diameter</span>
                <span>{this.state.diameter}</span>
              </li>
            </ul>
          </div>
        </div>

    );
  }
}