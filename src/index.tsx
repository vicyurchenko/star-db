//import React from 'react';
//import ReactDOM from 'react-dom';

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
}

class SwapiService {

    private apiBase: string = 'https://swapi.dev/api';

    async getResource<T>(url: string): Promise<T> {
        const res: Response = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        const body: T = await res.json();
        return body;
    }

    async getAllPeople(): Promise<Array<responsePeopleData>> {
        const res: { results : Ar } = await this.getResource<{ results: string }>(`${this.apiBase}/people/`);
        return res;
    }

    async getPerson(id: number): Promise<JSON> {
        const res: { results : JSON } = await this.getResource<{ results : JSON }>(`${this.apiBase}/people${id}`);
        return res.results;
    }

}

const swapi: SwapiService = new SwapiService();


swapi.getAllPeople().then( (people) => {
    console.log(typeof people);
    /*const personObj = JSON.parse(people) as Array<responsePeopleData>;
    personObj.forEach( (p)=> {
        console.log(p.name);
    });*/
})


export {}