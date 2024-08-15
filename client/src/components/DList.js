import React from "react";
import { Link } from "react-router-dom";
import {Table, Card, BackTop} from "antd";
import BackBtn from "./BackBtn";

class DList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {


const columns = [
    {
      title: 'Email Id of the User',
      dataIndex: 'email_id',
      key: 'email_id',
      
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: (a, b) => a.fullName - b.fullName,
      defaultSortOrder: 'descend',
    //sortDirections: ['descend']

      
    },
    {
      title: 'bloodType',
      dataIndex: 'bloodType',
      key: 'bloodType',
      sorter: (a, b) => a.fullName - b.fullName,
      defaultSortOrder: 'descend',
    //sortDirections: ['descend']

      
    },
    {
      title: 'bio',
      dataIndex: 'bio',
      key: 'bio',
      sorter: (a, b) => a.fullName - b.fullName,
      defaultSortOrder: 'descend',
    //sortDirections: ['descend']

      
    }
    
  ];
  
const columns2 = [
    {
      title: 'Email Id of the User',
      dataIndex: 'email_id',
      key: 'email_id',
      
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: (a, b) => a.fullName - b.fullName,
      defaultSortOrder: 'descend',
    //sortDirections: ['descend']

    
    },
    {
        title: 'Location Co-ordinates',
        dataIndex: 'coords',
        key: 'coords',
        
      }
  ];
  return (
      <div style={{margin:"1%"}} 
      className='font'
      >
        {//<BackBtn />
        }<Card title="List of All Donors">

        <Table bordered={true} dataSource={this.props.allUsers} columns={columns} />
        </Card>
        <Card title="List of All Blood Banks">

        <Table bordered={true} dataSource={this.props.allBanks} columns={columns2} />
        </Card>
        

      </div>
    );
  }
}

export default DList;
