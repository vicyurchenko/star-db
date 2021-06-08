export type appProps = Record<string, unknown>

export type appState = {
  selectedItem: number
}

export type person = {
  id: number,
  name: string
};

export type peopleListProps = {
  onItemSelect: Function
}

export type peopleListState = {
  people: person[],
  error: boolean,
  loading: boolean
}

export type personDetails = {
  itemId: number
};

export type personData = {
  id: number,
  name: string,
  gender: string,
  eyeColor: string,
  image: string,
  birthYear: string
}

export type personState = {
  person: personData | null,
  loading: boolean,
  error: boolean
}

export type randomPlanetProps = Record<string, unknown>;

export type randomPlanet = {
  name: string,
  image: string,
  rotationPeriod: number,
  population: number,
  diameter: number
}

export type randomPlanetState = {
  planet: randomPlanet,
  loading: boolean,
  error: boolean
}

export type planetViewProps = {
  planet: randomPlanet
}

export type responseHumanData = {
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

export type responsePlanetData = {
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

export type responseStarshipData = {
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

export type planetData = {
  id: number,
  name: string,
  image: string,
  rotationPeriod: number,
  diameter: number,
  population: number
}

export type humanDataResults = {
  results: responseHumanData[];
};
