import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import PrivateRoute from './components/PrivateRoute'

import Search from './components/views/Search'
import Login from './components/views/Login'
import Register from './components/views/register/Register'
import ForgotPassword from './components/views/ForgotPassword'
import Dashboard from './components/views/establishment/Dashboard.js'
import EstSearch from './components/views/establishment/Search.js'
import EstAgreements from './components/views/establishment/Agreements.js'
import EstAccount from './components/views/establishment/Account.js'
import EstMessages from './components/views/establishment/Messages.js'
import EstAgency from './components/views/establishment/ViewAgency.js'
import EstRequest from './components/views/establishment/RequestQuotation.js'

import Admin from './components/views/admin/Admin'
import AdminManageUsers from './components/views/admin/ManageUsers'
import AdminManageServices from './components/views/admin/ManageServices'
import AgencyDash from './components/views/serviceagency/Dashboard'
import AgencyAccount from './components/views/serviceagency/account/Account'
import AgencyServices from './components/views/serviceagency/services/Services'
import AgencyAgreements from './components/views/serviceagency/agreements/Agreements'
import AgencySend from './components/views/serviceagency/agreements/SendDocument'
import Premium from './components/views/serviceagency/Premium'


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
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/search' component={EstSearch} />
              <Route path='/agreements' component={EstAgreements} />
              <Route path='/account' component={EstAccount} />
              <Route path='/messages' component={EstMessages} />
              <Route exact path='/agency/:id' component={EstAgency} />
              <Route path='/agency/:id/request' component={EstRequest} />

              <Route exact path='/serviceagency' component={Search} />
              <Route path='/serviceagency/login' component={Login} />
              <Route path='/serviceagency/register' component={Register} />
              <Route path='/serviceagency/premium' component={Premium} />
              <Route path='/serviceagency/dashboard' component={AgencyDash} />
              <Route path='/serviceagency/account' component={AgencyAccount} />
              <Route path='/serviceagency/services' component={AgencyServices} />
              <Route path='/serviceagency/agreements' component={AgencyAgreements} />
              <Route path='/serviceagency/send' component={AgencySend} />

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
