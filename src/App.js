import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './AuthContext';
import PrivateRoute from './components/PrivateRoute';

import Search from './components/views/Search';
import Login from './components/views/Login';
import Register from './components/views/register/Register';
import ForgotPassword from './components/views/ForgotPassword';
import Admin from './components/views/admin/Admin';
import AdminManageUsers from './components/views/admin/ManageUsers';
import AdminManageServices from './components/views/admin/ManageServices'
import AgencyDash from './components/views/serviceagency/Dashboard'
import AgencyAccount from './components/views/serviceagency/account/Account'
import AgencyServices from './components/views/serviceagency/services/Services'
import EditService from './components/views/serviceagency/services/Edit'
import Premium from './components/views/serviceagency/Premium';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <div>
            <Switch>
              <PrivateRoute exact path='/' component={Search} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/forgotpassword' component={ForgotPassword} />
              <Route exact path='/serviceagency' component={Search} />
              <Route path='/serviceagency/login' component={Login} />
              <Route path='/serviceagency/register' component={Register} />
              <Route path='/serviceagency/premium' component={Premium} />
              <Route path='/serviceagency/dashboard' component={AgencyDash} />
              <Route path='/serviceagency/account' component={AgencyAccount} />
              <Route exact path='/serviceagency/services' component={AgencyServices} />
              <Route path='/serviceagency/services/:id' component={EditService} />
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
