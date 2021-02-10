import React, { Component } from "react";
import Input from '../../../Input/Input';
import './Reg.css';
import {Link, Redirect} from 'react-router-dom';

class Reg1 extends Component{  
  state={
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
      lastname:{
        type:'input',
        config:{
          placeholder:'Last Name',
          name:'lastname',
        },
        touched:false,
        value:'',
        valid:false,
        validation:{
          required:true,
        }
      },
      email:{
        type:'input',
        config:{
          placeholder:'E-mail',
          name:'email',
        },
        value:'',
        touched:false,
        valid:false,    
        validation:{
          required:true,
          isEmail:true
        }
      },
      phone:{
        type:'input',
        config:{
          placeholder:'Mobile Number',
          name:'phone',
         },
         value:'',
         touched:false,
         valid:false,
         validation:{
           required:true,
           isNumeric:true,
           minLength:10,
           maxLength:10
         }
      },
      gender:{
        type:'select',
        label:'Gender',
        config:{
         options:[
           {value:'Male', display:'Male'},
           {value:'Female', display:'Female'},
           {value:'Other', display:'Other'}
         ]
      }, 
      value:'Male',
      valid:true,
      validation:{}
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
      },
      confirmpassword:{
        type:'input',
        config:{
          placeholder:'Re-enter Password',
          type:'password',
          name:'confirmpassword',
        },
        touched:false,
        value:'',
        valid:false,
        validation:{
          required:true,
          check:true
        },     
      }     
    },
    passwordcheck: true  ,
    formisValid:false,
 }
 
 
 
   checkValidity=(value,rules)=>{
         
    let isValid=true;
   
    if(!rules){
      return true;
    }

     if(rules.required){
    isValid=value.trim()!=='' && isValid
    }

     if(rules.isNumeric){
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid
    }

     if(rules.minLength){
    isValid = value.length >= rules.minLength && isValid
    }

    if(rules.maxLength){
    isValid = value.length <= rules.maxLength && isValid
    }

     if(rules.isEmail){
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid
    }

    if(rules.check){
      let CPassword=value;
      let password=this.state.forms['password'].value;
      if (CPassword ===password) {
          isValid=true;
      }
      else{
        isValid=false;
      }
    }

    return isValid;

  }



  onchangeHandler=(event,id)=>{
   
   let newforms={...this.state.forms};
   let updated={...newforms[id]};   
   updated.value=event.target.value;
   newforms[id]=updated;
   updated.touched=true;
   updated.valid=this.checkValidity(updated.value,updated.validation) 
   newforms[id].value=updated.value;
  
   let formisValid=true;
   for(let id in newforms){
      formisValid=newforms[id].valid && formisValid
  }
  this.setState({
       forms:newforms,
       formisValid:formisValid
})
  

  }

   submit=(event)=>{
  
  // event.preventDefault();
   

   let firstname=this.state.forms.firstname.value;
   let lastname=this.state.forms.lastname.value;
   let password=this.state.forms.password.value;
   let gender=this.state.forms.gender.value;
   let email=this.state.forms.email.value;
   let phone=this.state.forms.phone.value;
   let userdata={'firstname':firstname,'lastname':lastname,'password':password,'gender':gender,'email':email,'phone':phone}
    
    localStorage.setItem('info',JSON.stringify(userdata));
    alert("registartion  Step 1 Completed");
  this.props.history.push('/Registration2');  
 
   }


  componentDidMount(){

    let useForms=JSON.parse(localStorage.getItem('info'));
    if(useForms){

      let forms={...this.state.forms}

      for(let id in forms){
        forms[id].value=useForms[id];
        forms[id].touched=true;
        forms[id].valid=true;

      }

      this.setState({forms:forms,formisValid:true})
    }


  } 

  render(){ 
  
    let formsKeys=[];
    for(let key in this.state.forms){
      formsKeys.push(
       {
         id:key,
         para:this.state.forms[key]
       }   
      )
    }
  return (
    <div className="Reg" >
      <h1>WelCome to Registration Page</h1><br/>
      <h5>Pl Enter Your valid details</h5><br/>
      <h4>Personal Details</h4>
     
     <form>
      { 
         formsKeys.map(elem=>(
         <div>     
         <Input inputtype={elem.para.type}
          configuration={elem.para.config}
          value={elem.para.value}
          key={elem.id}        
          valid={!elem.para.valid}
          shouldvalidate={elem.para.validation}
          touched={elem.para.touched}
          changed={(event)=>this.onchangeHandler(event,elem.id)}       
          label={elem.para.label}/>         

            </div>
      ))}   

<button disabled={!this.state.formisValid} type="submit" onClick={this.submit}>Next</button>   
     </form>
     
    </div>
  );
}
}
export default Reg1;