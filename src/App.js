import React, { Component } from 'react';
import './App.css';
import ToolBar from './components/ToolBar'
import MessageList from './components/MessageList'

const data = [
  {
    "id": 1,
    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    "read": false,
    "starred": true,
    "labels": ["dev", "personal"]
  },
  {
    "id": 2,
    "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
    "read": false,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 3,
    "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
    "read": false,
    "starred": true,
    "labels": ["dev"]
  },
  {
    "id": 4,
    "subject": "We need to program the primary TCP hard drive!",
    "read": true,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 5,
    "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
    "read": false,
    "starred": false,
    "labels": ["personal"]
  },
  {
    "id": 6,
    "subject": "We need to back up the wireless GB driver!",
    "read": true,
    "starred": true,
    "labels": []
  },
  {
    "id": 7,
    "subject": "We need to index the mobile PCI bus!",
    "read": true,
    "starred": false,
    "labels": ["dev", "personal"]
  },
  {
    "id": 8,
    "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
    "read": true,
    "starred": true,
    "labels": []
  }
]

class App extends Component {

  constructor(){
    super()
    this.state = {
      data: data,
      
      
      
    }
   
  }
  

  selectedMessage = (i) => {
    
   let selectedthing = this.state.data
    if(selectedthing[i].selected === true){
      selectedthing[i].selected = false
      this.setState({data: selectedthing})
    }else{
      selectedthing[i].selected = true
      this.setState({data: selectedthing})
    }
  }

  starred = (i) => {
    let starredthing = this.state.data
    if(starredthing[i].starred === true){
      starredthing[i].starred = false
      this.setState({data: starredthing})
    } else {
      starredthing[i].starred = true
      this.setState({data: starredthing})
    }
  }

  unreadCount = () => {
    let count = this.state.data
    let arr = []
    for(let i = 0; i < count.length; i++){
      if(count[i].read === false){
        arr.push(count[i])        
      }
    }
    return arr.length
  }

  markRead = () => {
    let markedRead = this.state.data    
      for(let i = 0; i < markedRead.length; i++){
        if(markedRead[i].selected === true){
          markedRead[i].read = true
          markedRead[i].selected = false
          this.setState({data: markedRead})
        }
      }
  }

  markUnread = () => {
    let markedUnread = this.state.data
    for(let i = 0; i < markedUnread.length; i++){
      if(markedUnread[i].selected === true){
        markedUnread[i].read = false
        markedUnread[i].selected = false
        this.setState({data: markedUnread})
      } 
    }
  }


  applyLabel = (e) => {
    e.preventDefault()
    let newlabel = this.state.data
    for(let i = 0; i < newlabel.length; i++){
      if(newlabel[i].selected === true){
        newlabel[i].labels.push(e.target.value)
        this.setState({data: newlabel})
      }
    }
  }

  removeLabel = (e) => {
    e.preventDefault()
    let el = e.target.value
    let removeLabel = this.state.data
    for(let i = 0; i < removeLabel.length; i++){
      if(removeLabel[i].selected === true){
        let labels = removeLabel[i].labels         
        removeLabel[i].labels = labels.filter(move => move !== el)
        this.setState({data: removeLabel})
        
      }
    }
  }

  deleteMessage = (i) => {
    let deleteMess = this.state.data 
      if(deleteMess[i].selected === true){
        deleteMess[i] = null
        this.setState({data: deleteMess})
      }
  
  }

  selectAll = () => {
    let select = this.state.data
    for(let i = 0; i < select.length; i++){
      console.log(select[i])
      if(!select[i].selected){
        select[i].selected = true
        this.setState({data: select})
      } 
    }
  }

  render() {
    return (
      <div>
        <ToolBar data={this.state.data} unreadCount = {this.unreadCount} markRead = {this.markRead} markUnread = {this.markUnread} applyLabel = {this.applyLabel} removeLabel = {this.removeLabel} deleteMessage = {this.deleteMessage} selectAll = {this.selectAll}/>
        <MessageList data={this.state.data} selectedMessage = {this.selectedMessage} starred = {this.starred} />
      </div>
    );
  }
}

export default App;
