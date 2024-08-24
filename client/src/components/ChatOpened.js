import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Card, message, Form, Input, Button } from 'antd'; // Import message from Ant Design
import { RollbackOutlined } from "@ant-design/icons";
import apis from "../api/apis";
import "./styles/Chat.css";

export default class ChatOpened extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMsgs: []
    };
  }

  componentDidMount() {
    this.getAllMessages();
  }

  getAllMessages = async () => {
    try {
      const res = await apis.getmsgs();
      console.log("Getmsgs");
      console.log(res.data.result);
      this.setState({ allMsgs: res.data.result });
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      message.error("Failed to load messages.");
    }
  };

  onFinish = async (values) => {
    const payload = {
      msgfrom: this.props.email_id,
      msgto: this.props.openedForChat.email_id,
      msg: values.msg
    };

    console.log("Sent Message:", payload);

    try {
      await apis.putmsgs(payload);
      message.success("Message Sent!"); // Use message.success instead of window.alert
      this.getAllMessages(); // Refresh messages after sending
    } catch (error) {
      console.error("Failed to send message:", error);
      message.error("Could not send message.");
    }

    document.getElementById("basicChat").reset(); 
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    let countmsg = 0;
    const { allMsgs } = this.state;
    const { fullName, openedForChat, email_id } = this.props;

    return (
      <div className='font' style={{ backgroundColor: "rgb(173, 196, 240)" }}>
        <div style={{ textAlign: "center", margin: "0%", backgroundColor: "#002766", width: "170px", height: "50px", textAlign: "center" }}>
          <Link to="/dashboard/chat" style={{ lineHeight: "42px", fontSize: "14px", textAlign: "center", color: "white" }}>
            <RollbackOutlined style={{ paddingRight: "5px" }} /> Back to Chats
          </Link>
        </div>

        <Card
          bodyStyle={{ backgroundColor: 'rgb(185, 201, 233)', border: 0 }}
          headStyle={{ backgroundColor: 'rgb(149, 162, 189)', border: 0 }}
          bordered
          title={`Messages between ${fullName} and ${openedForChat.fullName}`}
          style={{ margin: "2%", marginBottom: "0", textAlign: "center", width: "90%", backgroundColor: "rgb(189, 185, 185)" }}
        >
          <div style={{ textAlign: "left", overflow: "auto", height: "300px" }}>
            {allMsgs.length > 0 ? (
              allMsgs.map((v, i) => {
                if (v.msgfrom === openedForChat.email_id && v.msgto === email_id) {
                  countmsg += 1;
                  return (
                    <div key={i} className="block-border">
                      <span className="inline-border" style={{ padding: "1%", lineHeight: "50px" }}>{v.msg}</span>
                    </div>
                  );
                }
                if (v.msgfrom === email_id && v.msgto === openedForChat.email_id) {
                  countmsg += 1;
                  return (
                    <div key={i} className="block-border" style={{ textAlign: "right" }}>
                      <span className="inline-border" style={{ padding: "1%", margin: "2%", lineHeight: "50px" }}>{v.msg}</span>
                    </div>
                  );
                }
                return null;
              })
            ) : "Loading messages..."}
          </div>
          {countmsg === 0 ? "(No messages yet)" : null}
          {console.log(countmsg)}
        </Card>

        <Card
          bordered
          style={{ textAlign: "left", margin: "2%", marginTop: "0", height: "100%", width: "90%" }}
          bodyStyle={{ backgroundColor: 'rgb(185, 201, 233)', border: 0 }}
          headStyle={{ backgroundColor: 'rgb(149, 162, 189)', border: 0 }}
        >
          <Form
            name="basicChat"
            id="basicChat"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            autoComplete="off"
            style={{ textAlign: "left" }}
          >
            <Form.Item
              name="msg"
              rules={[{ required: true, message: "Please Type to send a chat!" }]}
            >
              <Input placeholder="Type here to send a message..." />
            </Form.Item>

            <Form.Item style={{ textAlign: "left" }}>
              <Button type="primary" htmlType="submit">
                Send
              </Button>
            </Form.Item>

            <Form.Item style={{ textAlign: "left" }}>
              <Button type="secondary" htmlType="reset">
                Clear
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}
