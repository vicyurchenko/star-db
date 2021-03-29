import React, {Component} from 'react';
import './item-list.css';
import {Interface} from "readline";

type itemListProps = {}

type itemListState = {

}

export default class ItemList extends Component<itemListProps, itemListState> {

  constructor(props: itemListProps) {
    super(props);

    this.state = {

    }
  }



  render() {
    return (
      <ul className="item-list list-group">
        <li className="list-group-item">
          Luke Skywalker
        </li>
        <li className="list-group-item">
          Darth Vader
        </li>
        <li className="list-group-item">
          R2-D2
        </li>
      </ul>
    );
  }
}