import { useState } from 'react'
import Button from "./Button";

function Login(props) {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');

    async function Login(e){
        e.preventDefault();

        const data = {username: username, password: password};
        const res = await fetch('http://localhost:3001/users/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        var loginData = await res.json();
        sessionStorage.setItem("username",loginData.username);
        console.log(sessionStorage.getItem("username"));

        window.location="/";
    }

    return (
        <>
        <h1>Prijava:</h1>
        <form className="form-group" onSubmit={Login}>
            <input type="text" className="form-control" name="username" placeholder="Uporabniško ime" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            <input type="password" className="form-control" name="password" placeholder="Geslo" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <Button text="Prijavi"/>
        </form>
        </>
    )
    //<p>{status}</p>
}

export default Login;