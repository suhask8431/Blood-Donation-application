import React from 'react';
import {Link} from "react-router-dom"
import { Card } from 'antd';
import BackBtn from './BackBtn';


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log("profile props")
        console.log(this.props)
        if (this.props.isDonor == "guest"){
        console.log("guest props")

            return (
                <div style={{background:"#f0f2f5",padding:"2%",textAlign: "center"}} 
          className='font'
          >
                {//<BackBtn />
                }

                <Card title={<b>Profile</b>}  style={{ marginLeft:"10%",marginRight:"10%",marginBottom:"1%" }}>
                    <p>Email : {this.props.email_id}</p>
                    <p>Full Name : {this.props.fullName}</p>
                    
                    <p><b><i><p>You have registered as a Guest</p></i></b></p>
                </Card>
            </div>
            );
        }else
        if (this.props.isDonor){

            return (
                <div style={{background:"#f0f2f5",padding:"2%",textAlign: "center"}} 
          className='font'
          >
                {//<BackBtn />
        }
                <Card title={<b>Profile</b>}  style={{  marginLeft:"10%",marginRight:"10%",marginBottom:"1%"}}>
                    <p>Email : {this.props.email_id}</p>
                    <p>Full Name : {this.props.fullName}</p>
                    <p>Blood Type : {this.props.bloodType}</p>
                    <p> Bio : {this.props.bio}</p>
                    <p>You are a Donor</p>
                    <p><b><i>Keep Up the good work!</i></b></p>
                </Card>
            </div>
        );
        }else{
            return (
                <div style={{background:"#f0f2f5",padding:"2%",textAlign: "center"}} 
          className='font'
          >
                       {//<BackBtn />
                       }
                <Card title={<b>Profile</b>}  style={{ marginLeft:"10%",marginRight:"10%",marginBottom:"1%" }}>
                    <p>Email : {this.props.email_id}</p>
                    <p>Full Name : {this.props.fullName}</p>
                    <p>Co ordinates : {this.props.coords}</p>
                    <p> You have registered as a Blood Bank Admin</p>
                </Card>
            </div>
        );
        }
    }
}

Profile.propTypes = {};

export default Profile;
