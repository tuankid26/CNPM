import React, { Component } from 'react';
 
class TaskForm extends Component {
 
    constructor(props) {
        super(props);
        this.state = {};
    }
 
    componentWillMount() {
        if(this.props.itemEditing && this.props.itemEditing.id !== null){
            this.setState({
                id : this.props.itemEditing.id,
                tieude:this.props.itemEditing.title,
                noiDung: this.props.itemEditing.noiDung,
                quy: this.props.itemEditing.quy,
                nguoiPhanAnh: this.props.itemEditing.nguoiPhanAnh,
                status : this.props.itemEditing.status

            });
        }else{
            this.onClear();
        }
    }
 
    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.itemEditing){
            this.setState({
                id : nextProps.itemEditing.id,
                tieude : nextProps.itemEditing.title,
                noiDung : nextProps.itemEditing.noiDung,
                quy: nextProps.itemEditing.quy,
                nguoiPhanAnh: nextProps.itemEditing.nguoiPhanAnh,
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
        this.props.onSave(this.state);
        this.onClear();
        this.onExitForm();
    }
 
    onClear = () => {
        this.setState({
            id : '',
            tieude:'',
            noiDung : '',
            status : 0,
            time:'',
            quy:'',
            nguoiPhanAnh:''
        });
    }
 
    onExitForm = () => {
        this.props.onExitForm();
    }
 
    render() {
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        { !this.state.id ? 'Thêm Phản Hồi' : 'Cập Nhật Phản hồi' }
                        <span
                            className="fa fa-times-circle text-right"
                            onClick={this.onExitForm}
                        ></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onHandleSubmit} >
                        <div className="form-group">
                            <label>Nội dung :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="noiDung"
                                value={this.state.noiDung}
                                onChange={ this.onHandleChange }
                            />
                        </div>
                        <label>Tiêu đề :</label>
                        <select
                            className="form-control"
                            value={this.state.tieude}
                            onChange={this.onHandleChange}
                            name="tieude"
                        >
                            <option value={'Môi Trường'}>Môi Trường</option>
                            <option value={'An Ninh Trật Tự'}>An Ninh Trật tự</option>
                            <option value={'Văn hóa'}>Văn hóa</option>
                            <option value={'Các loại phí'}>Các loại phí</option>
                            <option value={'Chính sách'}>Chính sách</option>
                            <option value={'Cơ sở vật chất'}>Cơ sở vật chát</option>
                            <option value={'Đất đai'}>Đất đai</option>
                            <option value={'Khác'}>Khác</option>
                        </select><br/>
                        <label>Quý :</label>
                        <select
                            className="form-control"
                            value={this.state.quy}
                            onChange={this.onHandleChange}
                            name="quy"
                        >
                            <option value={'1'}>1</option>
                            <option value={'2'}>2</option>
                            <option value={'3'}>3</option>
                            <option value={'4'}>4</option>
                        </select><br/>
                        <div className="form-group">
                            <label>Người phản ánh:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nguoiPhanAnh"
                                value={this.state.nguoiPhanAnh}
                                onChange={ this.onHandleChange }
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select
                            className="form-control"
                            value={this.state.status}
                            onChange={this.onHandleChange}
                            name="status"
                        >
                            <option value={0}>Chưa xử lý</option>
                            <option value={1}>Đã xử lý</option>
                        </select><br/>
                        <div className="text-center">
                            <button type="submit" onClick={this.onHandleSubmit} className="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span>Lưu Lại
                            </button>
                            <button type="button" onClick={ this.onClear } className="btn btn-danger">
                                <span className="fa fa-close mr-5"></span>Hủy Bỏ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
 
export default TaskForm;