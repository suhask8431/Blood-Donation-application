import React from "react";
import { Link } from "react-router-dom";
import apis from "../api/apis";
import {Button, Card} from "antd";

class Requests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allReqs: [],
      allRanks: [],
      
      getis:false,
    };
  }

  componenetDidMount() {}

  render() {
    const loadData = async () => {
      await apis
        .getDonate()
        .then((res) => {
            let result = res.data.result;
            console.log(res.data.result);
            this.setState({
                allReqs:result, getis:true
            })
            console.log("get Requests Successfully! ");

        })
        .catch((error) => {
          console.log(error);
          //window.alert("Couldnt get Requests try logout login");
        });
        await apis
        .getRank()
        .then((res) => {
            let result = res.data.result;
            console.log(res.data.result);
            this.setState({
                allRanks:result, getis:true
            },()=>{

                let arr = this.state.allRanks
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
    let arr = this.state.allRanks
    console.log(arr);

    const onApprove = async (param) => {
      let person  
      console.log("ApproveOnMethod,a")
      console.log(param)

      if(param.isDonor && param.isDonor!= undefined){
        person = param.reqfrom
        console.log("if condition"+ person)

        }else{
          person = param.reqto
          console.log("else condition"+person)

        }
        var push;
        //console.log(person+"prtson")

        arr.map((v,i)=>{
          console.log(v.email_id)
            if((v.email_id) == person){
          console.log(person)
              
                push={email_id:v.email_id,no:v.no}
                console.log({email_id:v.email_id,no:v.no})
            }
        })
        console.log("param")
        console.log(push)
        console.log(typeof(push.no))
        push.no += 1
        console.log(push)
        const payload = push;
        //payload
        await apis.updateRanks(payload)
        .then((res) => {
          console.log(res.data)
        })
        .catch((error) => {
            console.log(error);
            console.log("Unable to update");

          //window.alert("Sign unsuccessfull");
        })
        console.log("param")
        console.log(param)
        console.log("push")
        console.log(push)
        //push
        await apis.deleteDonate(param)
        .then((res) => {
          console.log(res.data)
          this.setState({getis:false})
        })
        .catch((error) => {
            console.log(error);
            console.log("Unable to delete");

          //window.alert("Sign unsuccessfull");
        })

        
  
        
      };
  

    function Approve(param){
        

        //to increate donors rank schema with param.reqfrom
        //remove record from Donate schema with param.reqfrom
        //this.setState({getis:false})
    }
    var countReq=0;
    return (
      <div style={{margin:"1%"}} 
      className='font'
      >
        {//<Link to="/dashboard">Back to Dashboard</Link>
        }<Card title="Requests">
            {this.state.allReqs.map((v,i)=>{
              
                if(this.props.email_id === v.reqto){
                  countReq+=1;
                    return(
                        <div>
                            <Card>
                              {(v.isDonor === undefined? 
                              (<div><p>A Guest User registed for donation at {v.reqto}</p>
                              <p>Guest Email Id : {v.reqfrom}</p>
                              <p>Message sent from Donor : {v.chat}</p>
                              <p>{v.BloodType ? "BloodType : "+v.BloodType: null }</p>
                              <p>{v.Quantity ? "Quantity : "+v.Quantity: null }</p>
                              <Button onClick={()=>{onApprove(v)}}>Approve Donation </Button></div>)
                               
                              : 
                                v.isDonor? 
                                 (<div><p>A Donor registed to donate at {v.reqto}</p>
                                <p>Donors Email Id : {v.reqfrom}</p>
                                <p>Message sent from Donor : {v.chat}</p>
                                <Button onClick={()=>{onApprove(v)}}>Approve</Button></div>)
                                 : 
                                  (<div><p>A Blood Bank has requested for Blood to {v.reqto}</p>
                                 <p>Blood Bank Email Id : {v.reqfrom}</p>
                                 <p>Message sent from Blood Bank : {v.chat}</p>
                              <p>{v.BloodType ? "BloodType : "+v.BloodType: null }</p>
                              <p>{v.Quantity ? "Quantity : "+v.Quantity: null }</p>
                                 <Button onClick={()=>{onApprove(v)}}>Approve Donation</Button></div>)
                                )}
                                
                            </Card>
                        </div>
                    )
                }
            }
            
            )
            }
            
        {countReq===0?"No Requests Found!":null }
        </Card>
        
      </div>
    );
  }
}

export default Requests;
