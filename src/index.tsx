//import React from 'react';
//import ReactDOM from 'react-dom';

const getResource = async (url: string) => {
    const res: Response = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    const body: JSON = await res.json();
    return body;
}

getResource('https://swapi.dev/api/people/1/')
    .then((body) => {
        console.log(body);
    })
    .catch( (e) => {
        console.error('Could not fetch', e);
    } );

export {}