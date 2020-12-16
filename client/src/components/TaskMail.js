import React,  {useState,useEffect, Component}  from 'react';
import Popup from 'reactjs-popup'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
class TaskMail extends Component{
  constructor(props) {
    super(props);
    this.state = {show : false};
  }



    Mail_Send(){
    const mailObject = {
        content: this.state.content,
        email: this.state.email,
        title: this.state.title
    };       
    console.log(mailObject.content)
    axios.post('http://localhost:9000/send', mailObject)
    .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
    });
}

componentWillReceiveProps(nextProps) {
    if(nextProps && nextProps.itemEditing){
        this.setState({
            id : nextProps.itemEditing.id,
            content : nextProps.itemEditing.content,
            name : nextProps.itemEditing.name,
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


onHandleSubmit = (event) => {
    event.preventDefault();
    this.Mail_Send(this.state);
    this.onClear();
    this.onExitMail();
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

onExitMail = () => {
    this.props.onExitMail();
}
 
  
    
  render(){
 
    return(
        <Popup
        trigger={ <button type="button" className="btn btn-primary" onClick = {this.onSendMail}>
            <span className="fa fa-google" data-toggle="tooltip" title="Gửi email"></span>
      </button>}
        modal
        nested
      >
        {close => (
    
          <div className="custom_modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header"> Gửi phản hồi qua email</div>


            <div className="panel-body">
                    <form onSubmit={this.onHandleSubmit} >
                        <div className="form-group">
                            <label>Nội dung email :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="content"
                                value={this.state.content}
                                onChange={ this.onHandleChange }
                            />
                        </div>
                        <label>Tiêu đề email :</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={this.state.title}
                            onChange={ this.onHandleChange }
                        />

                        
                        <label>Email nhận :</label>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            value={this.state.email}
                            onChange={ this.onHandleChange }
                        />

                        <div className="text-center">
                            <button type="submit" onClick={this.getTime} className="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span>Gửi email
                            </button>
                            <button type="button" onClick={ () => {close();} } className="btn btn-danger">
                                <span className="fa fa-close mr-5"></span>Hủy Bỏ
                            </button>
                        </div>
                    </form>
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
//     <div className="panel panel-warning">
//     <div className="panel-heading">
//         <h3 className="panel-title">
//             { !this.state.id ? 'Thêm Phản Hồi' : 'Cập Nhật Phản hồi' }
//             <span
//                 className="fa fa-times-circle text-right"
//                 onClick={this.onExitForm}
//             ></span>
//         </h3>
//     </div>
//     <div className="panel-body">
//         <form onSubmit={this.onHandleSubmit} >
//             <div className="form-group">
//                 <label>Nội dung :</label>
//                 <input
//                     type="text"
//                     className="form-control"
//                     name="name"
//                     value={this.state.name}
//                     onChange={ this.onHandleChange }
//                 />
//             </div>
//             <label>Tiêu đề :</label>
//             <select
//                 className="form-control"
//                 value={this.state.content}
//                 onChange={this.onHandleChange}
//                 name="content"
//             >
//                 <option value={'Môi Trường'}>Môi Trường</option>
//                 <option value={'An Ninh Trật Tự'}>An Ninh Trật tự</option>
//                 <option value={'Văn hóa'}>Văn hóa</option>
//                 <option value={'Các loại phí'}>Các loại phí</option>
//                 <option value={'Khác'}>Khác</option>
//             </select><br/>
//             <label>Quý :</label>
//             <select
//                 className="form-control"
//                 value={this.state.month}
//                 onChange={this.onHandleChange}
//                 name="month"
//             >
//                 <option value={'1'}>1</option>
//                 <option value={'2'}>2</option>
//                 <option value={'3'}>3</option>
//                 <option value={'4'}>4</option>
//             </select><br/>
            
//             <label>Trạng Thái :</label>
//             <select
//                 className="form-control"
//                 value={this.state.status}
//                 onChange={this.onHandleChange}
//                 name="status"
//             >
//                 <option value={true}>Chưa xử lý</option>
//                 <option value={false}>Đã xử lý</option>
//             </select><br/>
//             <div className="text-center">
//                 <button type="submit" onClick={this.getTime} className="btn btn-warning">
//                     <span className="fa fa-plus mr-5"></span>Lưu Lại
//                 </button>
//                 <button type="button" onClick={ this.onClear } className="btn btn-danger">
//                     <span className="fa fa-close mr-5"></span>Hủy Bỏ
//                 </button>
//             </div>
//         </form>
//     </div>
// </div>
  
 
    );
  }
}
 
export default TaskMail;