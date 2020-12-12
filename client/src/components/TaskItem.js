import React, { Component } from 'react';
import TaskDetail from './TaskDetail';
class TaskItem extends Component {
 
    showStatusElement(){
        return (
            <span
                className={ this.props.task.status === "Đang xử lý" ? 'label label-danger' : 'label label-info' }
                onClick={ this.onUpdateStatus }
            >{ this.props.task.status === "Đang xử lý"  ? 'Chưa xử lý' : 'Đã xử lý' }</span>
        );
    }
 
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }
 
    onDeleteItem = () => {
        this.props.onDeleteTask(this.props.task.id);
    }
 
    onSelectedItem = () => {
        console.log(this.props.task);
        this.props.onSelectedItem(this.props.task);
    }
    onShowDetail = () => {
        console.log(this.props.task);
        this.props.onShowDetail(this.props.task.id);
    }

    onSendMail = () => {
        console.log(this.props.task);
        this.props.onSendMail(this.props.task);
    }
 
 
 
 
    render() {
        return (
            <tr>
                <td>{ this.props.task.id }</td>
                <td>{ this.props.task.tieude }</td>
                <td>{ this.props.task.noiDung }</td>
                <td className="text-center">
                    { this.showStatusElement() }
                </td>
                <td className="text-center">
                    { this.props.task.quy }
                </td>
                <td className="text-center">
                    {this.props.task.time}
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={ this.onSelectedItem }>
                        <span className="fa fa-pencil" data-toggle="tooltip" title="Sửa"></span>
                    </button>
                    <button type="button" className="btn btn-danger" onClick={ this.onDeleteItem }>
                        <span className="fa fa-trash" data-toggle="tooltip" title="Xóa"></span>
                    </button>
                    <button type="button" className="btn btn-primary" onClick = {this.onSendMail}>
                        <span className="fa fa-google" data-toggle="tooltip" title="Gửi mail"></span>
                    </button>
                    
                    <button type="button" className="btn btn-info" onClick = {this.onShowDetail} >
                        <span className="fa fa-info-circle" data-toggle="tooltip" title="Chi tiết"></span>
                    </button>
                    
                </td>
            </tr>
        );
    }
}
 
export default TaskItem;