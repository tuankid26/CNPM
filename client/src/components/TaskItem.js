import React, { Component } from 'react';

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
        this.props.onSelectedItem(this.props.task);
    }
    onShowDetail = () => {
        this.props.onShowDetail(this.props.task.id);
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
                        <span className="fa fa-pencil mr-5"></span>
                    </button>
                    <button type="button" className="btn btn-danger" onClick={ this.onDeleteItem }>
                        <span className="fa fa-trash mr-5"></span>
                    </button>
                    <button type="button" className="btn btn-primary" >
                        <span className="fa fa-google mr-5"></span>
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
