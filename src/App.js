import React, { Component } from 'react';
import './App.css';
import ToolBar from './components/ToolBar'
import MessageList from './components/MessageList'
import ComposeForm from './components/ComposeForm'
import request from '../node_modules/superagent/superagent'


class App extends Component {

  constructor(){
    super()
    this.state = {
      data: [],
      composeForm: false     
    }   
  }

  async componentDidMount() {
    const response = await fetch('https://brownemail.herokuapp.com/api/messages')
    const json = await response.json()    
    this.setState({data: json._embedded.messages})
  }

  async postRequest(compose) {
     request
    .post('https://brownemail.herokuapp.com/api/messages')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({ subject: compose.subject, body: compose.body })
    .end(function(err, res){
    console.log(res.text);
    });
    this.componentDidMount() 
  }

  async patchRequest(item, data){
    fetch('https://brownemail.herokuapp.com/api/messages', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',                                                              
      body: JSON.stringify(item)                                        
    })
    this.setState({data: data})
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
    let patch = {
      "messageIds": [starredthing[i].id],
      "command": "star",
      "star": starredthing[i].starred
    }
    console.log(patch)
    this.patchRequest(patch, starredthing)
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
    let patch = {
      "messageIds":[],
      "command": "read",
      "read": false
    }    
      for(let i = 0; i < markedRead.length; i++){
        if(markedRead[i].selected === true){
          markedRead[i].read = true
          markedRead[i].selected = false
          patch.messageIds.push(markedRead[i].id)
          patch.read = markedRead[i].read
          this.setState({data: markedRead})
        }
      }
      console.log(patch)
      this.patchRequest(patch,markedRead)
  }

  markUnread = () => {
    let markedUnread = this.state.data
    let patch = {
      "messageIds":[],
      "command": "read",
      "read": true
    }    
    for(let i = 0; i < markedUnread.length; i++){
      if(markedUnread[i].selected === true){
        markedUnread[i].read = false
        markedUnread[i].selected = false
        patch.messageIds.push(markedUnread[i].id)
        patch.read = markedUnread[i].read
        this.setState({data: markedUnread})
      } 
    }
    console.log(patch)
    this.patchRequest(patch, markedUnread)
  }


  applyLabel = (e) => {
    e.preventDefault()
    let newlabel = this.state.data
    let patch = {
      "messageIds":[],
      "command": "addLabel",
      "label": ""
    }    
    for(let i = 0; i < newlabel.length; i++){
      if(newlabel[i].selected === true){
        newlabel[i].labels.push(e.target.value)
        patch.messageIds.push(newlabel[i].id)
        patch.label = e.target.value
        this.setState({data: newlabel})
      }
    }
    console.log(patch)
    this.patchRequest(patch, newlabel)
  }

  removeLabel = (e) => {
    e.preventDefault()
    let el = e.target.value
    let removeLabel = this.state.data
    let patch = {
      "messageIds":[],
      "command": "removeLabel",
      "label": ""
    }
    for(let i = 0; i < removeLabel.length; i++){
      if(removeLabel[i].selected === true){
        let labels = removeLabel[i].labels         
        removeLabel[i].labels = labels.filter(move => move !== el)
        patch.messageIds.push(removeLabel[i].id)
        patch.label = e.target.value
        this.setState({data: removeLabel})        
      }
    }
    console.log(patch)
    this.patchRequest(patch, removeLabel)
  }

  deleteMessage = () => {
    let deleteMess = this.state.data
    let arr = []
    let patch = {
      "messageIds":[],
      "command": "delete",
    }
    for (let i = 0; i < deleteMess.length; i++) {
      if (deleteMess[i].selected !== true) {
        arr.push(deleteMess[i])
        this.setState({data: arr})
      } else {
        patch.messageIds.push(deleteMess[i].id)
      }
    }
    console.log(patch)
    this.patchRequest(patch, arr)    
  }

  selectAll = () => {
    let select = this.state.data
    for(let i = 0; i < select.length; i++){
      
      if(!select[i].selected){
        select[i].selected = true
        this.setState({data: select})
      } 
    }
  }

  dropdownMessage = () => {
   this.setState({composeForm: !this.state.composeForm})
    
    }

  createMessage = (e) => {
    e.preventDefault()
    let compose = {
      subject: e.target.subject.value,
      body: e.target.body.value
    }
    this.postRequest(compose)
    this.dropdownMessage() 
  }

  render() {
    return (
      
      <div>
          
        <ToolBar data={this.state.data} unreadCount = {this.unreadCount} markRead = {this.markRead} markUnread = {this.markUnread} applyLabel = {this.applyLabel} removeLabel = {this.removeLabel} deleteMessage = {this.deleteMessage} selectAll = {this.selectAll} dropdownMessage = {this.dropdownMessage}/>
        {
            this.state.composeForm
            ? <ComposeForm createMessage = {this.createMessage}/> : null
          }
        <MessageList data={this.state.data} selectedMessage = {this.selectedMessage} starred = {this.starred} />
      </div>
    );
  }
}

export default App;
