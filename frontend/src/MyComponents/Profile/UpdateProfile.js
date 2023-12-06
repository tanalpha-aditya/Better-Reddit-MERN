import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Navbar } from '../Home/Navbar';


export const UpdateProfile = () => {

    const nav = useNavigate()
    const [input, setInput] = useState({
        fname: "",
        lname: "",
        number: "",
    })
    // to store value in local storage

    const handleSubmit = async (e) => {
        e.preventDefault()
        localStorage.setItem("user", JSON.stringify(input))
        let url = 'http://localhost:8080/users/user-update'
        const params = new URLSearchParams()
        params.append('fname', input.fname)
        params.append('lname', input.lname)
        params.append('number', input.number)

        let option = {
            method: 'POST',
            url: url,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: params
        }
        console.log(params)

        try {
            console.log(option)
            let response = await axios(option)
            console.log(response)
            if (response.status === 200) {
                alert("Profile Updated")
                nav('/profile')
            }
        }
        catch (e) {
            alert("User NOT updated")

            // axios.post("http://localhost:8080/users/add",input )
            // .then(res=>console.log(res))
        }
        // navigate("/profile")
    }




    return (
    <>
    <Navbar/>
    <div className='row container-height'>
            <div className='col-lg-6 col-md-6 m-auto'>
                <div className='container'>
                    <h1 className='text-center'>Update Profile</h1>
                    <form onSubmit={handleSubmit}  method='post'>
                        <fieldset>
                            <div className='form-group'>
                                <label htmlFor='exampleInputEmail1'>First Name</label>
                                <input
                                    type='text' className='form-control' id='exampleInputEmail1'
                                    aria-describedby='emailHelp' placeholder='Enter Name'
                                    name="fname"
                                    value={input.fname}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='exampleInputEmail1'>Last Name</label>
                                <input
                                    type='text' className='form-control' id='exampleInputEmail1'
                                    aria-describedby='emailHelp' placeholder='Enter Name'
                                    name="lname"
                                    value={input.lname}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='exampleInputEmail12'>Phone number</label>
                                <input
                                    type='text' className='form-control' id='exampleInputEmail12'
                                    aria-describedby='emailHelp' placeholder='Enter Number'
                                    name="number"
                                    value={input.number}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                />
                            </div>
                            <button type='submit' className='btn btn-primary m-auto' >Update your profile</button>
                        </fieldset>
                    </form>
                </div>
            </div>

        </div>
    </>
        
    )
}
