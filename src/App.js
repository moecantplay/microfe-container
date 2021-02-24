import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AppHeader from './AppHeader';
import MicroReact from './MicroReact/MicroReact';
import MicroSvelte from './MicroSvelte/MicroSvelte';
import MicroVue from './MicroVue/MicroVue';
import About from './About';

const {
  REACT_APP_BROWSE_HOST: browseHost,
  REACT_APP_RESTAURANT_HOST: restaurantHost,
  REACT_APP_SVELTE_HOST: svelteHost,
  REACT_APP_VUE_HOST: vueHost
} = process.env;

let numRestaurants = 0;

fetch(`${process.env.REACT_APP_CONTENT_HOST}/restaurants.json`)
  .then(res => res.json())
  .then(restaurants => {
    numRestaurants = restaurants.length;
  });

const getRandomRestaurantId = () =>
  Math.floor(Math.random() * numRestaurants) + 1;

const Browse = ({ history }) => (
  <MicroReact history={history} host={browseHost} name="Browse" />
);
const Restaurant = ({ history }) => (
  <MicroReact history={history} host={restaurantHost} name="Restaurant" />
);
const Svelte = ({ history }) => (
  <MicroSvelte history={history} host={svelteHost} name="Svelte" />
);
const Vue = ({ history }) => (
  <MicroVue history={history} host={vueHost} name="Vue" />
);

const Random = () => <Redirect to={`/restaurant/${getRandomRestaurantId()}`} />;

const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <AppHeader />
      <Switch>
        <Route exact path="/" component={Browse} />
        <Route exact path="/restaurant/:id" component={Restaurant} />
        <Route exact path="/random" render={Random} />
        <Route exact path="/about" render={About} />
        <Route exact path="/svelte" render={Svelte} />
        <Route exact path="/vue" render={Vue} />
      </Switch>
    </React.Fragment>
  </BrowserRouter>
);

export default App;
