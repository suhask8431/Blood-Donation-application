import React, { Component } from 'react'
import  BackBtn  from "./BackBtn";
import {
    RollbackOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Card } from 'antd';
import { getmsgs } from '../api/apis';
import apis from "../api/apis"
import { Form, Input, Button, Radio } from "antd";
import "./styles/Chat.css"

export default class ChatOpened extends Component {

    constructor(props){
        super(props);
        this.state={
            allMsgs:[]
        }
    }

    componentDidMount(){
        const getallmsgs = async () => {
            await apis.getmsgs()
            .then((res) => {
                console.log("Getmsgs")
                console.log(res.data.result)
                this.setState({allMsgs:res.data.result})
        })
        }
        getallmsgs()
    }
  render() {
    const getallmsgsaftermsgsent = async () => {
        await apis.getmsgs()
        .then((res) => {
            console.log("Getmsgs")
            console.log(res.data.result)
            this.setState({allMsgs:res.data.result})
    })
    }
    const onFinish = async (values) => {
        var payload = {
            msgfrom: this.props.email_id,
            msgto: this.props.openedForChat.email_id,
            msg:values.msg
        }
        console.log("Sent Message:", payload);

        await apis
        .putmsgs(payload)
        .then((res) => {
          console.log(res.data.result);
          window.alert("Message Sent!");
          getallmsgsaftermsgsent()
        })
        .catch((error) => {
          console.log(error);
          window.alert("Couldnt send message!");
        });
        document.getElementById("basicChat").reset(); 
      };
      const onReset = () => {
        Form.resetFields();
      };
      const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
      };
    console.log("this.props Chat Opened")
    console.log(this.props)
    var countmsg=0;
    return (
        <div className='font' style={{backgroundColor:"rgb(173, 196, 240)"}}>
            <div style={{textAlign:"center",margin:"0%", backgroundColor: "#002766", width: "170px", height: "50px", textAlign: "center" }} ><Link to="/dashboard/chat" style={{ lineHeight: "42px", fontSize: "14px", textAlign: "center", color: "white" }} > <RollbackOutlined style={{paddingRight:"5px"}} />   Back to Chats</Link></div>

            
            <Card 
            bodyStyle={{backgroundColor: 'rgb(185, 201, 233)',border:0}}
            headStyle={{backgroundColor: 'rgb(149, 162, 189)', border: 0 }}
            bordered title={"Messages between "+this.props.email_id+" and "+ this.props.openedForChat.email_id} style={{margin:"2%",marginBottom:"0", textAlign:"center",width:"90%", backgroundColor:"rgb(189, 185, 185)", }} >
              
                <div style={{textAlign:"left",overflow:"auto",height:"300px"}}>
                    {this.state.allMsgs.length>0?
                    this.state.allMsgs.map((v,i)=>{
                        if(v.msgfrom===this.props.openedForChat.email_id && v.msgto===this.props.email_id){
                            countmsg+=1
                            return <div class="block-border">{/* <b>{v.msgfrom}</b> {" : "}*/}<span class="inline-border" style={{padding:"1%",lineHeight:"50px"}} >{v.msg} </span></div>

                        }
                        if(v.msgfrom===this.props.email_id && v.msgto===this.props.openedForChat.email_id){
                            countmsg+=1
                            return <div class="block-border" style={{textAlign:"right"}}> {/*<b>{v.msgfrom}</b> {" : "}*/} <span class="inline-border" style={{padding:"1%",margin:"2%",lineHeight:"50px"}} >{v.msg} </span> </div>

                        }
                    }):"Loading messages..."}
                </div>
                {countmsg===0?"(Nomsgs yet)":null}
                {console.log(countmsg)}
            </Card>
            
            <Card
            bordered={true}
            style={{ textAlign:"left",margin:"2%",marginTop:"0",height:"100%",width:"90%" }}
            bodyStyle={{backgroundColor: 'rgb(185, 201, 233)',border:0}}
            headStyle={{backgroundColor: 'rgb(149, 162, 189)', border: 0 }}
          >
            <Form
              name="basicChat"
              id="basicChat"
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
              style={{textAlign:"left"}}
            >
                
                    
              <Form.Item
                name="msg"
                style={{}}
                rules={[
                  {
                    required: true,
                    message: "Please Type to send a chat!",
                  },
                ]}
              >
                <Input placeholder="Type here to send a message..." />
              </Form.Item>
             
              <Form.Item
                
                style={{textAlign:"left"}}
              >
                <Button type="primary" htmlType="submit">
                  Send
                </Button>
                
              </Form.Item>
              <Form.Item
                
                style={{textAlign:"left"}}
              >
                <Button type="secondary" htmlType="reset">
                  Reset
                </Button>
              </Form.Item>
            </Form>
            
          </Card>
          


        </div>
    )
  }
}
