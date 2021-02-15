import React from 'react';
import {BrowserRouter, Route,Switch } from 'react-router-dom'
// 应用的根组件
import Login from './page/login/login';
import Admin from './page/admin/admin';
import DemoForm from './form';
import Demo from './store'

const App =()=>{
 
    return(
      <BrowserRouter>
          <Switch>
            <Route exact path='/login' component={Login}></Route>
            <Route path='/admin' component={Admin}></Route>
            <Route path='/form' component={DemoForm}></Route>
            <Route path='/store' component={Demo}></Route>
          </Switch>
      </BrowserRouter>
    )
};
export default App;