// client/components/SignUp.js


import React from "react";
import { Form, Input, Button, Card, Radio, message, Select } from "antd";
import { Link } from "react-router-dom";
import apis from "../api/apis";
import { withRouter } from "./WithRouter";
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

  handleChange = (value) => {
    console.log(`selected ${value}`);
    console.log(`selected ${typeof value}`);
  };

  onFinish = async (values) => {
    const payload = values;

    if (values.isDonor === "guest") {
      try {
        await apis.guestSignUp(payload);
        message.success("Sign up successful");
        this.props.navigate('/login', this.state);
      } catch (error) {
        console.error(error);
        message.error("Guest Sign up unsuccessful");
      }
      return;
    }

    try {
      await apis.SignUp(payload);
      message.success("Sign up successful");
      this.props.navigate('/login', this.state);
    } catch (error) {
      console.error(error);

      // Check if error response indicates email already exists
      if (error.response && error.response.data && error.response.data.error === "Email already in use") {
        message.error("Email already in use. Please use a different email.");
      } else {
        message.error("Sign up unsuccessful. Please try again.");
      }
    }
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    return (
      <div style={{ background: "grey", height: "100vh" }}>
        <div className="site-card-border-less-wrapper font">
          <div
            className="logo"
            style={{
              color: "white",
              backgroundColor: "black",
              fontSize: "50px",
              padding: "1%",
              textAlign: "center"
            }}
          >
            <span>&#9736;BDA</span>
          </div>

          <Card
            title={<div style={{ textAlign: "center", fontSize: "24px" }}>Sign Up</div>}
            bordered={true}
            style={{
              width: 450,
              marginTop: "3%",
              marginLeft: "auto",
              marginRight: "auto",
              backgroundColor: "rgb(189, 185, 185)"
            }}
          >
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Email ID"
                name="email_id"
                rules={[{ required: true, message: "Please input your Email!" }]}
              >
                <Input placeholder="YourName@domain.com" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password placeholder="****" />
              </Form.Item>

              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[{ required: true, message: "Please input your Full Name!" }]}
              >
                <Input placeholder="First Last" />
              </Form.Item>

              <Form.Item
                label="Are you a"
                name="isDonor"
                rules={[{ required: true, message: "Please opt this!" }]}
              >
                <Radio.Group>
                  <Radio.Button
                    value={true}
                    onClick={() => this.setState({ bank: false, isDonorSelected: true })}
                  >
                    Donor
                  </Radio.Button>
                  <Radio.Button
                    value={false}
                    onClick={() => this.setState({ bank: true, isDonorSelected: false })}
                  >
                    Bank
                  </Radio.Button>
                  <Radio.Button
                    value="guest"
                    onClick={() => this.setState({ bank: false, guest: true, isDonorSelected: false })}
                  >
                    Guest
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>

              {this.state.bank && (
                <Form.Item
                  label="Bank Co-ordinates"
                  name="coords"
                  rules={[{ required: true, message: "Please input Co-ords!" }]}
                >
                  <Input placeholder="17.6,15.5" />
                </Form.Item>
              )}

              {this.state.isDonorSelected && (
                <>
                  <Form.Item
                    label="Blood Type"
                    name="bloodType"
                    rules={[{ required: true, message: "Please input blood type" }]}
                  >
                    <Select
                      defaultValue="Please select"
                      style={{ width: 120 }}
                      onChange={this.handleChange}
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

                  <Form.Item
                    label="Bio"
                    name="bio"
                    rules={[{ required: true, message: "Please input Bio/Medical History" }]}
                  >
                    <Input placeholder="Medical History, Anything to be noted" />
                  </Form.Item>
                </>
              )}

              <Form.Item
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Button type="primary" htmlType="submit">
                  Sign Up
                </Button>
              </Form.Item>
              <Form.Item
                wrapperCol={{ offset: 5, span: 16 }}
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
