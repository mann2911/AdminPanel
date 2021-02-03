import React,{Component} from 'react';
import {NavLink,Route,Redirect} from 'react-router-dom';
import UserDetails from './UserDetails/UserDetails';
import './LoggedIn.css';
import UserEducation from './UserEducation/UserEducation';

class LoggedIn extends Component{
    render(){
        
        let activeUserFname=localStorage.getItem('activeUserFname');
        let activeUserLname=localStorage.getItem('activeUserLname');
      
    return(
        
        <div>
            <h1>Welcome To Admin Panel!!!</h1><br/><br/>
            <h3>Hello {activeUserFname} {activeUserLname}</h3>
            <table>
                <thead>
                    <td> <NavLink to='/loggedin' >Home </NavLink></td>
                    <td> <NavLink to='/loggedin/userdetails'>User details</NavLink></td>
                    <td> <NavLink to='/loggedin/usereducation'>User education </NavLink></td>
                </thead>
            </table>
       
      
      
       
            
            <Route path='/loggedin/userdetails' component={UserDetails} />
            <Route path='/loggedin/usereducation' component={UserEducation} />
        </div>

    )
}
}
export default LoggedIn;