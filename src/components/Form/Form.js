import React, { Component } from 'react';
import Reg1 from './Registration/Reg1';
import Reg2 from './Registration/Reg2';
import Login from './Login/Login';
import homePage from '../../containers/homePage/homePage';
import UserDetails from './Login/LoggedIn/UserDetails/UserDetails';
import UserEducation from './Login/LoggedIn/UserEducation/UserEducation';
import {Route,Switch} from 'react-router-dom';
import LoggedIn from './Login/LoggedIn/LoggedIn';
import forgetPassword from '../forgetPassword/forgetPassword';
class Form extends Component{
    render(){
        return(
            <div>
         <Switch>
             <Route path='/userdetails' component={UserDetails}  />
             <Route path='/usereducation' component={UserEducation}  />
             <Route path='/loggedin' component={LoggedIn}  />
            <Route path='/login' component={Login}  />
            <Route  path='/Registration2'  component={Reg2} />
            <Route  path='/Registration1'  component={Reg1} />
            <Route  path='/forgetPassword'  component={forgetPassword} />
            <Route  path='/'  component={homePage} />
            </Switch>
            </div>
        )
    }
}
export default Form;