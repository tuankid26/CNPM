import React, { Component } from 'react';
import TaskDetail from './TaskDetail';
import TaskMail from './TaskMail';
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





    render() {
        
        return (
            <tr>
                <td>{ this.props.index }</td>
                <td>{ this.props.task.title }</td>
                <td>{ this.props.task.noiDung }</td>
                <td className="text-center">
                    { this.showStatusElement() }
                </td>
                <td className="text-center">
                    { this.props.task.quy }
                </td>
                <td className="text-center">
                    {this.props.task.thoigian}
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={ this.onSelectedItem }>
                        <span className="fa fa-pencil" data-toggle="tooltip" title="Sửa"></span>
                    </button>
                    <button type="button" className="btn btn-danger" onClick={ this.onDeleteItem }>
                        <span className="fa fa-trash" data-toggle="tooltip" title="Xóa"></span>
                    </button>
                    {/* <button type="button" className="btn btn-primary" >
                        <span className="fa fa-google" data-toggle="tooltip" title="Gửi mail"></span>
                    </button> */}
                    <TaskMail  task = {this.props.task} onSendMail = {this.props.onSendMail}/>

                    
                    <TaskDetail task = {this.props.task} onShowDetail = {this.props.onShowDetail} nhankhau = {this.props.nhankhau}/>
                    
                </td>
                <td className="mr-5" hidden={this.props.hidden}><input type="checkbox" id={this.props.task.id} onChange={this.props.onCheck}/>    &nbsp;   </td>
            </tr>
        );
    }
}

export default TaskItem;
