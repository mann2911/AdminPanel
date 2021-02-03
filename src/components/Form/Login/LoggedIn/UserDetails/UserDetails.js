import React,{Component} from 'react';
import './UserDetails.css';

class UserDetails extends Component{
    
    render(){
       
        const info=JSON.parse(localStorage.getItem('userInfo'));
        
        let data=info.map((user,id)=>(

            <tr>
                <td>{user.Reg1.firstname}</td>
                <td>{user.Reg1.lastname}</td>
                <td>{user.Reg1.gender}</td>
                <td>{user.Reg1.email}</td>
                <td>{user.Reg1.phone}</td>
                
            </tr>



        ))
    
        
        
        return(
        <div>
            
                    <table className='personalTable'>
                        <tr>
                            <th>First Name</th><th>Last Name</th><th>Gender</th><th>Email</th><th>Phone</th>
                        </tr>
                    {data}
                    </table>


        </div>
        );
    }
}
export default UserDetails;