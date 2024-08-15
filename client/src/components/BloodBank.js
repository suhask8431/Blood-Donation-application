import React from "react";
import MapContainer from "./MapContainer";
import { Card, InputNumber } from "antd";
import { Link } from "react-router-dom";
import { Form, Input, Button, Radio } from "antd";
import apis from "../api/apis";
import BackBtn from "./BackBtn";

import { Select } from 'antd';

const { Option } = Select;

class BloodBank extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      getis:false,
      allRanks:[]
     };
  }

  render() {
        
    const handleChange = (value) => {
      console.log(`selected ${value}`);
      console.log(`selected ${typeof(value)}`);
    };
    const handleChangepart2 = (value) => {
      console.log(`selected part2 ${value}`);
      console.log(`selected part2 ${typeof(value)}`);
    };
    const loadData = async () => {
      console.log("loaddata rank in bloodbankCompo func")
      await apis
        .getRank()
        .then((res) => {
            let result = res.data.result;
            console.log(res.data.result);
            this.setState({
                allRanks:result, getis:true
            })
            console.log("get Ranks Successfully! ");

        })
        .catch((error) => {
          console.log(error);
          //window.alert("Couldnt get Requests try logout login");
        });
    };
    if(!this.state.getis){
      loadData();
  }
    const onFinish = async (values) => {
      console.log("Success:", values);
      const reqto = this.props.opened.email_id;
      const isDonor = this.props.isDonor;
      const reqfrom = this.props.email_id;
      const BloodType =values.BloodType;
      const Quantity = values.Quantity ;
      const payload = {   chat: values.Chat, reqto, reqfrom, isDonor, BloodType, Quantity };
      console.log(payload);
      console.log(values.Chat);

      await apis
        .putDonate(payload)
        .then((res) => {
          console.log(res.data.result);
          window.alert("Thanks! You Registered Successfully! You can move back to Dashboard! ");
        })
        .catch((error) => {
          console.log(error);
          window.alert("Donate form Submit unsuccessfull");
        });

        document.getElementById("basicform").reset(); 

    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    console.log(this.props);
    if (this.props.opened.isDonor) {
      return (
        <div
          style={{ background: "#f0f2f5", padding: "2%", textAlign: "center" }}
          className='font'
        >
          <BackBtn />
          <Card
            style={{ width: 400, marginTop: "6%", marginLeft: "33%" }}
            title={"Welcome to " + this.props.opened.fullName + " User Profile"}
          >
            <p>Email Id : {this.props.opened.email_id} </p>
            <p>Full Name : {this.props.opened.fullName} </p>
            <p>Blood type : {this.props.opened.bloodType} </p>
            <p>Bio : {this.props.opened.bio}</p>
            {this.state.allRanks.map((v)=>{
              if(v.email_id===this.props.opened.email_id)
                return <p>Number of times donated through the app : {v.no} </p>
            })}
          </Card>

          {(!this.props.isDonor) ? 
          <Card
            title={"Request this Donor to donate in your bank"}
            bordered={true}
            style={{ width: 400, marginTop: "6%", marginLeft: "33%" }}
          >
            <Form
              name="basic"
              id="basicform"
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
                label="Chat"
                name="Chat"
                rules={[
                  {
                    required: true,
                    message: "Please send a chat!",
                  },
                ]}
              >
                <Input placeholder="Send a chat to the Donor" />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Request to Donate
                  {
                    //<Link to="/dashboard"></Link>
                  }
                </Button>
              </Form.Item>
            </Form>
            
          </Card>
          :""}




        
        </div>
      );
    } else {
      return (
        <div
          className='font'
          style={{ background: "#f0f2f5", padding: "2%", textAlign: "center" }}
        >
          <BackBtn />
          <Card
            style={{ width: 400, marginTop: "6%", marginLeft: "33%" }}
            title={"Welcome to " + this.props.opened.fullName + " Blood Bank"}
          >
            <p>Email Id : {this.props.opened.email_id} </p>
            <p>BloodBank Locatin Co-ords : {this.props.opened.coords} </p>
            <p>Full Name : {this.props.opened.fullName} </p>
            {/*<p>BloodBank Description</p>*/}
            {this.state.allRanks.map((v)=>{
              if(v.email_id===this.props.opened.email_id)
                return <p>Number of times donated through the app : {v.no} </p>
            })}
            
          </Card>
          {this.props.isDonor ? 
          this.props.isDonor == "guest" ?
          // if donor is guest
          <Card
            title={"Request in this bank"}
            bordered={true}
            style={{ width: 400, marginTop: "6%", marginLeft: "33%" }}
          >
            <Form
              name="basic"
              id="basicform"
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
              {/*  <Form.Item
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
*/}
              
              <Form.Item
                label="BloodType"
                name="BloodType"
                rules={[
                  {
                    required: true,
                    message: "Please select a BloodType!",
                  },
                ]}
              >
                <Select
      defaultValue="Please select"
      style={{
        width: 120,
      }}
      onChange={handleChangepart2}
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
                label="Quantity"
                name="Quantity"
                rules={[
                  {
                    required: true,
                    message: "Please Type a Quantity!",
                  },
                ]}
              >
                <InputNumber placeholder="Quantity in Number " />
              </Form.Item>
              <Form.Item
                label="Chat"
                name="Chat"
                rules={[
                  {
                    required: true,
                    message: "Please send a chat!",
                  },
                ]}
              >
                <Input placeholder="Send a chat to the bank" />
              </Form.Item>


              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Request for Donation
                  {
                    //<Link to="/dashboard"></Link>
                  }
                </Button>
              </Form.Item>
            </Form>
            
          </Card>

          
          :
          // if donor is donor
          <Card
            title={"Donate in this bank"}
            bordered={true}
            style={{ width: 400, marginTop: "6%", marginLeft: "33%" }}
          >
            <Form
              name="basic"
              id="basicform"
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
              {/*  <Form.Item
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
*/}
              <Form.Item
                label="Chat"
                name="Chat"
                rules={[
                  {
                    required: true,
                    message: "Please send a chat!",
                  },
                ]}
              >
                <Input placeholder="Send a chat to the bank" />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Donate
                  {
                    //<Link to="/dashboard"></Link>
                  }
                </Button>
              </Form.Item>
            </Form>
            <div>
            Please Reach at the Blood Bank with help of below maps and Donate!
          </div>
          </Card>

: 

<Card
title={"Request Blood in this bank"}
bordered={true}
style={{ width: 400, marginTop: "6%", marginLeft: "33%" }}
>
<Form
  name="basic"
  id="basicform"
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
                label="BloodType"
                name="BloodType"
                rules={[
                  {
                    required: true,
                    message: "Please select a BloodType!",
                  },
                ]}
              >
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
              <Form.Item
                label="Quantity"
                name="Quantity"
                rules={[
                  {
                    required: true,
                    message: "Please Type a Quantity!",
                  },
                ]}
              >
                <InputNumber placeholder="Quantity in Number " />
              </Form.Item>

  <Form.Item
    label="Chat"
    name="Chat"
    rules={[
      {
        required: true,
        message: "Please send a chat!",
      },
    ]}
  >
    <Input placeholder="Send a chat to the bank" />

  </Form.Item>




  <Form.Item
    wrapperCol={{
      offset: 8,
      span: 16,
    }}
  >
    <Button type="primary" htmlType="submit">
      Request
      
    </Button>
  </Form.Item>
</Form>
</Card>

}



          <br />
          
          <MapContainer
            coords={this.props.opened.coords}
            styles={{
              margin: "30%",
              marginTop: "5%",
              height: "400px",
              width: "400px",
            }}
          />
        </div>
      );
    }
  }
}

BloodBank.propTypes = {};

export default BloodBank;
