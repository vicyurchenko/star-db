import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import LoadSpinner from '../load-spinner';
import ErrorIndicator from '../error-indicator';
import {randomPlanetState, emptyProps, planetViewProps} from "../../models/types";

import './random-planet.css';

export default class RandomPlanet extends Component<emptyProps, randomPlanetState> {
  swapiService: SwapiService;

  constructor(props: emptyProps) {
    super(props);
    this.state = {
      planet: {
        name: '',
        image: '',
        rotationPeriod: 0,
        population: 0,
        diameter: 0,
      },
      loading: true,
      error: false,
    };
    this.swapiService = new SwapiService();
    this.updatePlanet();
  }

  componentDidMount(): void {
    setInterval(this.updatePlanet, 3000);
  }

  onError = (): void => this.setState({ error: true, loading: false });

   updatePlanet = (): void => {
     this.swapiService.getAllPlanets()
       .then(async (p) => {
         const planetsCount = p.length;
         try {
           const planet = await this.swapiService.getPlanet(Math.floor(Math.random() * (planetsCount - 1) + 1));
           return this.setState({ planet, loading: false });
         } catch (result) {
           return this.onError();
         }
       })
       .catch(this.onError);
   }

   render(): JSX.Element {
     const { planet, loading, error } = this.state;

     const hasData = !(error || loading);

     const spinner = loading ? <LoadSpinner /> : null;
     const content = hasData ? <PlanetView planet={planet} /> : null;
     const errorMessage = error ? <ErrorIndicator /> : null;

     return (
       <div className="random-planet jumbotron rounded">
         {spinner}
         {content}
         {errorMessage}
       </div>

     );
   }
}

const PlanetView = ({ planet }:planetViewProps): JSX.Element => (
  <>
    <img
      className="planet-image"
      alt={planet.name}
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
  </>
);
