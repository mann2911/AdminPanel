import React,{Component} from 'react';
import Input from '../../../Input/Input';
import LoggedIn from './LoggedIn/LoggedIn';
import {NavLink,Route,Link} from 'react-router-dom';
class Login extends Component{
    state={
        userData:null,
        fname:'',
        lname:'',
        password:'',
        forms:{
            firstname:{
              type:'input',
              config:{
                placeholder:'First Name',
                name:'firstname',
              },
              value:'',
              valid:false,
              touched:false,
              validation:{
                required:true,          
              }
            },
            password:{
                type:'input',
                config:{
                  placeholder:'Password',
                  type:'password',
                  name:'password',
                },
                touched:false,
                value:'',
                valid:false,             
                validation:{
                  required:true,
                }
              }
            },
         
    }
    componentDidMount(){
        const fname=localStorage.getItem('First name');
        const lname=localStorage.getItem('Last name');
        const password=localStorage.getItem('Password');
        this.setState({
            fname:fname,
            lname:lname,
            password:password
        })
    }
    onchangeHandler=(event,id)=>{
        let newforms={...this.state.forms};
       let updated={...newforms[id]};   
       updated.value=event.target.value;
       newforms[id]=updated;
    this.setState({
    forms:newforms,
    })
      }
      match=(e)=>{
        e.preventDefault();
        
        const info=JSON.parse(localStorage.getItem('userInfo'));
        
        const fnamefromstate=this.state.forms.firstname.value
        const passfromstate=this.state.forms.password.value
        
       
        let check=false;
        for(let x in info){
          let m=info[x];
          let m1=m['Reg1'];
          let fname=m1['firstname'];
          let lname=m1['lastname'];
          let ps=m1['password'];
        if(fnamefromstate===fname && passfromstate===ps){
           check=true;
           localStorage.setItem('activeUserFname', fname);
           localStorage.setItem('activeUserLname', lname);
           localStorage.setItem('activeUserNumber',x);
           
           break;
        }
        else{
          check=false;
           
          }
        }
      
        if(check){
          this.props.history.push('/loggedin')
      }
      else{
          alert('Write Correct Id & passsword')
         
        }
      
      
  }

    render(){
        let formsDemo=[];
        for(let key in this.state.forms){
          formsDemo.push(
           {
             id:key,
             inform:this.state.forms[key]
           }   
          )
        }
        return(
            <div>

          <h1>Welcome To Login Page</h1>


        { 
          formsDemo.map(elem=>(
          <div>     
         <Input inputtype={elem.inform.type}
          configuration={elem.inform.config}
          value={elem.inform.value}
          key={elem.id}        
          changed={(event)=>this.onchangeHandler(event,elem.id)}   
           />         
            </div>
      ))}  
      <button  onClick={this.match}>Login</button> <br/><br/>
      
      <Link to="/forgetPassword"><button>Forgot Password?</button><br/><br/></Link>
      
      <h2>New User??</h2> <Link to="/Registration1"><button>Registration</button></Link>
      {/* <Route path= '/loggedin'  component={LoggedIn}/> */}
           {/* {this.state.proceed?<Route path='/loggedin' component={LoggedIn} firstname={this.state.fname} lastname={this.state.lname}/>:null} */}
            </div>
        )
    }
}
export default Login;