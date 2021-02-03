import React,{Component} from 'react';
import './UserEducation.css';

class UserEducation extends Component{
    
    edit=(id)=>{
        alert('edit called'+id);
    }
    
    delete=(id)=>{
        alert('delete called'+id);
    }
    makeup=(q1)=>{
        return(
        <tr>
            <td>{q1['sclname'].value}</td>
          
            <td>{q1['course'].value}</td>
            <td>{q1['percent'].value}</td>
            <td>{q1['sdate'].value}</td>
            <td>{q1['edate'].value}</td>
            <td><button onClick={this.edit}>Edit</button></td>
            <td><button onClick={this.delete}>Delete</button></td>
        </tr>
        );
        
    }

    render(){
        const info=JSON.parse(localStorage.getItem('userInfo'));
       let x=localStorage.getItem('activeUserNumber');
        let m=info[x];
        let m1=m['Reg2'];
        let data='';
        let dataArray=[];
        console.log("result"+m1.length);
        for(let i=0;i<m1.length;i++){
    
            let q1=m1[i];
            let q2=q1['course'].value;
            // <tr>
            //     <td>{q1['sclname'].value}</td>
            //     {console.log(q1['course'].value)}
            //     <td>{q1['course'].value}</td>
            //     <td>{q1['percent'].value}</td>
            //     <td>{q1['sdate'].value}</td>
            //     <td>{q1['edate'].value}</td>
            // </tr>
            data=this.makeup(q1);
            dataArray.push(data);
        
      
        
      // console.log("cousre"+q2);
        }
    console.log("data"+data.typeof);
        
        
        return(
            <div><br/><br/>
               <table>
                   <thead>
                      
                       <td>Sclname</td>
                       <td>course</td>
                       <td>percent</td>
                       <td>Starting Date</td>
                       <td>Ending Date</td>
                       <td>Edit</td>
                       <td>delete</td>
                       
                       </thead><br/>
                   <tbody>
                   {dataArray}
                   </tbody>
               </table>
            </div>
        );
    }
}
export default UserEducation;