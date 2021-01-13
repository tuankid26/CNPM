import React,  {Component}  from 'react';
import Popup from 'reactjs-popup';
import './TaskDetail.css';
 
class TaskDetail extends Component{
  constructor(props) {
    super(props);
 
  }
 
  onTest = () => {
    console.log('hello');
  }
 
  render(){
 
    var nhankhau = this.props.nhankhau;
    // console.log(nhankhau);
    // console.log(this.props.task);
 
    // var list = [];
    //nhankhau.forEach(person => list.push(person.hoten));
    return(
    <Popup
        trigger={<button type="button"  className="btn btn-info" >
        <span  id={this.props.task.id} onClick={this.props.onShowDetail} className="fa fa-info-circle" data-toggle="tooltip" title="Chi tiết"></span>
      </button>}
        
        modal
        nested
      >
    
        {close => (
           <div className="modal-content">
           <div className="modal-header">
             <button type="button" className="close" onClick={close} data-dismiss="modal">×</button>
             <h3 className="modal-title">Thông tin chi tiết </h3>
           </div>
           <div className="modal-body">
             <label>Tiêu đề :</label><br />
             {this.props.task.title}
              <br/>
              <label>Nội dung :</label><br />
              {this.props.task.noiDung}
              <br />
              <label>Thời gian :</label>
               {this.props.task.time}
              <br/>
              <label>Trạng thái :</label>
               {this.props.task.status ? "Đã xử lý" : "Đang xử lý"}
              <br/>
              <label>Người phản ánh :</label>
               {nhankhau ? nhankhau.length : ''}
              <br/> 
              <ul>
              {nhankhau ? nhankhau.map(person => <li>{person}</li>) : ''}
              </ul>
              
            </div>
            <div className="actions">
 
              {/* <button
                className="btn btn-danger"
                onClick={() => {
                  close();
                }}
              >
                Đóng
              </button> */}
            </div>
          
          </div>
        )}
      </Popup>  
 
    );
  }
}
 
export default TaskDetail;
