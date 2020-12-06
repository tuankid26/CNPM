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
                content:this.props.itemEditing.content,
                name : this.props.itemEditing.name,
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
        this.props.onSave(this.state);
        this.onClear();
        this.onExitForm();
    }

    onClear = () => {
        this.setState({
            id : '',
            name : '',
            status : false,
            content:'',
            time:'',
            month:''
        });
    }

    onExitForm = () => {
        this.props.onExitForm();
    }
    
    getTime () {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        var result= date + '/' + month + '/' + year 
      + ' ' + hours + ':' + min + ':' + sec
        // this.setState({[time] : result});
        return result;
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
                                name="name"
                                value={this.state.name}
                                onChange={ this.onHandleChange }
                            />
                        </div>
                        <label>Tiêu đề :</label>
                        <select
                            className="form-control"
                            value={this.state.content}
                            onChange={this.onHandleChange}
                            name="content"
                        >
                            <option value={'Môi Trường'}>Môi Trường</option>
                            <option value={'An Ninh Trật Tự'}>An Ninh Trật tự</option>
                            <option value={'Văn hóa'}>Văn hóa</option>
                            <option value={'Các loại phí'}>Các loại phí</option>
                            <option value={'Khác'}>Khác</option>
                        </select><br/>
                        <label>Quý :</label>
                        <select
                            className="form-control"
                            value={this.state.month}
                            onChange={this.onHandleChange}
                            name="month"
                        >
                            <option value={'1'}>1</option>
                            <option value={'2'}>2</option>
                            <option value={'3'}>3</option>
                            <option value={'4'}>4</option>
                        </select><br/>
                        
                        <label>Trạng Thái :</label>
                        <select
                            className="form-control"
                            value={this.state.status}
                            onChange={this.onHandleChange}
                            name="status"
                        >
                            <option value={true}>Chưa xử lý</option>
                            <option value={false}>Đã xử lý</option>
                        </select><br/>
                        <div className="text-center">
                            <button type="submit" onClick={this.getTime} className="btn btn-warning">
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
