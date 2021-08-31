import { useState,useEffect } from 'react'
import Button from "./Button";

function Register(props) {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[email, setEmail] = useState('');

    const SITE_KEY = "6LcfDsMaAAAAAB96aoYumQ8IGIcITB8nBnjsRf5y";
    useEffect(() => {
        const loadScriptByURL = (id, url, callback) => {
          const isScriptExist = document.getElementById(id);
       
          if (!isScriptExist) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = url;
            script.id = id;
            script.onload = function () {
              if (callback) callback();
            };
            document.body.appendChild(script);
          }
       
          if (isScriptExist && callback) callback();
        }
       
        loadScriptByURL("recaptcha-key", `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`, function () {
          console.log("Script loaded!");
        });
      }, []);


    function Register(e){
        e.preventDefault();

        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(SITE_KEY, { action: 'submit' }).then(token => {
            submitData(token);
          });
        });
    }

    async function submitData(token)
    {
        const data = {username: username, email: email ,password: password, recaptcha: token};
        fetch('http://localhost:3001/users/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        window.location="/login";
    }

    return (
        <>
        <h1>Registracija</h1>
        <form className="form-group" onSubmit={Register}>
            <input type="text" className="form-control" name="username" placeholder="Uporabniško ime" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            <input type="email" className="form-control" name="email" placeholder="E-Poštni Naslov" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <input type="password" className="form-control" name="password" placeholder="Geslo" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <Button text="Registracija"/>
        </form>
        </>
    )
}

export default Register;