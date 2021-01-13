import React,  {useState,useEffect, Component}  from 'react';
import Popup from 'reactjs-popup'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import "./TaskMail.css";
class TaskMail extends Component{
  constructor(props) {
    super(props);
    this.state = {
      show : false,
      Data : false,
      sending: false,
      sucess: false,
      res: ''
    };
  }
    Mail_Send(){
    const mailObject = {
        content: this.props.task.noiDung,
        email: this.state.email,
        title: this.props.task.title
    };       
    console.log(mailObject.content)
    axios.post('http://localhost:9000/send', mailObject)
    .then((res) => {
        this.setState({res : res.statusText});
        
      })
      .catch((error) => {
        console.log(error);
    });
}

componentWillReceiveProps(nextProps) {
    if(nextProps && nextProps.itemEditing){
        this.setState({
            id : nextProps.itemEditing.id,
            content : nextProps.itemEditing.noiDung,
            title : nextProps.itemEditing.title,
            status : nextProps.itemEditing.status
        });
    }else{
        this.onClear();
    }
}

onHandleChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
        [name] : value
    });
}


onHandleSubmit =  (event) => {
    
   
    event.preventDefault();
    this.setState({sending: true});
    this.Mail_Send(this.state);
    
    setTimeout( () =>{if (this.state.res === 'OK') this.setState({success:true})} ,5000);
    console.log(this.state.res);
    // this.onClear();
    //this.onExitMail();
}

onClear = () => {
    this.setState({
        title:'',
        content:'',
        time:'',
        month:'',
        email:''
    });
}

// onExitMail = () => {
//     this.props.onExitMail();
// }
 
  
    
  render(){
    // console.log(this.state.sucess);
    return(
        <Popup
        trigger={ <button type="button" className="btn btn-primary" onClick = {this.onSendMail}>
            <span className="fa fa-google" data-toggle="tooltip" title="Gửi email"></span>
      </button>}
        modal
        nested
      >
        {close => (
    
    <div className="modal-content">
            <div className="modal-header">
               <button type="button" className="close" onClick={close} data-dismiss="modal">×</button>
            <h4 className="modal-title">Gửi phản hồi qua email</h4>
                </div>
            <div className="panel-body">
                    <form onSubmit={this.onHandleSubmit} >
                    { this.state.success ? 
				          	<div className="alert alert-success" role="alert">
				          	Gửi thành công
				          	</div> : (this.state.sending ? <div className="alert alert-danger" role="alert">
				          	Đang gửi mail...
				          	</div> : '')
					          }
                        <label>Tiêu đề email :</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={this.props.task.title}
                            onChange={ this.onHandleChange }
                            required maxLength={50}
                        />
                        
                        <label>Email nhận :</label>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            value={this.state.email}
                            onChange={ this.onHandleChange }
                        />
                        <div className="form-group">
                            <label>Nội dung email :</label>
                            <textarea
                                type="textarea"
                                className="form-control"
                                name="content"
                                value={this.props.task.noiDung}
                                onChange={ this.onHandleChange }
                                maxLength={6000} rows={5} 
                            />
                        </div>

                        <div className="text-center">
                            <button type="submit" onClick={this.onHandleSubmit} className="btn btn-warning">
                                <span className="fa fa-paper-plane-o mr-5"></span>Gửi email
                            </button>
                            <button type="button" onClick={ () => {close();} } className="btn btn-danger">
                                <span className="fa fa-close mr-5"></span>Hủy Bỏ
                            </button>
                        </div>
                    </form>
                    {/* { !this.state.success ? 
				          	<div className="alert alert-success" role="alert">
				          	Gửi thành công
				          	</div> : <h1>Gửi thất bại</h1>
					          } */}
                </div>
            
            {/* <div className="actions">
    
              <button
                className="button"
                onClick={() => {
                  close();
                }}
              >
                Đóng
              </button>
            </div> */}
          </div>
        )}
      </Popup>
 
    );
  }
}
 
export default TaskMail;