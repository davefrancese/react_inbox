import React from 'react'

class Toolbar extends React.Component {

    render(){
      let className =''
      let disabled = ''
      let arr = []

      let data = this.props.data
      for(let i = 0; i < data.length; i++){
        if(data[i].selected === true){
          arr.push(data[i])
        
        }       
      }
      console.log(arr.length)
      console.log(data.length)
      if(arr.length === data.length){
        className += 'fa-check-square-o'
     } else if (arr.length < data.length && arr.length > 0){    
       className += 'fa-minus-square-o'
     } else {
       className += 'fa-square-o'
       disabled += 'disabled'
     }

        return (  
          
<div className="row toolbar">
<div className="col-md-12">
  <p className="pull-right">
    <span className="badge badge">{this.props.unreadCount()}</span>
    unread messages
  </p>

  <button className="btn btn-default" onClick = {this.props.selectAll}>
    <i className={`fa ${className} `}></i>
  </button>

  <button className="btn btn-default" disabled ={`${disabled}`}onClick = {this.props.markRead}>
    Mark As Read
  </button>

  <button className="btn btn-default" disabled ={`${disabled}`} onClick ={this.props.markUnread}>
    Mark As Unread
  </button>

  <select className="form-control label-select" disabled ={`${disabled}`} onChange ={e => this.props.applyLabel(e)}>
    <option>Apply label</option>
    <option value="dev">dev</option>
    <option value="personal">personal</option>
    <option value="gschool">gschool</option>
  </select>

  <select className="form-control label-select" disabled ={`${disabled}`} onChange = {e => this.props.removeLabel(e)}>
    <option>Remove label</option>
    <option value="dev">dev</option>
    <option value="personal">personal</option>
    <option value="gschool">gschool</option>
  </select>

  <button className="btn btn-default">
    <i className="fa fa-trash-o"></i>
  </button>
</div>
</div>
        )
    }
}



export default Toolbar