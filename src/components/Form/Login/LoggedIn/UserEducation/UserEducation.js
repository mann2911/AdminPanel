import React,{Component,Link,Redirect} from 'react';
import './UserEducation.css';

class UserEducation extends Component{
    
    edit=(id,ch)=>{ 
      
        let sclname=ch['sclname'];
        let course=ch['course'];
        let percent=ch['percent'];
        let sdate=ch['sdate'];
        let edate=ch['edate'];
     
        let editData={'sclname':sclname,'course':course,'percent':percent,'sdate':sdate,'edate':edate,'id':id};
        localStorage.setItem('editDatas',JSON.stringify(editData));

        this.props.history.push('/edit'); 
    }
    
    delete=(id)=>{
        
            let userId=localStorage.getItem('activeUserNumber');
            let confirm=window.confirm('Delete this eduction record?');
            if(confirm)
            {
            let values = JSON.parse(localStorage.getItem('userInfo'));
            let user=values[userId];
    
            user.Reg2.splice(id,1);
            values[userId]=user;
            localStorage.setItem('userInfo', JSON.stringify(values))
            this.props.history.push('/loggedin/usereducation');
             }
    }
    

    render(){
        const info=JSON.parse(localStorage.getItem('userInfo'));
        let activeUserNumber=localStorage.getItem('activeUserNumber');
        let allData=info[activeUserNumber];
        let Reg2=allData['Reg2'];
       
        let dataArray=Reg2.map((ch,index)=>{
             return(
                <tr>
                         <td>{ch['sclname']}</td>
                        
                         <td>{ch['course']}</td>
                         <td>{ch['percent']}</td>
                         <td>{ch['sdate']}</td>
                         <td>{ch['edate']}</td>
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