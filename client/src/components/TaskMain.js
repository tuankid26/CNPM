import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskControl from './TaskControl';
import TaskDetail from './TaskDetail';
import TaskMail from './TaskMail';
import './TaskMain.css'
import { Redirect } from 'react-router-dom';
class TaskMain extends Component {
 
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
            sortBy : '',
            sortValue : 1,
            taskID: -1,
            hiddenSelect: true,
            showMergeButton: false,
            mergeIDs: [],
            nhankhau: [],
            nhapFailed:false,
            success:false,
            logout : false,
            wrongDate: false
        };
    }
 
    componentWillMount(props) {
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
        tasks[index].status= tasks[index].status ===1 ? 0 :1;
        
        axios.post(`http://localhost:9000/feedbacks/updateStatus`, tasks[index])
            .then(res => {
                console.log(res);
                console.log(res.data);
                console.log("ok")
             })
                .catch(err => {
                    console.log("fail");
                    console.log(err)})
            // window.location.reload();
        this.setState({
            tasks : tasks
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    checkNamNhuan = (year) => {
        if (year % 400 == 0) return true;
        if (year % 4 == 0 && year % 100 != 0) return true;
        return false;
    }
 
    onSave = (data) => {
        var tasks = this.state.tasks;
        // data.status = data.status === 1 ? 1 : 0;
        // data.nguoiPhanAnh = 1;
        var date = data.date;
        var month = data.month;
        var year =data.year;

        var time='' + month+'-' + date+'-' + year ;
       
        data.time=time;
        if (data.month < 4){
            data.quy = 1;
        }
        else if (data.month < 7){
            data.quy = 2;
        }
        else if (data.month < 10){
            data.quy = 3;
        }
        else {
            data.quy = 4;
        }
        var wrongDate = false;
        if (month == 2){
            if (this.checkNamNhuan(year)){
                if (date > 29) wrongDate = true;
            }
            else{
                if (date > 28) wrongDate = true;
            }
        }
        else if ((month == 4 || month == 6 || month == 9 || month == 11) && date > 30){
            wrongDate = true;
        }


        
        if (data.noiDung === ''  || data.nguoiPhanAnh===''){
            this.setState({nhapFailed: true});
            console.log(this.state.nhapFailed);
        }
        else if (wrongDate)  this.setState({wrongDate: wrongDate});
        else{
            this.setState({
                nhapFailed: false,
                success: true
            });
            // console.log(data.noiDung);
        if(data.id === ''){
            // data.id = this.guid();
            tasks.push(data);
            axios.post(`http://localhost:9000/feedbacks`, data)
            .then(res => {
                console.log(res);
                console.log(res.data);
              
                
                data.id = res.data.id;
                console.log(data);
                window.location.reload();
      
             })
            .catch(err => {
                console.log("fail");
                console.log(err)
            })
        }else{
            var index = this.findIndex(data.id);
            tasks[index] = data;
            console.log(data);
            axios.post(`http://localhost:9000/feedbacks/update`, data)
            .then(res => {
                console.log(res);
                console.log(res.data);
                window.location.reload();
             })
                .catch(err => {
                    console.log("fail");
                    console.log(err)})
            window.location.reload();
        }}
        this.setState({
            tasks : tasks
        });
        
        
       
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
            nhapFailed :false,
            wrongDate: false, 
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
        console.log(id);
        var { tasks } = this.state;
        var index = this.findIndex(id);
        tasks.splice(index, 1);
        this.setState({
            tasks : tasks
        });
        axios.post('http://localhost:9000/feedbacks/delete', {id: id})
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
 
    onFilter = (filterContent,filterName, filterStatus,filterQuy) => {
        this.setState({
            filterContent: filterContent,
            filterName : filterName,
            filterStatus : filterStatus,
            filterQuy: filterQuy
        });
    }
 
    onSelectedItem = (item) => {
        // console.log(item);
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
    onShowDetail = (event) => {
        var id = event.target.id;
        console.log(event.target);
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
    onSendMail = () =>{
        this.setState({
            isDisplayMail: true
        });
    }
 

    onMerge = () => {
        var mergeIDs = this.state.mergeIDs;

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
 
        // window.location.reload();
    }

    onLogout = () => {
        this.setState({logout:true})
        console.log(this.state.logout);
       } 
 
 
    render() {
        var tasks = this.state.tasks;
        console.log(tasks);
        var isDisplayForm = this.state.isDisplayForm;
        var filterName = this.state.filterName;
        var filterStatus = this.state.filterStatus;
        var itemEditing = this.state.itemEditing;
        var sortBy = this.state.sortBy;
        var sortValue = this.state.sortValue;
        var hiddenSelect = this.state.hiddenSelect;
        var showMergeButton = this.state.showMergeButton;
        var nhankhau = this.state.nhankhau;
        var {
            tasks,
            isDisplayForm,
            filterContent,
            filterQuy,
            keyword,
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
 
        tasks = tasks.filter((task) => {
            return task.noiDung.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        if(filterContent){
            // console.log(filterContent);
            tasks = tasks.filter((task) => {
                if(filterContent === '-1' || filterContent === -1){
                    return task;
                }else{
                    console.log(filterContent);
                    
                    if ( parseInt(filterContent, 10) === 1) return task.title === "Môi Trường";
                    if ( parseInt(filterContent, 10) === 2) return task.title === "An Ninh Trật Tự";
                    if ( parseInt(filterContent, 10) === 3) return task.title === "Văn Hóa";
                    if ( parseInt(filterContent, 10) === 4) return task.title === "Các Loại phí";
                    if ( parseInt(filterContent, 10) === 5) return task.title === "Chính sách";
                    if ( parseInt(filterContent, 10) === 6) return task.title === "Cơ sở vật chất";
                    if ( parseInt(filterContent, 10) === 7) return task.title === "Đất đai";
                    if ( parseInt(filterContent, 10) === 8) return task.title === "Khác";
                    // return task.title === "Cơ sở vật chất";
                }
            });
        }
        if(filterName){
            tasks = tasks.filter((task) => {
                return task.noiDung.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
            });
        }
        // if(filterStatus){
        //     tasks = tasks.filter((task) => {
        //         if(filterStatus === '-1' || filterStatus === -1){
        //             return task;
        //         }else{
        //             return task.status === (parseInt(filterStatus, 10) === 1 ? 1 : 0);
        //         }
        //     });
        // }
        if(filterStatus){
            tasks = tasks.filter((task) => {
                if(filterStatus === '-1' || filterStatus === -1){
                    return task;
                }else{
                    return task.status === (parseInt(filterStatus, 10) );
                }
            });
        }
        if(filterQuy){
            tasks = tasks.filter((task) => {
                if(filterQuy === '-1' || filterQuy === -1){
                    return task;
                }else{
                    return task.quy ===  (parseInt(filterQuy, 10));
                }
            });
        }
        if(sortBy === 'title'){
            console.log('title');
            tasks.sort((a, b) => {
                if(a.title > b.title) return sortValue;
                else if(a.title < b.title) return -sortValue;
                else return 0;
            });
        }else if (sortBy === 'status'){
            console.log('else');
            tasks.sort((a, b) => {
                if(a.status > b.status) return -sortValue;
                else if(a.status < b.status) return sortValue;
                else return 0;
            });
        }
        var elmForm = isDisplayForm === true ? <TaskForm
                                                    success={this.state.success}
                                                    nhapFailed={this.state.nhapFailed}
                                                    onSave={this.onSave}
                                                    wrongDate = {this.state.wrongDate}
                                                    onExitForm={this.onExitForm}
                                                    itemEditing={ itemEditing }
                                                    /> : '';
        // var mail = isDisplayMail === true ? <TaskMail
        //                                             onExitMail={this.onExitMail}
        //                                             itemEditing={ itemEditing } 
        //                                             /> : '';
        // console.log(isDisplayForm)

        // var detail = taskID !== -1 ? <TaskDetail task = {tasks[taskID]}/> : '';
        // console.log(detail);
       console.log(this.state.logout);
        return (
            
            <div className="Quanly-block">   
            <div className="container">
            <div>
            {this.state.logout ? <Redirect to='/'/> : ''}
            <button type='button' className="btn btn-info"  style={{marginLeft: 1050 }} onClick={this.onLogout}>
                <span className="	fa fa-sign-out" > Đăng xuất
						</span>   
                </button>
                </div>

                {this.state.logout ? <Redirect to='/' />   : '' }
                <p>{this.props.logout}</p>
                <div className="text-center ">
                    <h1 >Quản Lý Phản Hồi</h1><hr/>
                    {/* <button type='button' className="btn btn-info"  >
                <span className="	fa fa-sign-out" > 
						<Redirect to='/'/>  Đăng xuất
				  </span>   
                </button> */}
                </div>
   
                <div className="row">
                    <div className={ isDisplayForm === true ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '' }>
                        
                        { elmForm }
                    </div>
                    
                    <div className={ isDisplayForm === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
                        <button type="button" className="btn btn-primary" onClick={this.onToggleForm} >
                            <span className="fa fa-plus mr-5"></span>Thêm Phản Hồi
                        </button>
                        <button type="button" className="btn btn-secondary" onClick = {this.onShowSelect}>
                            <span className="fa fa-edit mr-5"></span>Gộp phản hồi
                        </button>
                        <button type="button" className="btn btn-warning" style={{visibility: showMergeButton ? 'visible' :'hidden'}} onClick ={this.onMerge}>
                            <span className="fa fa-check-square-o mr-5"></span>Hoàn thành
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
            </div>
        );
    }
}
 
export default TaskMain;