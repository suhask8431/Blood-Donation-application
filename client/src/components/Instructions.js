import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";

class Instructions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ margin: "3%", marginTop: "1%" }}
      className='font'
      >
        {//<Link to="/dashboard">Back to Dashboard</Link>
  }
        <Card title="Instructions For Donors" bordered>
          <ul>
            <li> Register and Login as Donor. </li>
            <li> When you login as Donor, You can see on the Dashboard about all the Blood Banks and All Donors. </li>
            <li> Donor can request only Blood Banks for Blood Donation. </li>
            <li> Donors can't request for Blood Donation directly as Blood Banks will request to other Donors from their side. </li>
            <li> Guest Users wont be shown to Donors as Donors can't request for Donation from any Guest Users. </li>
          </ul>
        </Card>

        <Card title="Instructions For Blood Bank Admins" bordered>
          <ul>
            <li> Register and Login as Blood Bank. </li>
            <li> When you login as Blood Bank, You can see on the Dashboard about all the Blood Banks and All Donors. </li>
            <li> Blood Banks can request for Donation from any of the Donors listed. </li>
            <li> Blood Banks can request for Donation from any other Blood Banks listed. </li>
            <li> Guest Users wont be shown to Blood Banks as Blood Banks can't request for Donation from any Guest Users. </li>
          </ul>
        </Card>

        <Card title="Instructions For Guest Users" bordered>
          <ul>
            <li> Register and Login as Guest User</li>
            <li> When you login as Guest User, You can see on the Dashboard about all the Blood Banks and All Donors. </li>
            <li> Guest Users can request for Donation from any of the Blood Banks listed. </li>
            <li> Guest Users can't request for Donation from any of the Donors listed, as Blood Banks will request to other Donors from their side. </li>
            <li> Other Guest Users wont be shown to Guest Users. </li>
          </ul>
        </Card>
      </div>
    );
  }
}

export default Instructions;
