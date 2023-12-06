import React, { useState } from "react";
// import { BrowserRouter, Routes, Route} from 'react-router-dom'
// import { Profile } from "../Profile/Profile";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


// import { SignUp } from "./SignUp";

export const SignIn = () => {
    // const [username,setUsername] = useState("")
    // const [pass,setPass] = useState("")
    const nav = useNavigate()
    // const submit =(e)=>
    // {
    //     e.preventDefault()
    //     console.log(username, pass)
    //     if(username === "admin" && pass === "admin")
    //     {
    //         console.log("edfsgvgszd")
    //         nav("/profile")
    //     }
    // }
    const [input,setInput] = useState({
        username : "",
        password : "",
    })



    const handleLogin = async (e) =>{
        e.preventDefault()
        localStorage.setItem("user", JSON.stringify(input))
        let url = 'http://localhost:8080/users/login'
        const params = new URLSearchParams()
        params.append('username' , input.username)
        params.append('password' , input.password)
        let option = {
            method : 'POST',
            url : url,
            headers :{

            },
            data : params
        }
        console.log(input)

        try {
            // console.log(option)
            let response = await axios(option)
            console.log(response)
            console.log(response.data.data.message)
            if (response.data.data.message  === 'Login Successfully') {
                alert(response.data.data.message)
                localStorage.setItem('token',response.data.data.token)
                localStorage.setItem("loggedin", true)
                nav("/")

            }
            else{
                alert(response.data.data.message)
            }
        }
        catch(e){
            alert("Error")

        // axios.post("http://localhost:8080/users/add",input )
        // .then(res=>console.log(res))
        }
        // navigate("/profile")
    }


    // const handleLogin = (e) => {
    //     e.preventDefault()
    //     const loggeduser = JSON.parse(localStorage.getItem("user"))
    //     if(loggeduser===null)
    //     {
    //         alert ("No users registered")
    //     }
    //     else if( input.username === loggeduser.username && input.password === loggeduser.password)
    //     {
    //         localStorage.setItem("loggedin", true)
    //         nav("/profile")
    //     }
    //     else
    //     {
    //         alert ("peheli fursat me nikal!!")
    //     }
    // }
    return (
        <div className="container">
            <div className="card mt-4 mx-5">
                <div className="card-body">
                    <h5 className="card-title my-3">Log In</h5>
                    <form onSubmit={handleLogin}>
                        <div className="form-group my-3">
                            <label htmlFor="exampleInputEmail1">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Username"
                                required
                                name="username" 
                                value={input.username} 
                                onChange = {(e)=>setInput({...input,[e.target.name]: e.target.value})}
                            />
                            <small id="emailHelp" className="form-text text-muted">
                                We'll never share your details with anyone else.
                            </small>
                        </div>
                        <div className="form-group ">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                                required
                                name="password" 
                                value={input.password} 
                                onChange = {(e)=>setInput({...input,[e.target.name]: e.target.value})}
                            />
                        </div>
                        <div className="my-3 text-center">
                            <button type="submit" className="btn btn-primary mx-1">
                            Login
                            </button>
                            {/* <button type="submit" className="btn btn-primary mx-1">
                            Not yet registered?
                            </button> */}
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    );
};
