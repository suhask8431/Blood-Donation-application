import React, { Component } from 'react'
import {
    RollbackOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { blue } from '@ant-design/colors';

export default class BackBtn extends Component {
    render() {
        return (
            <div style={{ backgroundColor: "#002766", width: "170px", height: "50px", textAlign: "center" }} ><Link to="/dashboard" style={{ lineHeight: "42px", fontSize: "14px", textAlign: "center", color: "white" }} > <RollbackOutlined style={{paddingRight:"5px"}} />   Back to Dashboard</Link></div>
        )  
    }
}
