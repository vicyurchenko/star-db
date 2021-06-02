type responseHumanData = {
  birth_year: string,
  created: string,
  edited: string,
  eye_color: string,
  films: string[],
  gender: string,
  hair_color: string,
  height: string,
  homeworld: string,
  mass: string,
  name: string,
  skin_color: string,
  species: []
  starships: string[],
  url: string,
  vehicles: string[]
};

type responsePlanetData = {
  climate: string,
  created: string,
  diameter: number,
  edited: string,
  films: string[],
  gravity: number,
  name: string,
  orbital_period: number,
  population: number,
  residents: string[],
  rotation_period: number,
  surface_water: number,
  terrain: number,
  url: string,
};

type responseStarshipData = {
  MGLT: string,
  cargo_capacity: string,
  consumables: string,
  cost_in_credits: string,
  created: string,
  crew: string,
  edited: string,
  hyperdrive_rating: string,
  length: string,
  manufacturer: string,
  max_atmosphering_speed: string,
  model: string,
  name: string,
  passengers: string,
  films: string[],
  pilots: string[],
  starship_class: string,
  url: string,
};

type planetData = {
  id: number,
  name: string,
  image: string,
  rotationPeriod: number,
  diameter: number,
  population: number
}

type humanData = {
  id: number,
  name: string,
}

type humanDataResults = {
  results: responseHumanData[];
};

export default class SwapiService {
  private apiBase = 'https://swapi.dev/api';

  getResource = async <T>(url: string): Promise<T> => {
    console.log(url);
    const res: Response = await fetch(url);
    console.log(res);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    const json: { results?: T } = await res.json() as T;
    if (json.results) {
      return json.results;
    }
    return json as T;
  };

  async getAllPeople(): Promise<humanData[]> {
    const allPeople: humanDataResults = {
      results: [],
    };
    const res: responseHumanData[] = await this.getResource<responseHumanData[]>(`${this.apiBase}/people/`);
    return res.map((human) => this.transformHuman(human));
  }

  async getPerson(id: number): Promise<humanData> {
    const res: responseHumanData = await this.getResource<responseHumanData>(`${this.apiBase}/people/${id}`);
    return this.transformHuman(res);
  }

  async getAllPlanets(): Promise<responsePlanetData[]> {
    const res: responsePlanetData[] = await this.getResource<responsePlanetData[]>(`${this.apiBase}/planets/`);
    return res;
  }

  async getPlanet(id: number): Promise<planetData> {
    const res: responsePlanetData = await this.getResource<responsePlanetData>(`${this.apiBase}/planets/${id}`);
    console.log('1234', res);
    return this.transformPlanet(res);
  }

  async getAllStarships(): Promise<responseStarshipData[]> {
    const res: { results: responseStarshipData[] } = await this.getResource(`${this.apiBase}/starships/`);
    return res.results;
  }

  async getStarship(id: number): Promise<responseStarshipData> {
    const res: responseStarshipData = await this.getResource(`${this.apiBase}/starships/${id}`);
    console.log(res);
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

  private transformHuman = (respHuman: responseHumanData) : humanData => {
    let id = 0;
    const regResult = /\/(\d*)\/$/.exec(respHuman.url);
    if (regResult) {
      id = regResult[1] as unknown as number;
    }

    const human: humanData = {
      id,
      name: respHuman.name,
    };
    return human;
  }
}
