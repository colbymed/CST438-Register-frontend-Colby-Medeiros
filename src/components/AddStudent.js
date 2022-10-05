import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Cookies from 'js-cookie';
import { SERVER_URL } from '../constants.js'

class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', email: '' };
    };

    handleChange = (event) => {
        if (event.target.name === 'name') {
            this.setState({ name: event.target.value });
        }
        else {
            this.setState({ email: event.target.value });
        }
    }

    // Save student
    handleAdd = () => {
        if (this.state.name === '' || this.state.email === '') {
            toast.error("Name and Email fields must have values", {
                position: toast.POSITION.BOTTOM_LEFT
            });
        }
        else {
            const token = Cookies.get('XSRF-TOKEN');

            fetch(`${SERVER_URL}/student`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-XSRF-TOKEN': token
                    },
                    body: JSON.stringify({ name: this.state.name, email: this.state.email })
                })
                .then(res => {
                    if (res.ok) {
                        toast.success("Student successfully added", {
                            position: toast.POSITION.BOTTOM_LEFT
                        });
                    } else {
                        toast.error("Student information could not be added", {
                            position: toast.POSITION.BOTTOM_LEFT
                        });
                        console.error('Put http status =' + res.status);
                    }
                })
                .catch(err => {
                    toast.error("Error!", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    console.error(err);
                })
        };
    }

    render() {
        return (
            <div>
                <br />
                <TextField style={{ width: 400 }} autoFocus label="Name" name="name" onChange={this.handleChange} />
                <br />
                <br />
                <TextField style={{ width: 400 }} label="Email" name="email" onChange={this.handleChange} />
                <br />
                <br />
                <Button style={{ width: 200 }} color="secondary" component={Link} to={{ pathname: '/' }} >Cancel</Button>
                <Button style={{ width: 200 }} id="Add" color="primary" onClick={this.handleAdd}>Add</Button>

                <ToastContainer autoClose={1500} />
            </div>
        );
    }
}

export default AddStudent;