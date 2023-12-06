import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../Home/Navbar";


function Profile() {
    const nav = useNavigate()
    // // const username = JSON.parse(localStorage.getItem("user"))

    const handleLogout = () => {
        localStorage.removeItem("token")
        nav("/login")
    }

    const [info, setInfo] = useState({
        fname: "",
        lname: "",
        age: "",
        email: "",
        number: "",
        follower: [],
        following: []
    })
    const [follower, setFollower] = useState()
    const [following, setFollowing] = useState()

    useEffect(() => {
        async function fetchData() {
            let url = 'http://localhost:8080/users/list'
            let option = {
                method: 'GET',
                url: url,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            }
            try {
                // console.log(option)
                let response = await axios(option)
                let record = response.data
                setInfo({
                    fname: record.fname,
                    lname: record.lname,
                    age: record.age,
                    email: record.email,
                    number: record.number,
                    follower: record.follower,
                    following: record.following
                })
                // console.log(record)
            }
            catch (e) {
                nav("/login")
                // axios.post("http://localhost:8080/users/add",input )
                // .then(res=>console.log(res))
            }
        }
        fetchData()
    }, [])


    useEffect(() => {
        async function fetchData() {
            let url = 'http://localhost:8080/posts/get-follow'
            let option = {
                method: 'GET',
                url: url,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            }
            try {
                // console.log(option)
                let response = await axios(option)
                let record = response.data
                setFollower(record.usera.follower)
                // console.log(record.usera.follower)
            }
            catch (e) {

                // axios.post("http://localhost:8080/users/add",input )
                // .then(res=>console.log(res))
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        async function fetchData() {
            let url = 'http://localhost:8080/posts/get-following'
            let option = {
                method: 'GET',
                url: url,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            }
            try {
                // console.log(option)
                let response = await axios(option)
                let record = response.data
                setFollowing(record.usera.following)
                console.log(record.usera.following)
            }
            catch (e) {

                // axios.post("http://localhost:8080/users/add",input )
                // .then(res=>console.log(res))
            }
        }
        fetchData()
    }, [])

    const handleUnfollow = async (id) => {
        let url = 'http://localhost:8080/posts/unfollow'
        const params = new URLSearchParams()
        console.log(id,"jhfbrrebuwerbgfku")
        params.append('unfollowId', id)
        let option = {
            method: 'PUT',
            url: url,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: params
        }
        try {
            let response = await axios(option)
            if (response.status === 200) {
                alert("user unfollowed")
                // window.location.reload()
            }
        }
        catch (e) {
            alert("User NOT unfollowed")
        }
    }

    const handleRemove = async (id) => {
        let url = 'http://localhost:8080/posts/unfollowing'
        const params = new URLSearchParams()
        params.append('unfollowingId', id)
        let option = {
            method: 'PUT',
            url: url,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: params
        }
        try {
            let response = await axios(option)
            if (response.status === 200) {
                alert("user removed")
                // window.location.reload()
            }
        }
        catch (e) {
            alert("User NOT removed")
        }
    }


    // const user = JSON.parse(localStorage.getItem("user"))    
    return (
        <>
            <Navbar />
            <center>
                <div className="container my-5">
                    <h3>Profile Page</h3>
                    <hr />
                    Name : {info.fname} {info.lname}<hr />
                    Age : {info.age} <hr />
                    <h4>Contact Details</h4>
                    Email : {info.email} <hr />
                    Mobile Number : {info.number}<hr />
                    Followers : {info.follower.length}
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Followers
                        </button>
                        <ul class="dropdown-menu">
                            {
                                follower?.length > 0 &&
                                follower?.map(({ fname = "", _id = "" }) => {
                                    return (
                                        <>
                                            <li>
                                                <a class="dropdown-item">{fname}</a>
                                                <a className="btn btn-primary mx-2" onClick={() => handleRemove(_id)}>Remove</a>
                                            </li>
                                        </>

                                    )
                                })
                            }
                        </ul>
                    </div>
                    <hr />
                    Following : {info.following.length}
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Following
                        </button>
                        <ul class="dropdown-menu">
                            {
                                following?.length > 0 &&
                                following?.map(({ fname = "", _id = ""}) => {
                                    return (<>
                                        <li>
                                            <a class="dropdown-item">{fname}</a>
                                            <a className="btn btn-primary mx-2" onClick={() => handleUnfollow(_id)}>Unfollow</a>
                                        </li>
                                    </>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="my-3 text-center">
                    <button type="button" className="btn btn-primary mx-1" onClick={handleLogout}>
                        Logout
                    </button>
                    <button type="button" className="btn btn-primary mx-1" onClick={() => { nav('/user-update') }}>
                        Edit details
                    </button>
                </div>
            </center>
        </>
    )
}

export default Profile