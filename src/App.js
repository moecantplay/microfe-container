import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AppHeader from './AppHeader';
import MicroReact from './MicroReact/MicroReact.js';
import MicroSvelte from './MicroSvelte/MicroSvelte.js';
import About from './About';

const App = () => {
  const {
    REACT_APP_BROWSE_HOST: browseHost,
    REACT_APP_RESTAURANT_HOST: restaurantHost,
    REACT_APP_OTHER_HOST: otherHost,
  } = process.env;

  const [loading, setLoading] = useState(false);
  const [numResto, setNumResto] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_CONTENT_HOST}/restaurants.json`)
      .then(res => res.json())
      .then(restaurants => {
        setNumResto(restaurants.length);
        setLoading(false);
      });
  }, []);

  const getRandomRestaurantId = () =>
    setNumResto(Math.floor(Math.random() * numResto) + 1);

  const Browse = ({ history }) => (
    <MicroReact history={history} host={browseHost} name="Browse" />
  );
  const Restaurant = ({ history }) => (
    <MicroReact history={history} host={restaurantHost} name="Restaurant" />
  );
  const Other = ({ history }) => (
    <MicroSvelte history={history} host={otherHost} name="Other" />
  );

  const Random = () => (
    <Redirect to={`/restaurant/${getRandomRestaurantId()}`} />
  );

  return (
    <>
      {loading ? (
        'Loading...'
      ) : (
        <BrowserRouter>
          <React.Fragment>
            <AppHeader />
            <Switch>
              <Route exact path="/" component={Browse} />
              <Route exact path="/restaurant/:id" component={Restaurant} />
              <Route exact path="/random" render={Random} />
              <Route exact path="/about" render={About} />
              <Route exact path="/other" render={Other} />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
