import React from 'react'


class Message extends React.Component {
    isit(item, tru, fal){
        return item? tru : fal;
    }

    render(){
       
        

        
        return (
            <div className={`row message ${this.isit(this.props.message.read, 'read', 'unread')} ${this.isit(this.props.message.selected, 'selected', '')}`}>
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input type="checkbox" checked={this.isit(this.props.message.selected, 'checked', '')} onChange ={this.props.selectedMessage}/>
                        </div>
                        <div className="col-xs-2">
                            <i className={`star fa ${this.isit(this.props.message.starred, 'fa-star', 'fa-star-o')}`} onClick= {this.props.starred}></i>
                        </div>
                    </div>
                </div>
                <div className="col-xs-11">
                    {this.props.message.labels.map(label => <span className="label label-warning">{label}
      </span>)}
                    <a>
                        {this.props.message.subject}
                    </a>
                </div>
            </div>
        )
    }

}




export default Message