import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { REGISTER_USER } from '../Queries/queries';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
    const [registerInput, setRegisterInput] = useState({
        username:"",
        email:"",
        password:""
    })
    let navigate = useNavigate();

    const changeHandler = e => {
        const {name, value} = e.target;
        setRegisterInput({
            ...registerInput,
            [name]: value
        })
    }

    const { username, email, password } = registerInput;

    const [ register ] = useMutation(REGISTER_USER)

    const submitHandler = e => {
        e.preventDefault();
        if(!username || !email || !password) {
            alert("Please provide all the data");
            return;
        }
        register({ variables: { username, email, password }});
        setRegisterInput({
            username:"",
            email:"",
            password:""
        })
        navigate("/login");

    }    

    return (
        <div className="register-div">
            <form onSubmit={submitHandler}>
                <h1>Register</h1>
                <input type="text" placeholder="Username" name="username" value={username} onChange={changeHandler} />
                <input type="email" placeholder="Email" name="email" value={email} onChange={changeHandler} />
                <input type="password" placeholder="Password" name="password" value={password} onChange={changeHandler} />
                <button>Register</button>
            </form>
        </div>
    )
}