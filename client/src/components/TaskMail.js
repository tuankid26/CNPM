import React, { Component } from 'react';

class TaskMail extends Component {

    constructor(props) {
        super(props);
        this.state = {};
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
    
    // getTime () {
    //     var date = new Date().getDate(); //Current Date
    //     var month = new Date().getMonth() + 1; //Current Month
    //     var year = new Date().getFullYear(); //Current Year
    //     var hours = new Date().getHours(); //Current Hours
    //     var min = new Date().getMinutes(); //Current Minutes
    //     var sec = new Date().getSeconds(); //Current Seconds
    //     var result= date + '/' + month + '/' + year 
    //   + ' ' + hours + ':' + min + ':' + sec
    //     // this.setState({[time] : result});
    //     return result;
    // }

    render() {
        return (
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-content">
                    <h5 class="modal-title" id="exampleModalLabel">New message</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <form>
                    <div class="form-group">
                        <label for="recipient-name" class="col-form-label">Recipient:</label>
                        <input type="text" class="form-control" id="recipient-name">
                    </div>
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Message:</label>
                        <textarea class="form-control" id="message-text"></textarea>
                    </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Send message</button>
                </div>
                
            </div>
        );
    }
}

export default TaskMail;
