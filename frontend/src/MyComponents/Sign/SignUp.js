import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const SignUp = () => {
    // const navigate = useNavigate()
    const [input, setInput] = useState({
        fname: "",
        lname: "",
        email: "",
        age: "",
        number: "",
        username: "",
        password: "",
    })
    function refreshPage() {
        window.location.reload();
    }
    // to store value in local storage

    const handleSubmit = async (e) => {
        e.preventDefault()
        localStorage.setItem("user", JSON.stringify(input))
        let url = 'http://localhost:8080/users/add'
        const params = new URLSearchParams()
        params.append('fname', input.fname)
        params.append('lname', input.lname)
        params.append('username', input.username)
        params.append('age', input.age)
        params.append('password', input.password)
        params.append('number', input.number)
        params.append('email', input.email)

        let option = {
            method: 'POST',
            url: url,
            headers: {

            },
            data: params
        }
        // console.log(data)

        try {
            // console.log(option)
            let response = await axios(option)
            // console.log(response)
            if (response.status === 200) {
                alert("User now registered, proceed to Login")
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }

        }
        catch (e) {
            alert("User NOT registered")

            // axios.post("http://localhost:8080/users/add",input )
            // .then(res=>console.log(res))
        }
        // navigate("/profile")
    }


    return (

        <div className="container">
            <div className="card mt-4">

                <div className="card-body">
                    <h5 className="card-title my-3">SignUp</h5>
                    <form onSubmit={handleSubmit} method='post'>
                        <div className="row g-3">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="First name" aria-label="First name" required name="fname" value={input.fname} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Last name" aria-label="Last name" required name="lname" value={input.lname} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} />
                            </div>
                        </div>
                        <div className="mb-3 my-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" placeholder="Email Address" className="form-control" required id="exampleInputEmail2" aria-describedby="emailHelp" name="email" value={input.email} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="row g-3">
                            <div className="col">
                                <label htmlFor="exampleInputEmail2">Age</label>
                                <input type="number" required className="form-control" placeholder="Age" aria-label="Age" name="age" value={input.age} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} />
                            </div>
                            <div className="col">
                                <label htmlFor="exampleInputEmail1">Mobile No.</label>
                                <input type="number" required className="form-control" placeholder="Mobile No." aria-label="Mobile No." name="number" value={input.number} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} />
                            </div>
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="exampleInputEmail3">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail3"
                                aria-describedby="emailHelp"
                                placeholder="Username"
                                required
                                name="username"
                                value={input.username}
                                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className="form-group ">
                            <label htmlFor="exampleInputPassword2">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword2"
                                placeholder="Password"
                                required
                                name="password"
                                value={input.password}
                                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} />
                        </div>
                        <div className="my-3 text-center">
                            <button type="submit" className="btn btn-primary mx-1" >
                                Register
                            </button>
                            {/* <button type="submit" className="btn btn-primary mx-1">
                                    Already our member?
                                </button> */}
                        </div>

                    </form>
                </div>
            </div>
        </div>

    )
}
