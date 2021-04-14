import React from 'react';

import './header.css';

export const Header: React.FC = () => (
  <div className="header d-flex">
    <h3>
      <span>Star DB</span>
    </h3>
    <ul className="d-flex">
      <li>
        <span>People</span>
      </li>
      <li>
        <span>Planets</span>
      </li>
      <li>
        <span>Starships</span>
      </li>
    </ul>
  </div>
);

export default Header;
