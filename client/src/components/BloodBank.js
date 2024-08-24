import React from "react";
import MapContainer from "./MapContainer";
import { Card, InputNumber, message, Form, Input, Button, Select } from "antd"; // Import message from Ant Design
import { Link } from "react-router-dom";
import apis from "../api/apis";
import BackBtn from "./BackBtn";

const { Option } = Select;

class BloodBank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getis: false,
      allRanks: []
    };
  }

  // Load data from API
  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    console.log("Loading data in BloodBank component");
    try {
      const res = await apis.getRank();
      let result = res.data.result;
      this.setState({
        allRanks: result,
        getis: true
      });
      console.log("Ranks loaded successfully!");
    } catch (error) {
      console.log(error);
      message.error("Couldn't get requests. Please try logging out and logging back in.");
    }
  };

  handleChange = (value) => {
    console.log(`selected ${value}`);
    console.log(`selected ${typeof value}`);
  };

  handleChangepart2 = (value) => {
    console.log(`selected part2 ${value}`);
    console.log(`selected part2 ${typeof value}`);
  };

  onFinish = async (values) => {
    console.log("Success:", values);
    const reqto = this.props.opened.email_id;
    const isDonor = this.props.isDonor;
    const reqfrom = this.props.email_id;
    const BloodType = values.BloodType;
    const Quantity = values.Quantity;
    const payload = { chat: values.Chat, reqto, reqfrom, isDonor, BloodType, Quantity };
    
    console.log(payload);
    console.log(values.Chat);

    try {
      await apis.putDonate(payload);
      message.success("Thanks! Your request has been sent successfully! You can move back to the Dashboard!"); // Display success message
    } catch (error) {
      console.log(error);
      message.error("Donate form submission unsuccessful.");
    }

    document.getElementById("basicform").reset();
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    console.log(this.props);
    const { allRanks, getis } = this.state;
    const { opened, isDonor } = this.props;

    return (
      <div style={{ background: "#f0f2f5", padding: "2%", textAlign: "center" }} className='font'>
        <BackBtn />
        {opened.isDonor ? (
          <div>
            <Card
              style={{ width: 400, marginTop: "6%", marginLeft: "33%" }}
              title={`Welcome to ${opened.fullName} User Profile`}
            >
              <p>Email Id: {opened.email_id}</p>
              <p>Full Name: {opened.fullName}</p>
              <p>Blood type: {opened.bloodType}</p>
              <p>Bio: {opened.bio}</p>
              {allRanks.map((v) => {
                if (v.email_id === opened.email_id)
                  return <p key={v.email_id}>Number of times donated through the app: {v.no}</p>;
                return null;
              })}
            </Card>

            {!isDonor && (
              <Card
                title={"Request this Donor to donate in your bank"}
                bordered={true}
                style={{ width: 400, marginTop: "6%", marginLeft: "33%" }}
              >
                <Form
                  name="basic"
                  id="basicform"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Chat"
                    name="Chat"
                    rules={[{ required: true, message: "Please send a chat!" }]}
                  >
                    <Input placeholder="Send a chat to the Donor" />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                      Request to Donate
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            )}
          </div>
        ) : (
          <div>
            <Card
              style={{ width: 400, marginTop: "6%", marginLeft: "33%" }}
              title={`Welcome to ${opened.fullName} Blood Bank`}
            >
              <p>Email Id: {opened.email_id}</p>
              <p>Blood Bank Location Co-ords: {opened.coords}</p>
              <p>Full Name: {opened.fullName}</p>
              {allRanks.map((v) => {
                if (v.email_id === opened.email_id)
                  return <p key={v.email_id}>Number of times donated through the app: {v.no}</p>;
                return null;
              })}
            </Card>

            {isDonor ? (
              isDonor === "guest" ? (
                <Card
                  title={"Request in this bank"}
                  bordered={true}
                  style={{ width: 400, marginTop: "6%", marginLeft: "33%" }}
                >
                  <Form
                    name="basic"
                    id="basicform"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="BloodType"
                      name="BloodType"
                      rules={[{ required: true, message: "Please select a BloodType!" }]}
                    >
                      <Select
                        defaultValue="Please select"
                        style={{ width: 120 }}
                        onChange={this.handleChangepart2}
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
                      rules={[{ required: true, message: "Please Type a Quantity!" }]}
                    >
                      <InputNumber placeholder="Quantity in Number " />
                    </Form.Item>
                    <Form.Item
                      label="Chat"
                      name="Chat"
                      rules={[{ required: true, message: "Please send a chat!" }]}
                    >
                      <Input placeholder="Send a chat to the bank" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button type="primary" htmlType="submit">
                        Request for Donation
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              ) : (
                <Card
                  title={"Donate in this bank"}
                  bordered={true}
                  style={{ width: 400, marginTop: "6%", marginLeft: "33%" }}
                >
                  <Form
                    name="basic"
                    id="basicform"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="Chat"
                      name="Chat"
                      rules={[{ required: true, message: "Please send a chat!" }]}
                    >
                      <Input placeholder="Send a chat to the bank" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button type="primary" htmlType="submit">
                        Donate
                      </Button>
                    </Form.Item>
                  </Form>
                  <div>Please Reach at the Blood Bank with the help of the below maps and Donate!</div>
                </Card>
              )
            ) : (
              <Card
                title={"Request Blood in this bank"}
                bordered={true}
                style={{ width: 400, marginTop: "6%", marginLeft: "33%" }}
              >
                <Form
                  name="basic"
                  id="basicform"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="BloodType"
                    name="BloodType"
                    rules={[{ required: true, message: "Please select a BloodType!" }]}
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
                    label="Quantity"
                    name="Quantity"
                    rules={[{ required: true, message: "Please Type a Quantity!" }]}
                  >
                    <InputNumber placeholder="Quantity in Number " />
                  </Form.Item>
                  <Form.Item
                    label="Chat"
                    name="Chat"
                    rules={[{ required: true, message: "Please send a chat!" }]}
                  >
                    <Input placeholder="Send a chat to the bank" />
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                      Request
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            )}
            <br />
            <MapContainer
              coords={opened.coords}
              styles={{
                margin: "30%",
                marginTop: "5%",
                height: "400px",
                width: "400px",
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default BloodBank;
