import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
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
import React from "react";
import "./styles/Dashboard.css";
import auth from "./auth";
import Chat from "./Chat";
//import apis from "../api/apis";
import { Card } from "antd";

const { Header, Content, Footer, Sider } = Layout;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    /*const load = async (values) => {
      console.log("Success:", values);
      const payload = values;
      await apis.LoginID(payload)
      .then((res) => {
        auth.login(()=>{
          console.log(res.data.results)
          this.props.user = res.data.results
        });
      })
      .catch((error) => {
        console.log(error);
        window.alert("Login unsuccessfull");
      })

      
    };*/
  }

  render() {
    const itemOnSelct = (v) => {
      console.log(v.key)
    }
    console.log("Dashboadr props");
    console.log(this.props);
    return (
      <div>
        <Layout hasSider>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0,
              paddingTop: 65,
              bottom: 0,
            }}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} onSelect={itemOnSelct} className="font">
              <Menu.Item key="1" icon={<BarChartOutlined />}>
                Dashboard
              </Menu.Item>
              <Menu.Item key="2" icon={<UserOutlined />}>
                <Link to="profile">Profile</Link>
              </Menu.Item>

              <Menu.Item key="3" icon={<InfoCircleOutlined />}>
                
                <Link to="/donateinstructions">Instructions</Link>

              </Menu.Item>
              <Menu.Item key="4" icon={<TeamOutlined />}>
                
                <Link to="/donorslist">Donors List</Link>

              </Menu.Item>
              {this.props.isDonor=="guest"?null:
              <Menu.Item key="5" icon={<PullRequestOutlined />}>
                  <Link to="/requests">Requests</Link>
              </Menu.Item>
              }
              <Menu.Item key="6" icon={<AppstoreOutlined />}>
                  <Link to="/ranks">Ranks</Link>
                
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
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Header
              className="site-layout-background"
              style={{
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
            {/*this.props.isDonor ? "Donor" : "Blood Bank"*/}
            <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
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
            <Footer style={{ textAlign: "center" }}></Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}
export default Dashboard;
