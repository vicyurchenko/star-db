type responsePeopleData = {
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
    name: string,
    model: string,
    manufacturer: string,
    cost_in_credits: string,
    length: string,
    max_atmosphering_speed: string,
    crew: string,
    passengers: string,
    cargo_capacity: string,
    consumables: string,
    hyperdrive_rating: string,
    MGLT: string,
    starship_class: string,
    pilots: string[],
    films: string[],
    created: string,
    edited: string,
    url: string
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

export default class SwapiService {

    private apiBase: string = 'https://swapi.dev/api';

    async getResource(url: string): Promise<any> {
        const res: Response = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        const body: any = await res.json();
        return body;
    }

    async getAllPeople(): Promise<responsePeopleData[]> {
        const res: { results : responsePeopleData[] } = await this.getResource(`${this.apiBase}/people/`);
        return res.results;
    }

    async getPerson(id: number): Promise<responsePeopleData> {
        const res: responsePeopleData = await this.getResource(`${this.apiBase}/people/${id}`);
        return res;
    }

    async getAllPlanets(): Promise<responsePlanetData[]> {
        const res: { results : responsePlanetData[] } = await this.getResource(`${this.apiBase}/planets/`);
        return res.results;
    }

    async getPlanet(id: number): Promise<responsePlanetData> {
        const res: responsePlanetData = await this.getResource(`${this.apiBase}/planets/${id}`);
        return res;
    }

    async getAllStarships(): Promise<responseStarshipData[]> {
        const res: { results : responseStarshipData[] } = await this.getResource(`${this.apiBase}/starships/`);
        return res.results;
    }

    async getStarship(id: number): Promise<responseStarshipData> {
        const res: responseStarshipData = await this.getResource(`${this.apiBase}/starships/${id}`);
        console.log(res);
        return res;
    }
}