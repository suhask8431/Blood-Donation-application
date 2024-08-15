import React from "react";
import { Form, Input, Button } from "antd";
import { Card, Radio } from "antd";

import { Link } from "react-router-dom";
import apis from "../api/apis"
import { withRouter } from "./WithRouter";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import {  Dropdown, Menu, message,  Select } from 'antd';
import "antd/dist/antd.min.css";
const { Option } = Select;

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      user: false,
      username: "",
      userMail: "",
      isTeacher: false,
      bank: false,
      guest: false,
      isDonorSelected: false
    };
  }
  
  render() {
    //const { user, username, userMail, isTeacher } = this.state;
    
const handleChange = (value) => {
  console.log(`selected ${value}`);
  console.log(`selected ${typeof(value)}`);
};
    const onFinish = async (values) => {
      const payload = values;

      console.log("GUest donor funcction in")
      if (values.isDonor == "guest") {
        console.log(values)
        console.log(values.isDonor)
        await apis.guestSignUp(payload)
          .then((res) => {
            console.log(res)
            this.props.navigate('/login', this.state)
          })
          .catch((error) => {
            console.log(error);
            window.alert("Guest Sign unsuccessfull");
          })

        return;
      }
      console.log("Success:", values);

      await apis.SignUp(payload)
        .then((res) => {
          console.log(res)
          this.props.navigate('/login', this.state)
        })
        .catch((error) => {
          console.log(error);
          window.alert("Sign unsuccessfull");
        })


    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return (
      <div style={{ background: "grey", height: "100vh" }}>
        <div className="site-card-border-less-wrapper font">
          <div className="logo" style={{ color: "white", backgroundColor: "black", fontSize: "50px", padding: "1%", textAlign: "center" }}><span style={{ textAlign: "center" }}>&#9736;BDA</span> </div>

          <Card
            title={<pre>            Sign Up</pre>}
            bordered={true}
            style={{ width: 450, marginTop: "3%", marginLeft: "33%", backgroundColor: "rgb(189, 185, 185)" }}
          >
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Email ID"
                name="email_id"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input placeholder="YourName@domain.com" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password placeholder="****" />
              </Form.Item>

              {/*<Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>*/}
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Please input your Full Name!",
                  },
                ]}
              >
                <Input placeholder="First Last" />
              </Form.Item>

              <Form.Item
                label="Are you a"
                name="isDonor"
                rules={[
                  {
                    required: true,
                    message: "Please opt this!",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio.Button value={true} onClick={(e) => { this.setState({ bank: false, isDonorSelected: true }) }}>Donor</Radio.Button>
                  <Radio.Button value={false} onClick={(e) => { this.setState({ bank: true, isDonorSelected: false }) }}>Bank</Radio.Button>
                  <Radio.Button value="guest" onClick={(e) => { this.setState({ bank: false, guest: true, isDonorSelected: false }, () => {/*console.log(this.state)*/ }) }}>Guest</Radio.Button>
                </Radio.Group>
              </Form.Item>
              {
                (this.state.bank) ?
                  <Form.Item
                    label="Bank Co-ordinates"
                    name="coords"
                    rules={[
                      {
                        required: true,
                        message: "Please input Co-ords !",
                      },
                    ]}
                  >
                    <Input placeholder="17.6,15.5" />
                  </Form.Item>
                  : null
              }
              {
                (this.state.isDonorSelected) ?
                  <Form.Item
                    label="Blood Type "
                    name="bloodType"
                    rules={[
                      {
                        required: true,
                        message: "Please input blood type",
                      },
                    ]}
                  >
                    {/*<Input placeholder="Rh System type" />*/}
                    <Select
      defaultValue="Please select"
      style={{
        width: 120,
      }}
      onChange={handleChange}
    >
      <Option value="A+">A+</Option>
      <Option value="B+">B+</Option>
      <Option value="AB+">AB+</Option>
      <Option value="O+">O+</Option>
      <Option value="A-">A-</Option>
      <Option value="B-">B-</Option>
      <Option value="AB-">AB-</Option>
      <Option value="O-">O-</Option>
    </Select>
                    

                  </Form.Item>
                  : null
              }
              {
                (this.state.isDonorSelected) ?
                  <Form.Item
                    label="Bio "
                    name="bio"
                    rules={[
                      {
                        required: true,
                        message: "Please input Bio/Medical History",
                      },
                    ]}
                  >
                    <Input placeholder="MedicalHistory,Anything tobe noted" />
                  </Form.Item>
                  : null
              }
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Sign
                </Button>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 5,
                  span: 16,
                }}
              >
                Already have an account?<Link to="/login"> Log In</Link>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}


export default withRouter(SignUp);
