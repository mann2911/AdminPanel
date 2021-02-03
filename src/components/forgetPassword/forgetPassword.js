import React,{Component} from 'react';
import Input from '../../Input/Input';
import {Link, Redirect} from 'react-router-dom';
class forgetPassword extends Component{
    state={

        forms:{
            oldPassword:{
                type:'input',
                config:{
                    placeholder:"Old Password",
                    name:"oldps"
                },
                value:'',
                data:true,
                valid:false,
                touched:false,
                validation:{
                    required:true
                }
            },
            newPassword:{
                type:'input',
                config:{
                    placeholder:"New Password",
                    name:"newps"
                },
                value:'',
                check:true,
                valid:false,
                touched:false,
                validation:{
                    required:true
                }
            },
        },
        formisValid:false
    }
    checkValidity=(value,rules)=>{
         
        let isValid=true;
       
        if(!rules){
          return true;
        }
    
        
    
        if(rules.check){
          let CPassword=value;
          let password=this.state.forms['oldPassword'].value;
          if (CPassword===password) {
              isValid=true;
          }
          else{
            isValid=false;
          }
        }
    
        return isValid;
    
      }
    onchangeHandler=(event,id)=>{
    // alert();
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
    console.log("old"+this.state.forms["oldPassword"].value);
    console.log("new"+this.state.forms["newPassword"].value);
    
  }

  check=(event)=>{
    event.preventDefault();

    let oldData=JSON.parse(localStorage.getItem('info'));
    let oldPassword1=oldData["password"];
    let oldPassword2=this.state.forms["oldPassword"].value;
    let newPassword=this.state.forms["newPassword"].value;

    if(oldPassword1===oldPassword2){
        if(oldPassword1===newPassword){
            alert("old passsword cannot be new Password!!");
        }
        else{
            alert("Password Change Successfully");
            oldData["password"]=newPassword;
            localStorage.setItem('info',JSON.stringify(oldData));
            this.props.history.push("/login");
        }
    }
    else{
        alert("old password is not matching!!1");
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
        return(
            <div>
                <h2>Password Changing Page</h2>
                <form onSubmit={this.check}>
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
                    />         
            </div>
      ))}  

                        <button type="Submit" onClick={this.check}>Submit</button>
                </form>
            </div>
        );
    }
}

export default forgetPassword;