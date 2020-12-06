import React, { Component } from 'react';

class TaskItem extends Component {

    showStatusElement(){
        return (
            <span
                className={ this.props.task.status ? 'label label-danger' : 'label label-info' }
                onClick={ this.onUpdateStatus }
            >{ this.props.task.status === true ? 'Chưa xử lý' : 'Đã xử lý' }</span>
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

    render() {
        return (
            <tr>
                <td>{ this.props.index }</td>
                <td>{ this.props.task.content }</td>
                <td>{ this.props.task.name }</td>
                <td className="text-center">
                    { this.showStatusElement() }
                </td>
                <td className="text-center">
                    { this.props.task.month }
                </td>
                <td className="text-center">
                    {Date()}
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={ this.onSelectedItem }>
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>
                    <button type="button" className="btn btn-danger" onClick={ this.onDeleteItem }>
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                    <button type="button" className="btn btn-primary" >
                        <span className="fa fa-google mr-5"></span>Gửi Mail
                    </button>
                </td>
                <td>
                     <input checked="checked" name="gop" type="checkbox" />
                </td>
            </tr>
        );
    }
}

export default TaskItem;
