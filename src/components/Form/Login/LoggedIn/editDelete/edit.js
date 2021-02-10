import React,{Component} from "react";
import { Redirect } from "react-router-dom";
import Input from '../../../../../Input/Input';
class edit extends Component{

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
                  checkDate:true                 
                }
              }
              
        },
        addData:[],
        userInfo:[],
        formisValid:false,
        id:null
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
        
      if(rules.checkDate){
        if(value && this.state.form2.sdate)
        {
            if(value < this.state.form2.sdate.value){
                alert( 'End date should be greater than start date..');

                isValid=false;
            }
            else{

            }

        }
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
    
        this.setState({
            form2:newforms,
            formisValid:formisValid
     })
          
        }

        componentDidMount(){

        let editData=JSON.parse(localStorage.getItem('editDatas'));
         if(editData){

            let form2={...this.state.form2}

            form2.sclname.value=editData['sclname'];
            form2.course.value=editData['course'];
            form2.percent.value=editData['percent'];
            form2.sdate.value=editData['sdate'];
            form2.edate.value=editData['edate'];
            let id=editData['id'];


       this.setState({form2:form2,formisValid:true,id:id});
         
        }
        
          } 

    submitted=()=>{
        //alert("submit called");
        let userInfo=JSON.parse(localStorage.getItem('userInfo'));
        let userId=localStorage.getItem('activeUserNumber');
        let info=userInfo[userId];
        let d1=info['Reg2'];
        let d2=d1[this.state.id];

        
        d2['sclname']=this.state.form2['sclname'].value;
        d2['course']=this.state.form2['course'].value;
        d2['percent']=this.state.form2['percent'].value;
        d2['sdate']=this.state.form2['sdate'].value;
        d2['edate']=this.state.form2['edate'].value;

      

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        localStorage.removeItem('editDatas')
        this.props.history.push('/loggedin/usereducation');
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
              <h1>Edit Your Details</h1><br/>
             
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
           
                <br/>
                <button disabled={!this.state.formisValid} onClick={this.submitted}>Submit</button> 
                </form>
              
                
             
            </div>
        )
    }
 }




export default edit;