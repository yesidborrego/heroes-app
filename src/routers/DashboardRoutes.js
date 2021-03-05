// import React, { lazy, Suspense } from 'react'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import DcScreen from '../components/dc/DcScreen'
import HeroScreen from '../components/heroes/HeroScreen'
import MarvelScreen from '../components/marvel/MarvelScreen'
import Navbar from '../components/ui/Navbar'
import SearchScreen from '../components/search/SearchScreen'

/*
const DcScreen = lazy(() => import('../components/dc/DcScreen'));
const HeroScreen = lazy(() => import('../components/heroes/HeroScreen'));
const MarvelScreen = lazy(() => import('../components/marvel/MarvelScreen'));
const Navbar = lazy(() => import('../components/ui/Navbar'));
const SearchScreen = lazy(() => import('../components/search/SearchScreen'));
*/

export const DashboardRoutes = () => {
  return (
    <div>
      {/*<Suspense fallback={<div>Loading...</div>}>*/}
        <Navbar/>

      <div className="container mt-3">
        <Switch>
          <Route exact path="/marvel" component={MarvelScreen} />
          <Route exact path="/dc" component={DcScreen} />
          <Route exact path="/hero/:heroId" component={HeroScreen} />
          <Route exact path="/search" component={SearchScreen} />

          <Redirect to="/marvel" />
        </Switch>
      </div>
    {/*</Suspense>*/}
    </div>
  )
}
