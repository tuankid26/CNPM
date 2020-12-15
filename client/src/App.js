import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskDetail from './components/TaskDetail';
import TaskMail from './components/TaskMail';
class App extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            tasks : [],
            taskID : "-1",
            isDisplayForm : false,
            isDisplayMail: false,
            keyword : '',
            filterContent : '',
            filterName : '',
            filterStatus : '-1',
            itemEditing : null,
            sortBy : 'name',
            sortValue : 1,
            taskID: -1,
            hiddenSelect: true,
            showMergeButton: false,
            mergeIDs: [],
            nguoiPhanAnh: []
        };
    }
 
    componentWillMount() {
        // if(localStorage && localStorage.getItem('tasks')){
        //     var tasks = JSON.parse(localStorage.getItem('tasks'));
        axios.get(`http://localhost:9000/feedbacks`)
        .then(res => {
          const tasks = res.data;
          this.setState({ tasks :tasks  });
        })
        .catch(error => console.log(error));
    
  
   
        // this.setState({
        //         tasks : tasks
        //     });
        // }
    }

    componentWillSend(){
        const mailObject = {
            content: this.state.content,
            email: this.state.email,
            title: this.state.title
        };       

        axios.post('http://localhost:9000/send', mailObject)
        .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
        });
    }
 
    s4() {
        return  Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
 
    guid() {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
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
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
 
    onSave = (data) => {
        // var tasks = this.state.tasks;
        // data.status = data.status === 'true' ? true : false;
        // if(data.id === ''){
        //     data.id = this.guid();
        //     tasks.push(data);
        // }else{
        //     var index = this.findIndex(data.id);
        //     tasks[index] = data;
        // }
        // this.setState({
        //     tasks : tasks
        // });
        // localStorage.setItem('tasks', JSON.stringify(tasks));
        var tasks = this.state.tasks;
        // data.status = data.status === 1 ? 1 : 0;
        // data.nguoiPhanAnh = 1;
        if(data.id === ''){
            // data.id = this.guid();
            tasks.push(data);
            axios.post("http://localhost:9000/feedbacks", data)
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
            axios.post("http://localhost:9000/feedbacks/update", data)
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
        
        
        //   axios.post(http://localhost:9000/feedbacks, test)
        //     .then(res => {
        //     console.log(res);
        //     console.log(res.data);
      
        //      })
        //         .catch(err => {
        //             console.log("fail");
        //             console.log(err)})
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onShowSelect = () => {
        this.setState({
            hiddenSelect: false
        });
    }
 
    onCheck = (event) => {
        var mergeIDs = this.state.mergeIDs;
        var id = event.target.id;
        console.log(id);
        var checked = event.target.checked;
        if (checked) {
            mergeIDs.push(id);
        }
        else {
            var index = mergeIDs.indexOf(id);
            mergeIDs.splice(index, 1);
        }
        this.setState({
            showMergeButton : mergeIDs.length > 1 ? true : false,
            mergeIDs: mergeIDs
        });
    }
    onShowDetail = (event) => {
        var id = event.target.id;
        console.log(id);
        console.log('http://localhost:9000/feedbacks/search?id=' + id)
        axios.get('http://localhost:9000/feedbacks/search?id=' + id)
        .then(res => {
            console.log(res);
            const nhankhau = res.data;
            var tmp = []
            nhankhau.forEach(person => tmp.push(person.hoten));    
            this.setState({ nhankhau :tmp });
        })
        .catch(error => console.log(error));
    }





    onSend = (data) => {
        var tasks = this.state.tasks
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

    onExitMail = () =>{
        this.setState({
            isDisplayMail: false,
            itemEditing : null
        })
    }
 
    onDeleteTask = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        tasks.splice(index, 1);
        this.setState({
            tasks : tasks
        });
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
    onSendMail = () =>{
        this.setState({
            isDisplayMail: true
        });
    }
 

    onMerge = () => {
        var mergeIDs = this.state.mergeIDs;
        var ids = ''; 
        const params = new URLSearchParams();
        params.append('id', mergeIDs);
        for (let i = 0; i < mergeIDs.length; i++) {
            if (i != mergeIDs.length - 1){
                ids += 'id[]=' + mergeIDs[i] + '&';
            }
            else {
                ids += 'id[]=' + mergeIDs[i];
            }
 
        }
        console.log(mergeIDs);
        var url = 'http://localhost:9000/feedbacks/merge';
        
        axios.post(url, {id : mergeIDs})
        .then(res => {
            console.log('success');
            console.log(res);
        })
        .catch(error => {
            console.log('error occured')
            console.log(error);
        }); 
 
 
        this.setState({
            showMergeButton : false,
            hiddenSelect: true,
            mergeIDs: [],
        });
 
        window.location.reload();
 
    }

 
 
    render() {
        var {
            tasks,
            isDisplayForm,
            isDisplayMail,
            // keyword,
            filterName,
            filterStatus,
            itemEditing,
            sortBy,
            sortValue,
            taskID,
            hiddenSelect,
            showMergeButton,
            nhankhau
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
        var mail = isDisplayMail === true ? <TaskMail
                                                    onExitMail={this.onExitMail}
                                                    itemEditing={ itemEditing } 
                                                    /> : '';


        var detail = taskID !== -1 ? <TaskDetail task = {tasks[taskID]}/> : '';
        console.log(detail);
        return (
            
            <div className="container">
                <div className="text-center">
                    <h1 >Quản Lý Phản Hồi</h1><hr/>
                </div>
                {}
                <div className="row">
                    <div className={ isDisplayForm === true ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '' }>
                        
                        { elmForm }
                    </div>
                    {detail}
                    {mail}
                    
                    <div className={ isDisplayForm === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
                        <button type="button" className="btn btn-primary" onClick={this.onToggleForm} >
                            <span className="fa fa-plus mr-5"></span>Thêm Phản Hồi
                        </button>
                        <button type="button" className="btn btn-primary" onClick = {this.onShowSelect}>
                        
                            <span className="fa fa-plus mr-5"></span>Gộp phản hồi
                            
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
                            onShowDetail =  {this.onShowDetail}
                            onSendMail = {this.onSendMail}
                            hidden = {hiddenSelect}
                            onCheck = {this.onCheck}
                            nhankhau = {nhankhau}
 
                        />
                    </div>
                </div>
                
            </div>
        );
    }
}
 
export default App;