import React, { Component } from 'react'
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

import { Card } from "antd";


import BackBtn from './BackBtn';
const { Header, Content, Footer, Sider } = Layout; 

export default class Chat extends Component {
  render() {
    console.log("this.props Chatjs")
    console.log(this.props)
    const {setOpenedForChat} = this.props;
    return (
      <div style={{backgroundColor:"rgb(204, 214, 235)"}}>
        <BackBtn />
        <div style={{textAlign:"center"}} className='font'><b>Chat with People and Blood Banks
        </b></div><Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, textAlign: "center", height: "100%" }}
              >
                <section class="container">
<div id="col-1">


  {this.props.allBanks.length === 0 || this.props.allBanks == undefined
                  ? "Could Not load Banks to display try logout login"
                  : ""}
                <Card bordered={true} 
                headStyle={{backgroundColor: 'rgb(185, 201, 233)',border:0}}
                bodyStyle={{backgroundColor: 'rgb(149, 162, 189)', border: 0 }}
                title="Select Bank to Chat">

                {this.props.allBanks.map((val, i) => {
                  if(this.props.email_id!=val.email_id){

                    return (
                      <div>
                        <Link to="msgs">
                          <Card
                            style={{ marginBottom: "15px", background:"#f0f2f5", marginBottom:"30px" }}
                            onClick={() => {
                              console.log(val.fullName + "clicked");
                              //this.props.setOpenedforChat(val);
                              setOpenedForChat(val)
                            }}
                          >
                            <div>Full Name : {val.fullName}</div>
                            <div>Co ordinates : {val.coords}</div>
                            <div>Email Id : {val.email_id}</div>
                          </Card>
                        </Link>
                      </div>
                    );
                  }
                })}
                </Card>



</div>
<div id="col-2">



  {this.props.allUsers.length === 0
                  ? "No Users to display try logout login"
                  : ""}
                <Card title="Select Donor to Chat"
                headStyle={{backgroundColor: 'rgb(185, 201, 233)',border:0}}
                bodyStyle={{backgroundColor: 'rgb(149, 162, 189)', border: 0 }}
                >

                {this.props.allUsers.map((val, i) => {
                  if(this.props.email_id!=val.email_id){
                    return (
                      <div>
                        <Link to="msgs">
                          <Card
                            style={{ marginBottom: "15px", background:"#f0f2f5", marginBottom:"30px" }}
                            onClick={() => {
                              console.log(val.fullName + " clicked");
                              console.log(val + " clicked");
                              setOpenedForChat(val);
                            }}
                          >
                            <div>Full Name : {val.fullName}</div>
                            <div>Email Id :{val.email_id}</div>
                          </Card>
                        </Link>
                      </div>
                    );

                  }

                })}
                </Card>

</div>
</section>
                


              </div>
            </Content>
        </div>
    )
  }
}
