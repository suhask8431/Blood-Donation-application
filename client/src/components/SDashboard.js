import React from "react";
import "./styles/SDashboard.css";
import auth from "./auth";
import Profile from "./Profile";
import Instructions from "./Instructions";
import Requests from "./Requests";
import DList from "./DList";
import Rank from "./Rank";
import { Link } from "react-router-dom";
import { Layout, Menu, Card } from 'antd';

import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  WechatOutlined,
  LoginOutlined,
  InfoCircleOutlined,
  PullRequestOutlined  
} from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      collapsed:false,
      user: {},
      siderMenuNo:"1",

    }

  }
  render(){
    const itemOnSelct = (v) => {
      console.log(v.key)
      this.setState({siderMenuNo:v.key},(()=>{console.log(this.state)}))
    }
    console.log("Dashboadr props");
    console.log(this.props);


    return (
      <Layout
        style={{
          minHeight: '100vh',
          
        }}
        //hasSider
      >
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={(value) => this.setState({collapsed:value})}>
          <div className="logo" style={{color:"white",fontSize:"20px",margin:"10%"}}><span>&#9736;BDA</span> </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onSelect={itemOnSelct} style={{marginTop:"10px"}} className="font">


          <Menu.Item key="1" icon={<BarChartOutlined />}>
                Dashboard
              </Menu.Item>
              <Menu.Item key="2" icon={<UserOutlined />}>
                Profile
              </Menu.Item>

              <Menu.Item key="3" icon={<InfoCircleOutlined />}>
                
                Instructions

              </Menu.Item>
              <Menu.Item key="4" icon={<TeamOutlined />}>
                
                Donors List

              </Menu.Item>
              {this.props.isDonor=="guest"?null:
              <Menu.Item key="5" icon={<PullRequestOutlined />}>
                  Requests
              </Menu.Item>
              }
              <Menu.Item key="6" icon={<AppstoreOutlined />}>
                  Ranks
              </Menu.Item>
              

              <Menu.Item key="7" icon={<WechatOutlined />}>
                <Link to="chat">Chat</Link>
              </Menu.Item>
              <Menu.Item
                key="8"
                icon={<LoginOutlined />}
                onClick={() => {
                  auth.logout(() => {
                    console.log("Sidebar logout");
                  });
                }}
              >
                <Link to="/login">Logout</Link>
              </Menu.Item>


          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              margin: "24px 16px 0",
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            <b className="font">
                  Welcome {this.props.fullName} ! You have logged in as{" "}
                  {this.props.isDonor ? this.props.isDonor=="guest"? "Guest" :  "Donor" : "Blood Bank"}
                </b>
          </Header>
          {(this.state.siderMenuNo==="1")? 
          <Content
            style={{
              margin: '24px 16px 0',
              //overflow: "initial" 
            }}
          >



<div
                className="site-layout-background"
                style={{ padding: 24, textAlign: "center", height: "100%" }}
              >
                <section class="container">
<div id="col-1">


  {this.props.allBanks.length === 0 || this.props.allBanks == undefined
                  ? "Could Not load Banks to display! logout & login"
                  : ""}
                <Card bordered={true} title="List of All Banks">

                {this.props.allBanks.map((val, i) => {
                  if(this.props.email_id!=val.email_id){

                    return (
                      <div>
                        <Link to="BloodBank">
                          <Card
                            style={{ marginBottom: "15px", background:"#f0f2f5", marginBottom:"30px" }}
                            onClick={() => {
                              console.log(val.fullName + "clicked");
                              this.props.setOpened(val);
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
                  ? "Could Not load Donros to display! logout & login"
                  : ""}
                <Card title="List of All Donors">

                {this.props.allUsers.map((val, i) => {
                  if(this.props.email_id!=val.email_id){
                    return (
                      <div>
                        <Link to="BloodBank">
                          <Card
                            style={{ marginBottom: "15px", background:"#f0f2f5", marginBottom:"30px" }}
                            onClick={() => {
                              console.log(val.fullName + "clicked");
                              this.props.setOpened(val);
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

: (this.state.siderMenuNo==="2")? 

<Profile bloodType={this.props.bloodType} bio={this.props.bio} coords={this.props.coords} email_id={this.props.email_id} fullName={this.props.fullName} isDonor={this.props.isDonor}/>

: (this.state.siderMenuNo==="3")? 
<Instructions allUsers={this.props.allUsers} email_id={this.props.email_id} fullName={this.props.fullName} isDonor={this.props.isDonor} allBanks={this.props.allBanks} />
: (this.state.siderMenuNo==="4")? 
<DList allUsers={this.props.allUsers} email_id={this.props.email_id} fullName={this.props.fullName} isDonor={this.props.isDonor} allBanks={this.props.allBanks} />

: (this.state.siderMenuNo==="5")? 
<Requests allUsers={this.props.allUsers} email_id={this.props.email_id} fullName={this.props.fullName} isDonor={this.props.isDonor} allBanks={this.props.allBanks} />
: (this.state.siderMenuNo==="6")? 

<Rank allUsers={this.props.allUsers} email_id={this.props.email_id} fullName={this.props.fullName} isDonor={this.props.isDonor} allBanks={this.props.allBanks} />
: null}
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Blood Donation App ©2022 Created by Group
          </Footer>
        </Layout>
      </Layout>
    );
  }
}


export default App;