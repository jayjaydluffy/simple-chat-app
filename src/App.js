import React from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'

import Login from './components/Login';
import Friends from './components/Friends'
import Chat from './components/Chat'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/friends">
            <Friends/>
          </Route>
          <Route path="/chat">
            <Chat/>
          </Route>
          <Route path="/" exact>
            <Login/>
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App
