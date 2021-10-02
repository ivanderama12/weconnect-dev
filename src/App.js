import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './AuthContext';
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar';

import Search from './views/search/Search';
import Login from './views/login/Login';
import Register from './views/register/Register';
import ForgotPassword from './views/forgotpassword/ForgotPassword';



function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <SearchBar />
          <div className="Content mt-3">
            <Switch>
              <Route exact path='/' component={Search} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/forgotpassword' component={ForgotPassword} />
              <Route exact path='/serviceagency' component={Search} />
              <Route path='/serviceagency/login' component={Login} />
              <Route path='/serviceagency/register' component={Register} />
            </Switch>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
