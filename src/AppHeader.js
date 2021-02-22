import React from 'react';
import { NavLink } from 'react-router-dom';
import './AppHeader.css';

const navList = [
  {
    title: 'Browse restaurants',
    route: '/',
  },
  {
    title: 'Surprise me',
    route: '/random',
  },
  {
    title: 'About',
    route: '/about',
  },
  {
    title: 'Svelte',
    route: '/svelte',
  },
  {
    title: 'Vue',
    route: '/vue',
  },
];

const AppHeader = () => (
  <header>
    <div className="center-column">
      <h1>🍽 Feed me</h1>
    </div>
    <nav>
      <ol className="center-column">
        {navList.map(item => (
          <li key={item.route}>
            <NavLink to={item.route}>{item.title}</NavLink>
          </li>
        ))}
      </ol>
    </nav>
  </header>
);

export default AppHeader;
