import React from "react";
import { Button, Card, message } from "antd"; // Import message from Ant Design for notifications
import apis from "../api/apis";

class Requests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allReqs: [],
      allRanks: [],
      getis: false,
      approvalMessage: "" // State variable to store the approval message
    };
  }

  componentDidMount() {
    this.loadData();
  }

  // Move loadData outside render method to prevent unnecessary re-creation
  loadData = async () => {
    try {
      const resDonate = await apis.getDonate();
      const resRank = await apis.getRank();

      this.setState({
        allReqs: resDonate.data.result,
        allRanks: resRank.data.result,
        getis: true
      });

      console.log("Requests and Ranks loaded successfully!");
    } catch (error) {
      console.log(error);
      message.error("Couldn't load data, please try again.");
    }
  };

  onApprove = async (param) => {
    let person;
    let arr = this.state.allRanks;

    console.log("Approve Method triggered");
    console.log(param);

    if (param.isDonor !== undefined && param.isDonor) {
      person = param.reqfrom;
      console.log("Donor condition: " + person);
    } else {
      person = param.reqto;
      console.log("Bank or Guest condition: " + person);
    }

    let push;
    arr.forEach((v) => {
      if (v.email_id === person) {
        push = { email_id: v.email_id, no: v.no };
      }
    });

    if (push) {
      push.no += 1; // Increment rank
      const payload = push;

      try {
        await apis.updateRanks(payload);
        console.log("Rank updated successfully");
      } catch (error) {
        console.log(error);
        message.error("Unable to update rank");
        return;
      }

      try {
        await apis.deleteDonate(param);
        console.log("Request deleted successfully");
        this.setState({ getis: false }, () => {
          this.loadData(); // Reload data to update the UI
        });
        message.success("Request approved!"); // Display success message
      } catch (error) {
        console.log(error);
        message.error("Unable to delete request");
      }
    } else {
      message.error("Person not found in ranks");
    }
  };

  render() {
    let countReq = 0;
    const { allReqs, getis } = this.state;

    if (!getis) {
      this.loadData(); // Load data if not already loaded
    }

    return (
      <div style={{ margin: "1%" }} className="font">
        <Card title="Requests">
          {allReqs.map((v, i) => {
            if (this.props.email_id === v.reqto) {
              countReq += 1;
              return (
                <div key={i}>
                  <Card>
                    {v.isDonor === undefined ? (
                      <div>
                        <p>A Guest User registered for donation at {v.reqto}</p>
                        <p>Guest Email Id: {v.reqfrom}</p>
                        <p>Message sent from Donor: {v.chat}</p>
                        <p>{v.BloodType ? "BloodType: " + v.BloodType : null}</p>
                        <p>{v.Quantity ? "Quantity: " + v.Quantity : null}</p>
                        <Button onClick={() => { this.onApprove(v); }}>Approve Donation</Button>
                      </div>
                    ) : v.isDonor ? (
                      <div>
                        <p>A Donor registered to donate at {v.reqto}</p>
                        <p>Donor's Email Id: {v.reqfrom}</p>
                        <p>Message sent from Donor: {v.chat}</p>
                        <Button onClick={() => { this.onApprove(v); }}>Approve</Button>
                      </div>
                    ) : (
                      <div>
                        <p>A Blood Bank has requested for Blood to {v.reqto}</p>
                        <p>Blood Bank Email Id: {v.reqfrom}</p>
                        <p>Message sent from Blood Bank: {v.chat}</p>
                        <p>{v.BloodType ? "BloodType: " + v.BloodType : null}</p>
                        <p>{v.Quantity ? "Quantity: " + v.Quantity : null}</p>
                        <Button onClick={() => { this.onApprove(v); }}>Approve Donation</Button>
                      </div>
                    )}
                  </Card>
                </div>
              );
            }
            return null;
          })}
          {countReq === 0 ? "No Requests Found!" : null}
        </Card>
      </div>
    );
  }
}

export default Requests;
