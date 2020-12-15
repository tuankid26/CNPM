import React,  {Component}  from 'react';
import Popup from 'reactjs-popup'
 
class TaskDetail extends Component{
  constructor(props) {
    super(props);
 
  }
 
  onTest = () => {
    console.log('hello');
  }
 
  render(){
 
    var nhankhau = this.props.nhankhau;
    console.log(nhankhau);
 
 
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
          
          <div className="custom_modal">
            <div className="header"> Thông tin phản ánh </div>
            <div className="content">
              Tiêu đề: {this.props.task.title}
              <br/>
              Nội dung: {this.props.task.noiDung}
              <br />
              Thời gian: {this.props.task.thoigian}
              <br/>
              Trạng thái: {this.props.task.status ? "Đã xử lý" : "Đang xử lý"}
              <br/>
              Người phản ánh: {nhankhau ? nhankhau.length : ''}
              <br/> 
              <ul>
              {nhankhau ? nhankhau.map(person => <li>{person}</li>) : ''}
              </ul>
              
            </div>
            <div className="actions">
 
              <button
                className="button"
                onClick={() => {
                  close();
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </Popup>  
 
    );
  }
}
 
export default TaskDetail;
