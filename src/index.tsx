//import React from 'react';
//import ReactDOM from 'react-dom';

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

    async getAllPeople(): Promise<JSON> {
        const res: { results : JSON } = await this.getResource<{ results: JSON}>(`${this.apiBase}/people/`);
        return res.results;
    }

    async getPerson(id: number): Promise<JSON> {
        const res: { results : JSON } = await this.getResource<{ results : JSON }>(`${this.apiBase}/people${id}`);
        return res.results;
    }

}

const swapi: SwapiService = new SwapiService();

swapi.getAllPeople().then( (body) => { console.log(body)})


export {}