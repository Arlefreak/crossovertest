import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

let AddTodo = ({ dispatch }) => {
    let firstName;
    let lastName;
    let email;
    let phone;
    let bloodType;
    let ip = '111';
    let location = [0,0];

    return (
        <div className="register">
            <form>
                <h2>Register</h2>
                <input 
                    type="text"
                    name="first-name"
                    autoComplete="first-name"
                    placeholder="Name"
                    autofocus
                    required
                    ref={ node => {
                        firstName = node;
                    }}
                />
                <input 
                    type="text"
                    name="last-name"
                    autoComplete="last-name"
                    placeholder="Last name"
                    required
                    ref={ node => {
                        lastName = node;
                    }}
                />
                <input 
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="email"
                    required
                    ref={ node => {
                        email = node;
                    }}
                />
                <input
                    className="mid"
                    type="tel"
                    pattern="[0-9]{10}"
                    name="tel"
                    autoComplete="tel"
                    placeholder="tel"
                    required
                    ref={ node => {
                        phone = node;
                    }}
                />
                <input
                    className="mid"
                    type="text"
                    name="bloodType"
                    placeholder="bloodType"
                    required
                    ref={ node => {
                        bloodType = node;
                    }}
                />
                <input
                    onClick={() => {
                        console.log('cancel');
                        firstName.value = '';
                        lastName.value = '';
                        email.value = '';
                        phone.value = '';
                        bloodType.value = '';
                    }}
                    className="button cancel mid"
                    type="button"
                    name="cancel"
                    value="cancel"
                ></input>
                <input
                    onClick={() => {
                        console.log('register');
                        dispatch(addTodo(
                            firstName.value,
                            lastName.value,
                            email.value,
                            phone.value,
                            bloodType.value,
                            ip,
                            location
                        ));
                        firstName.value = '';
                        lastName.value = '';
                        email.value = '';
                        phone.value = '';
                        bloodType.value = '';
                    }}
                    className="button submit mid"
                    type="button"
                    name="register"
                    value="register"
                ></input>
            </form>
        </div>
    );
};
AddTodo = connect()(AddTodo);

export default AddTodo;
