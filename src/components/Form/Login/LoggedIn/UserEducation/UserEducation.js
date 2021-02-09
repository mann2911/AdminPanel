import React,{Component,Link,Redirect} from 'react';
import './UserEducation.css';

class UserEducation extends Component{
    
    edit=(id,ch)=>{ 
        alert('edit called'+id);
        let sclname=ch['sclname'].value;
        let course=ch['course'].value;
        let percent=ch['percent'].value
        let sdate=ch['sdate'].value
        let edate=ch['edate'].value
        console.log(" edit schname"+sclname);
        let editData={'sclname':sclname,'course':course,'percent':percent,'sdate':sdate,'edate':edate,'id':id};
        localStorage.setItem('editDatas',JSON.stringify(editData));

        this.props.history.push('/edit'); 
    }
    
    delete=(id)=>{
        alert('delete called'+id);
    }
    

    render(){
        const info=JSON.parse(localStorage.getItem('userInfo'));
        let x=localStorage.getItem('activeUserNumber');
        let m=info[x];
        let m1=m['Reg2'];
       
        console.log("result"+m1.length);
        let mm=m1[0];
        console.log("data"+mm['sclname'].value);
         let dataArray=m1.map((ch,index)=>{
             return(
                <tr>
                         <td>{ch['sclname'].value}</td>
                      
                         <td>{ch['course'].value}</td>
                         <td>{ch['percent'].value}</td>
                         <td>{ch['sdate'].value}</td>
                         <td>{ch['edate'].value}</td>
                         <td><button onClick={()=>this.edit(index,ch)}>Edit</button></td>
                         <td><button onClick={()=>this.delete(index)}>Delete</button></td>
                     </tr>
             );

         })


        
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