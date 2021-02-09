import React,{Component} from 'react';
import Input from '../../../Input/Input';
import {Link} from 'react-router-dom';
import './Reg2.css';
import Reg1 from './Reg1';
class Reg2 extends Component{
    state={
        form2:{
            sclname:{
                type:'input',
                config:{
                  placeholder:'Institute/School Name',
                  name:'sclname',
                },
                value:'',
                valid:false,
                touched:false,
                validation:{
                  required:true,
                 minLength:4 
                }
              },
              percent:{
                type:'input',
                config:{
                  placeholder:'Percentage/CGPA',
                  name:'percent',
                },
                value:'',
                valid:false,
                touched:false,
                validation:{
                  required:true,
                  isNumeric:true,
                  
                }
              },
              course:{
                type:'input',
                config:{
                  placeholder:'Course/Stream',
                  name:'course',
                },
                value:'',
                valid:false,
                touched:false,
                validation:{
                  required:true,
                  
                }
              },
              sdate:{
                type:'date',
                config:{
                  placeholder:'Starting date',
                  name:'sdate',
                },
                value:'',
                valid:false,
                touched:false,
                validation:{
                  required:true,
                  
                }
              },
              edate:{
                type:'date',
                config:{
                  placeholder:'Course/Stream',
                  name:'edate',
                },
                value:'',
                valid:false,
                touched:false,
                validation:{
                  required:true,                 
                }
              }
              
        },
        addData:[],
        userInfo:[],
        formisValid:false
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

      if (rules.isPercent) {
        let pattern=/[0-9].[0-9]$/;
        isValid =  pattern.test(value) && isValid
      }

      return isValid; 
    }  

    onchangeHandler=(event,id)=>{
      
      let newforms={...this.state.form2};
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
          form2:newforms,
          formisValid:formisValid
   })
        
      }

      submitted=(e)=>{

        e.preventDefault();
         let reg1=JSON.parse(localStorage.getItem('info'));
        let reg2=JSON.parse(localStorage.getItem('Reg2'));
        let userInfos=JSON.parse(localStorage.getItem('userInfo'));
        let userInfo=[];
        userInfo=userInfos;
        userInfo.push({Reg1:reg1,Reg2:reg2});
      
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        console.log("reg2"+reg2);
        let m1=reg2[0];
        let m2=m1["course"];
        console.log("m2"+m2);
        localStorage.removeItem('Reg2');
        localStorage.removeItem('info');
      
      
        this.props.history.push('/login');
      }

      previous=(props)=>{
        this.props.history.push('/Registration1');
      
      }
      addMore=()=>{
        
                
        const updatedForm2 = {
         ...this.state.form2
        }
        
        const addCopyData = [
          ...this.state.addData
       ]
      
       addCopyData.push(updatedForm2);
       console.log("reg 2 add more is call and"+addCopyData);
      localStorage.setItem('Reg2', JSON.stringify(addCopyData))
        
               
      for(let id in updatedForm2) {
        updatedForm2[id].touched = false;
        updatedForm2[id].value = '';
        updatedForm2[id].valid = false;
        
      }
      this.setState({ form2: updatedForm2, addData: addCopyData, formisValid: false })
      }
        
      
    render(){
        let loadform=[];
        for(let key in  this.state.form2){
            loadform.push({
                id:key,
                info:this.state.form2[key]
            })
        
        }
        return(
            <div className='Reg2'>
              <h1>WelCome to Registration Page</h1><br/>
              <h5>Pl Enter Your valid details</h5><br/>
              <h4>Educational Details</h4>
                <form>
               
            {
            loadform.map(elem=>(
                <Input inputtype={elem.info.type}
                configuration={elem.info.config}
                value={elem.info.value}
                key={elem.id}        
                valid={!elem.info.valid}
                shouldvalidate={elem.info.validation}
                touched={elem.info.touched}
                changed={(event)=>this.onchangeHandler(event,elem.id)}
               />
            ))}
            <button onClick={this.previous}>Previous</button>
            <button disabled={!this.state.formisValid}onClick={this.addMore}>Add More Data</button>
                <button disabled={!this.state.formisValid} onClick={this.submitted}>Register</button> 
                </form>
              
                
             
            </div>
        )
    }
}
export default Reg2;