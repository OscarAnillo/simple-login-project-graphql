import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../Queries/queries';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const LoginPage = ({ setCurrentUser }) => {
    const [loginInput, setLoginInput] = useState({
        email:"",
        password:""
    })
    let navigate = useNavigate();

    const changeHandler = e => {
        const {name, value} = e.target;
        setLoginInput({
            ...loginInput,
            [name]: value
        })
    }
    const {email, password} = loginInput;
    const [ login ] = useMutation(LOGIN_USER);

    const onSubmitHandler = e => {
        e.preventDefault();
        if(!email || !password){
            alert("Please provide all the data");
            return
        }
        login({ variables: { email, password }})
            .then((res) => {
            setCurrentUser(res.data.login.username)
            navigate("/");
        })
            .catch((err) => {
            alert(err)
        })
        setLoginInput({
            email: "",
            password: ""
        })

    }

    return (
        <div className='login-div'>
            <form onSubmit={onSubmitHandler}>
                <h1>Login</h1>
                <input type="email" placeholder='Enter your email' name="email" value={email} onChange={changeHandler} />
                <input type="password" placeholder='Password' name='password' value={password} onChange={changeHandler} />
                <button>Login</button>
            </form>
        </div>
    )
}

LoginPage.propTypes = {
    setCurrentUser: PropTypes.func
}