import React from 'react'
import Message from './Message'

export default class MessageList extends React.Component { 
   
    render(){
        console.log(this.props)
        return (
                <div className="message">
                    {this.props.data.map(message =>
                    <Message key={message.id} message={message} selectedMessage={ ()=> this.props.selectedMessage(this.props.data.indexOf(message))}
                    starred={ () => this.props.starred(this.props.data.indexOf(message))} isRead ={this.props.isRead}/>)}
                </div>
        )
    }
}
    





