import "./App.css";
import React from "react";

import Login from "./components/Login";
import Simple from "./components/Simple";
import NotFound from "./components/NotFound";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import SDashboard from "./components/SDashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import {  Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import BloodBank from "./components/BloodBank";
import Requests from "./components/Requests";
import Rank from "./components/Rank";
import DList from "./components/DList";
import Instructions from "./components/Instructions";
import "./components/styles/Dashboard.css";
import "./components/styles/SDashboard.css";
import Chat from "./components/Chat";
import ChatOpened from "./components/ChatOpened";


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      email_id: "",
      fullName: "",
      isDonor: false,
      allUsers:[],
      allBanks:[],
      opened:{},
      openedForChat:{},
      coords:"",
      bloodType:"",
      bio:"",
    };
    this.setData = this.setData.bind(this);
    this.setOpened = this.setOpened.bind(this);
    this.setDonorData = this.setDonorData.bind(this);
    this.setOpenedForChat = this.setOpenedForChat.bind(this);
    
  }
  setOpened(opened){
    console.log("opened" )
    console.log(opened )
    this.setState({
      opened
    },()=>{console.log(JSON.stringify(this.state.opened.fullName) + 'Opened state set in App')})
  }
  setOpenedForChat(openedForChat){
    console.log("openedForChat for chat" )
    console.log(openedForChat )
    this.setState({
      openedForChat:openedForChat
    },()=>{console.log(JSON.stringify(this.state.openedForChat.fullName) + 'Opened state set in App')})
  }
  setDonorData(bloodType,bio){
    console.log("setState SetDonorData"+bloodType+bio);

    this.setState({
      bloodType,bio
    })
  }
  setData(email_id, fullName, isDonor, allUsers,allBanks,r){
    if(r.coords != null){
      this.setState({coords:r.coords})
    }
    this.setState({
      email_id,
      fullName,
      isDonor,
      allUsers,
      allBanks
    },()=>{console.log(this.state.email_id + 'User state set in App')})
  }
  render() {
    const {email_id, fullName, isDonor, allUsers, opened, allBanks, coords, bloodType, bio, openedForChat } = this.state;
    return (
      //<protectedRoute path="dashboard" element={<Dashboard />} component={<Dashboard />} />
    <BrowserRouter>
      <Routes >
          
          {//<Route path="login" element={<Simple setData={this.setData} email_id={email_id} fullName={fullName} isDonor={isDonor} />} />
          }
          <Route index element={<Login setDonorData={this.setDonorData} setData={this.setData} email_id={email_id} fullName={fullName} isDonor={isDonor} />} />
          <Route path="login" element={<Login setDonorData={this.setDonorData} setData={this.setData} email_id={email_id} fullName={fullName} isDonor={isDonor} />} />
          <Route path="sign" element={<SignUp />} />
          <Route element={<ProtectedRoute email_id={email_id} fullName={fullName} isDonor={isDonor}/>} >
            <Route path="/dashboard" element={<SDashboard bloodType={bloodType} bio={bio} coords={coords} setOpenedForChat={this.setOpenedForChat} setOpened={this.setOpened} allUsers={allUsers} email_id={email_id} fullName={fullName} isDonor={isDonor} allBanks={allBanks} />} />
            <Route path="/dashboard/profile" element={<Profile bloodType={bloodType} bio={bio} coords={coords}email_id={email_id} fullName={fullName} isDonor={isDonor}/>} />
            <Route path="/dashboard/chat" element={<Chat  setOpenedForChat={this.setOpenedForChat} openedForChat={openedForChat} allUsers={allUsers} allBanks={allBanks} bloodType={bloodType} bio={bio} coords={coords}email_id={email_id} fullName={fullName} isDonor={isDonor}/>} />
            <Route path="/dashboard/chat/msgs" element={<ChatOpened openedForChat={openedForChat} allUsers={allUsers} allBanks={allBanks} bloodType={bloodType} bio={bio} coords={coords}email_id={email_id} fullName={fullName} isDonor={isDonor}/>} />
            <Route path="/dashboard/Bloodbank" element={<BloodBank bloodType={bloodType} bio={bio} opened={opened} email_id={email_id} fullName={fullName} isDonor={isDonor}/>} />
            <Route path="/requests" element={<Requests allUsers={allUsers} email_id={email_id} fullName={fullName} isDonor={isDonor} allBanks={allBanks} />} />
            <Route path="/ranks" element={<Rank allUsers={allUsers} email_id={email_id} fullName={fullName} isDonor={isDonor} allBanks={allBanks} />} />
            <Route path="/donorslist" element={<DList allUsers={allUsers} email_id={email_id} fullName={fullName} isDonor={isDonor} allBanks={allBanks} />} />
            <Route path="/donateinstructions" element={<Instructions allUsers={allUsers} email_id={email_id} fullName={fullName} isDonor={isDonor} allBanks={allBanks} />} />

          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
        
    );
  }
}

export default App;
