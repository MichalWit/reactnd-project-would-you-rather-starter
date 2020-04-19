import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import LogIn from './LogIn'
import Dashboard from './Dashboard'
import NewQuestion from './NewQuestion'
import Nav from './Nav';
import LeaderBoard from './LeaderBoard';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav/>
        <Route path='/' exact component={Dashboard}/>
        <Route path='/login' component={LogIn}/>
        <Route path='/newquestion' component={NewQuestion}/>
        <Route path='/leaderboard' component={LeaderBoard}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
