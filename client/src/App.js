import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
// import TaskDetail from './components/TaskDetail';
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks : [],
            taskID : "-1",
            isDisplayForm : false,
            keyword : '',
            filterContent : '',
            filterName : '',
            filterStatus : '-1',
            itemEditing : null,
            sortBy : 'name',
            sortValue : 1
        };
    }

    componentWillMount() {
        // if(localStorage && localStorage.getItem('tasks')){
        //     var tasks = JSON.parse(localStorage.getItem('tasks'));
        axios.get(`http://localhost:9000/feedbacks`)
        .then(res => {
          const tasks = res.data;
          this.setState({ tasks :tasks });
        })
        .catch(error => console.log(error));
    
  
   
        // this.setState({
        //         tasks : tasks
        //     });
        // }
    }


    findIndex = (id) => {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if(task.id === id){
                result = index;
            }
        });
        return result;
    }

    onUpdateStatus = (id) => {
        var tasks = this.state.tasks;
        var index = this.findIndex(id);
        tasks[index].status = !tasks[index].status;
        this.setState({
            tasks : tasks
        });
        // const test = {"id":10,"tieude":null,"noiDung":"nhà văn hóa ồn ào","quy":null,"time":"2020-10-10T00:00:00.000Z","status":"Đã xử lý","nguoiPhanAnh":5}
        // axios.post(`http://localhost:9000/feedbacks`, {test })
        // .then(res => {
        //   console.log(res);
        //   console.log(res.data);
        // })
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onSave = (data) => {
        var tasks = this.state.tasks;
        // data.status = data.status === 1 ? 1 : 0;
        data.nguoiPhanAnh = 1;
        var date = new Date().getDate();
        var month = new Date().getMonth()+1;
        var year = new Date().getFullYear();

        var time='' + month+'/' + date+'/' + year ;
        data.time=time;
        console.log(data.time);
        
        if(data.id === ''){
            // data.id = this.guid();
            tasks.push(data);
            axios.post(`http://localhost:9000/feedbacks`, data)
            .then(res => {
            console.log(res);
            console.log(res.data);
      
             })
                .catch(err => {
                    console.log("fail");
                    console.log(err)})
        }else{
            var index = this.findIndex(data.id);
            tasks[index] = data;
            axios.post(`http://localhost:9000/feedbacks/${index}`, data)
            .then(res => {
            console.log(res);
            console.log(res.data);
      
             })
                .catch(err => {
                    console.log("fail");
                    console.log(err)})
        }
        this.setState({
            tasks : tasks
        });
        
        
        //   axios.post(`http://localhost:9000/feedbacks`, test)
        //     .then(res => {
        //     console.log(res);
        //     console.log(res.data);
      
        //      })
        //         .catch(err => {
        //             console.log("fail");
        //             console.log(err)})
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onToggleForm = () => {
        if(this.state.itemEditing !== null){
            this.setState({
                itemEditing : null
            });
        }else{
            this.setState({
                isDisplayForm : !this.state.isDisplayForm
            });
        }
    }

    onExitForm = () =>{
        this.setState({
            isDisplayForm : false,
            itemEditing : null
        });
    }

    onDeleteTask = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        tasks.splice(index, 1);
        this.setState({
            tasks : tasks
        });
        axios.delete(`http://localhost:9000/feedbacks/${id}`)
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.onExitForm();
    }

    onSearch = (keyword) => {
        this.setState({
            keyword : keyword
        });
    }

    onFilter = (filterContent,filterName, filterStatus) => {
        this.setState({
            filterContent:filterContent,
            filterName : filterName,
            filterStatus : filterStatus
        });
    }

    onSelectedItem = (item) => {
        this.setState({
            itemEditing : item,
            isDisplayForm : true
        })
    }

    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy : sortBy,
            sortValue : sortValue
        })
    }
    onShowDetail = (id) => {
        var index = this.findIndex(id);
        console.log(index);
        this.setState({
            taskID: index
        });
    }

    render() {
        var {
            tasks,
            isDisplayForm,
            // keyword,
             filterName,
            filterStatus,
            itemEditing,
            sortBy,
            sortValue,
            // taskID
        } = this.state;

        // tasks = tasks.filter((task) => {
        //     return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        // });
        
        if(filterName){
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
            });
        }
        if(filterStatus){
            tasks = tasks.filter((task) => {
                if(filterStatus === '-1' || filterStatus === -1){
                    return task;
                }else{
                    return task.status === (parseInt(filterStatus, 10) === 1 ? true : false);
                }
            });
        }
        if(sortBy === 'name'){
            tasks.sort((a, b) => {
                if(a.name > b.name) return sortValue;
                else if(a.name < b.name) return -sortValue;
                else return 0;
            });
        }else{
            tasks.sort((a, b) => {
                if(a.status > b.status) return -sortValue;
                else if(a.status < b.status) return sortValue;
                else return 0;
            });
        }
        var elmForm = isDisplayForm === true ? <TaskForm
                                                    onSave={this.onSave}
                                                    onExitForm={this.onExitForm}
                                                    itemEditing={ itemEditing }
                                                    /> : '';
                                                
        // var detail = taskID !== -1 ? <TaskDetail task = {tasks[taskID]}/> : '';
        return (
            <div className="container">
                <div className="text-center">
                    <h1 >Quản Lý Phản Hồi</h1><hr/>
                </div>
                {/* {detail} */}
                <div className="row">
                    <div className={ isDisplayForm === true ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '' }>
                        { elmForm }
                    </div>
                    <div className={ isDisplayForm === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
                        <button type="button" className="btn btn-primary" onClick={this.onToggleForm} >
                            <span className="fa fa-plus mr-5"></span>Thêm Phản Hồi
                        </button>
                        <TaskControl
                            onSearch={this.onSearch}
                            onSort={this.onSort}
                            sortBy={sortBy}
                            sortValue={sortValue}
                        />
                        <TaskList
                            tasks={tasks}
                            onUpdateStatus={this.onUpdateStatus}
                            onDeleteTask={this.onDeleteTask}
                            filterName={filterName}
                            filterStatus={filterStatus}
                            onFilter={this.onFilter}
                            onSelectedItem={this.onSelectedItem}
                            onShowDetail={this.onShowDetail}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
