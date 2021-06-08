import {personData, responseHumanData, planetData, responsePlanetData, responseStarshipData} from "../models/types";

export default class SwapiService {
  private apiBase = 'https://swapi.dev/api';

  getResource = async <T>(url: string): Promise<T> => {
    const res: Response = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    const json: { results?: T } = await res.json() as T;
    if (json.results) {
      return json.results;
    }
    return json as T;
  };

  async getAllPeople(): Promise<personData[]> {
    const res: responseHumanData[] = await this.getResource<responseHumanData[]>(`${this.apiBase}/people/`);
    return res.map((human) => this.transformHuman(human));
  }

  async getPerson(id: number): Promise<personData> {
    const res: responseHumanData = await this.getResource<responseHumanData>(`${this.apiBase}/people/${id}`);
    return this.transformHuman(res);
  }

  async getAllPlanets(): Promise<responsePlanetData[]> {
    const res: responsePlanetData[] = await this.getResource<responsePlanetData[]>(`${this.apiBase}/planets/`);
    return res;
  }

  async getPlanet(id: number): Promise<planetData> {
    const res: responsePlanetData = await this.getResource<responsePlanetData>(`${this.apiBase}/planets/${id}`);
    return this.transformPlanet(res);
  }

  async getAllStarships(): Promise<responseStarshipData[]> {
    const res: { results: responseStarshipData[] } = await this.getResource(`${this.apiBase}/starships/`);
    return res.results;
  }

  async getStarship(id: number): Promise<responseStarshipData> {
    const res: responseStarshipData = await this.getResource(`${this.apiBase}/starships/${id}`);
    return res;
  }

  private transformPlanet = (respPlanet: responsePlanetData) : planetData => {
    let id = 0;
    const regResult = /\/(\d*)\/$/.exec(respPlanet.url);
    if (regResult) {
      id = regResult[1] as unknown as number;
    }

    const planet: planetData = {
      id,
      name: respPlanet.name,
      image: `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`,
      rotationPeriod: respPlanet.rotation_period,
      population: respPlanet.population,
      diameter: respPlanet.diameter,
    };

    return planet;
  }

  private transformHuman = (respHuman: responseHumanData) : personData => {
    let id = 0;
    const regResult = /\/(\d*)\/$/.exec(respHuman.url);
    if (regResult) {
      id = regResult[1] as unknown as number;
    }

    const human: personData = {
      id,
      name: respHuman.name,
      gender: respHuman.gender,
      eyeColor: respHuman.eye_color,
      image: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`,
      birthYear: respHuman.birth_year,
    };
    return human;
  }
}
