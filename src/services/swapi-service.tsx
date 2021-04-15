// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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

export default class SwapiService {
  private apiBase = 'https://swapi.dev/api';

  getResource = async (url: string): Promise<any> => {
    const res: Response = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: any = await res.json();
    return body;
  };

  async getAllPeople(): Promise<humanData[]> {
    const res: { results: responseHumanData[] } = await this.getResource(`${this.apiBase}/people/`);

    const people: humanData[] = [];

    res.results.map((human) => {
      people.push(this.transformHuman(human));
    });

    return people;
  }

  async getPerson(id: number): Promise<humanData> {
    const res: responseHumanData = await this.getResource(`${this.apiBase}/people/${id}`);
    return this.transformHuman(res);
  }

  async getAllPlanets(): Promise<responsePlanetData[]> {
    const res: { results: responsePlanetData[] } = await this.getResource(`${this.apiBase}/planets/`);
    return res.results;
  }

  async getPlanet(id: number): Promise<planetData> {
    const res: responsePlanetData = await this.getResource(`${this.apiBase}/planets/${id}`);
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

  private transformPlanet(respPlanet: responsePlanetData) : planetData {
    let id = 0;

    const regResult: any = respPlanet.url.match(/\/(\d*)\/$/);

    if (typeof regResult != null) {
      id = regResult[1];
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

  private transformHuman(respHuman: responseHumanData) : humanData {
    let id = 0;
    const regResult: any = respHuman.url.match(/\/(\d*)\/$/);
    if (typeof regResult != null) {
      id = regResult[1];
    }
    const human: humanData = {
      id,
      name: respHuman.name,
    };
    return human;
  }
}
