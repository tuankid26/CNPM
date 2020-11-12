import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterContent: '',
            filterStatus: -1
        };
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.props.onFilter(name === 'filterContent' ? value : this.state.filterName, name === 'filterStatus' ? value : this.state.filterStatus);
        this.setState({
            [name]: value
        });
    }

    render() {
        var { tasks } = this.props;
        var elmTasks = tasks.map((task, index) => {
            return ( <
                TaskItem key = { task.id }
                task = { task }
                index = { index + 1 }
                onUpdateStatus = { this.props.onUpdateStatus }
                onDeleteTask = { this.props.onDeleteTask }
                onSelectedItem = { this.props.onSelectedItem }
                />
            )
        });
        return ( <
            div className = "row mt-15" >
            <
            div className = "col-xs-12 col-sm-12 col-md-12 col-md-12 col-lg-12" >
            <
            table className = "table table-bordered table-hover" >
            <
            thead >
            <
            tr >
            <
            th className = "text-center" > STT < /th> <
            th className = "text-center" > Nội dung < /th> <
            th className = "text-center" > Trạng thái < /th> <
            th className = "text-center" > Time < /th> <
            th className = "text-center" > Hành động < /th> <
            /tr> <
            /thead> <
            tbody >
            <
            tr >
            <
            td > < /td> <
            td >
            <
            input type = "text"
            className = "form-control"
            name = "filterName"
            onChange = { this.onChange }
            value = { this.state.filerName }
            /> <
            /td> <
            td >
            <
            select className = "form-control"
            name = "filterStatus"
            onChange = { this.onChange }
            value = { this.state.filerName } >
            <
            option value = {-1 } > Tất Cả < /option> <
            option value = { 0 } > Đã xử lý < /option> <
            option value = { 1 } > Chưa xử lý < /option>

            <
            /select> <
            /td> <
            td > < /td> <
            td > < /td> <
            /tr> { elmTasks } <
            /tbody> <
            /table> <
            /div> <
            /div>
        );
    }
}

export default TaskList;