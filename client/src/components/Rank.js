import React from 'react';
import { Link } from "react-router-dom";
import apis from "../api/apis";
import {Table, Card} from "antd";
import BackBtn from './BackBtn';
class Rank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allRanks:[],
            getis:false,
        };
    }

    render() {

const columns = [
    {
      title: 'Email Id of the User',
      dataIndex: 'email_id',
      key: 'email_id',
      
    },
    {
      title: 'Number of Times Donated',
      dataIndex: 'no',
      key: 'no',
      sorter: (a, b) => a.no - b.no,
      defaultSortOrder: 'descend',
    //sortDirections: ['descend']

      
    }
  ];
        const loadData = async () => {
            console.log("loaddata fun")
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
        return (
            <div style={{margin:"1%"}} 
          className='font'
          >
                {//<BackBtn />
                }<Card title="Ranks">
                    People who donated the most are at the top of the table.
                    <Table bordered={true} dataSource={this.state.allRanks} columns={columns} />
                </Card>
            </div>
        );
    }
}


export default Rank;
