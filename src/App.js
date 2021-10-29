import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './AuthContext';

import Search from './components/views/Search';
import Login from './components/views/Login';
import Register from './components/views/register/Register';
import ForgotPassword from './components/views/ForgotPassword';
import Admin from './components/views/admin/Admin';
import AdminManageUsers from './components/views/admin/ManageUsers';
import AdminManageServices from './components/views/admin/ManageServices'
import SADash from './components/views/serviceagency/Dashboard'
import Premium from './components/views/serviceagency/Premium';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <div>
            <Switch>
              <Route exact path='/' component={Search} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/forgotpassword' component={ForgotPassword} />
              <Route exact path='/serviceagency' component={Search} />
              <Route path='/serviceagency/login' component={Login} />
              <Route path='/serviceagency/register' component={Register} />
              <Route path='/serviceagency/premium' component={Premium} />
              <Route path='/serviceagency/dashboard' component={SADash} />
              <Route exact path='/admin' component={Admin} />
              <Route path='/admin/users' component={AdminManageUsers} />
              <Route path='/admin/services' component={AdminManageServices} />
            </Switch>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
