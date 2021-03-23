//import React from 'react';
//import ReactDOM from 'react-dom';

class SwapiService {

    private apiBase: string = 'https://swapi.dev/api';

    async getResource<T>(url: string): Promise<T> {
        const res: Response = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        const body: any = await res.json();
        return body;
    }

    async getAllPeople(): Promise<{ results: object }> {
        const res: { results : object } = await this.getResource<{ results: object}>(`${this.apiBase}/people/`);
        return res;
    }

    async getPerson(id: number): Promise<{ results: object }> {
        const res: { results : object } = await this.getResource<{ results: object}>(`${this.apiBase}/people${id}`);
        return res;
    }

}

const swapi: SwapiService = new SwapiService();

swapi.getAllPeople().then( (body) => { console.log(body)})


export {}