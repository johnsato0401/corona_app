import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import Chatbot from 'containers/chatbot/Chatbot';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/corona' />
        </Route>
        <Route path='/corona' component={ Chatbot } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
