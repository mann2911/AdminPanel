import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './homePage.css';
class homePage extends Component{

    render(){

        return(
       <div className="body">
            <h1>WelCome To My Home Page</h1><br/><br/><br/>
            <center><Link to="/login"><button><h2>Login Page</h2></button></Link></center><br/><br/>
            <center><Link to="/Registration1"><button><h2>Registration</h2></button></Link></center><br/><br/>


        </div>
        );


    }



}

export default homePage;



