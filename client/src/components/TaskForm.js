import React, { Component } from 'react';
import "./TaskForm.css";
import {Row} from 'react-bootstrap';
import {Redirect} from "react-router-dom"
class TaskForm extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            id : '',
            title : 'Môi Trường',
            date:1,
            month:1,
            year:2020,
            quy: 1,
            status: 0,
            nhapFailed:false,
            // success:true
        };
    }
 
    componentWillMount() {
        if(this.props.itemEditing && this.props.itemEditing.id !== null){
           var Time =this.props.itemEditing.time;
           var date='',month='',year='';
           var vtri;
        for(var i=0;i<=15;i++)
            {date += Time[i];
            if (Time[i] == "-") {vtri = i;
                break;
            }
            }
        for(var i=vtri+1;i<=15;i++)
            {month += Time[i];
            if (Time[i] == "-") {vtri = i;
                break;
            }
            }
        for(var i=vtri+1;i<=15;i++)
            {year += Time[i];
            if (Time[i] == "-") {vtri = i;
                break;
            }
            }
         
        // this.setState({date:date});
            console.log(this.props.itemEditing.time);
            this.setState({
                id : this.props.itemEditing.id,
                title :this.props.itemEditing.title,
                noiDung: this.props.itemEditing.noiDung,
                date:   parseInt(date),
                month: parseInt(month),
                year:    parseInt(year),
                nguoiPhanAnh: this.props.itemEditing.nguoiPhanAnh,
                status : this.props.itemEditing.status

            });
        }
        else{
            this.onClear();
        }
    }
 
    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.itemEditing){
            this.setState({
                id : nextProps.itemEditing.id,
                title : nextProps.itemEditing.title,
                noiDung : nextProps.itemEditing.noiDung,
                date: nextProps.itemEditing.date,
                month: nextProps.itemEditing.month,
                year: nextProps.itemEditing.year,
                nguoiPhanAnh: nextProps.itemEditing.nguoiPhanAnh,
                status : nextProps.itemEditing.status
            });
        }
        else{
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
        // this.onExitForm();
    }
 
    onClear = () => {
        this.setState({
            id : '',
            title:'',
            noiDung : '',
            status : 0,
            time:'',
            date:'',
            month:'',
            year:'',
            quy:'',
            nguoiPhanAnh:''
        });
    }
 
    onExitForm = () => {
         this.props.onExitForm();
    }
 
    render() {
        // var date=parseInt(this.props.itemEditing.time[0]+this.props.itemEditing.time[1]);
        
        // this.setState({date:date});
        // console.log(this.state.date+1);
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
                    {this.props.nhapFailed ? 
					<div className="alert alert-danger" role="alert">
  						Không được bỏ trống 
					</div> : (this.props.wrongDate ? <div className="alert alert-danger" role="alert">
  						Thời gian không hợp lệ 
					</div> : '')
					}
                    
					{/* {this.props.success ? 
					<div className="alert alert-success" role="alert">
                        Thành công 
						<Redirect to='/home'/>
                        
				  	</div> : ''
					} */}
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
                            value={this.state.title}
                            onChange={this.onHandleChange}
                            name="title"
                        >
                            <option value={'Môi Trường'}>Môi Trường</option>
                            <option value={'An Ninh Trật Tự'}>An Ninh Trật tự</option>
                            <option value={'Văn hóa'}>Văn hóa</option>
                            <option value={'Các loại phí'}>Các loại phí</option>
                            <option value={'Chính sách'}>Chính sách</option>
                            <option value={'Cơ sở vật chất'}>Cơ sở vật chất</option>
                            <option value={'Đất đai'}>Đất đai</option>
                            <option value={'Khác'}>Khác</option>
                        </select><br/>
                        <div>
                            <table className="table">
                        <td>
                        <label>Ngày :</label>
                        <select
                            className="form-control"
                            value={this.state.date}
                            onChange={this.onHandleChange}
                            name="date"
                            style={{height:40,width:70}}
                        >
                            <option value={'1'}>1</option>
                            <option value={'2'}>2</option>
                            <option value={'3'}>3</option>
                            <option value={'4'}>4</option>
                            <option value={'5'}>5</option>
                            <option value={'6'}>6</option>
                            <option value={'7'}>7</option>
                            <option value={'8'}>8</option>
                            <option value={'9'}>9</option>
                            <option value={'10'}>10</option>
                            <option value={'11'}>11</option>
                            <option value={'12'}>12</option>
                            <option value={'13'}>13</option>
                            <option value={'14'}>14</option>
                            <option value={'15'}>15</option>
                            <option value={'16'}>16</option>
                            <option value={'17'}>17</option>
                            <option value={'18'}>18</option>
                            <option value={'19'}>19</option>
                            <option value={'20'}>20</option>
                            <option value={'21'}>21</option>
                            <option value={'22'}>22</option>
                            <option value={'23'}>23</option>
                            <option value={'24'}>24</option>
                            <option value={'25'}>25</option>
                            <option value={'26'}>26</option>
                            <option value={'27'}>27</option>
                            <option value={'28'}>28</option>
                            <option value={'29'}>29</option>
                            <option value={'30'}>30</option>
                            <option value={'31'}>31</option>

                        </select>
                        </td>
                        <td>
                        <label>Tháng:</label>
                        <select
                            className="form-control"
                            value={this.state.month}
                            onChange={this.onHandleChange}
                            name="month"
                            style={{height:40,width:80}}
                        >
                            <option value={'1'}>1</option>
                            <option value={'2'}>2</option>
                            <option value={'3'}>3</option>
                            <option value={'4'}>4</option>
                            <option value={'5'}>5</option>
                            <option value={'6'}>6</option>
                            <option value={'7'}>7</option>
                            <option value={'8'}>8</option>
                            <option value={'9'}>9</option>
                            <option value={'10'}>10</option>
                            <option value={'11'}>11</option>
                            <option value={'12'}>12</option>
                        </select><br/>
                        </td>
                        <td>
                         <label>Năm:</label>
                        <select
                            className="form-control"
                            value={this.state.year}
                            onChange={this.onHandleChange}
                            name="year"
                            style={{height:40,width:120}}
                        >
                            <option value={'2016'}>2016</option>
                            <option value={'2017'}>2017</option>
                            <option value={'2018'}>2018</option>
                            <option value={'2019'}>2019</option>
                            <option value={'2020'}>2020</option>
                            <option value={'2021'}>2021</option>
                            <option value={'2022'}>2022</option>
                            <option value={'2023'}>2023</option>
                            <option value={'2024'}>2024</option>
                            <option value={'2025'}>2025</option>
                            <option value={'2026'}>2026</option>
                        </select>
                        </td>
                        </table>
                        </div>
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