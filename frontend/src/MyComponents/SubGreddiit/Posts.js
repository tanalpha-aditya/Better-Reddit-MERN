import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navbar } from '../Home/Navbar'
import { useNavigate, useParams } from 'react-router-dom';
import { Post } from './Post';

export const Posts = () => {
    const [subs, setSubs] = useState([])
    const [input, setInput] = useState({
        text: ""
    })
    // const [user, setUser] = useState([])
    const navigate = useNavigate()
    const { id } = useParams()
    localStorage.setItem("subID", JSON.stringify(id))
    useEffect(() => {

        const getPosts = async () => {
            let url = `http://localhost:8080/subs/get-subOne?id=${id}`
            let option = {
                method: 'GET',
                url: url,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            }
            try {
                let response = await axios(option)
                console.log(response,"<<<<>>>>")
                setSubs(response.data.subs)
            }
            catch (e) {
            }
        }
        getPosts()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let url = 'http://localhost:8080/posts/add-post'
        const params = new URLSearchParams()
        console.log(input.text , "iughiurtgiu")
        params.append('text', input.text)
        params.append('postedIn', id)

        let option = {
            method: 'POST',
            url: url,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: params
        }
        // console.log(data)

        try {
            // console.log(option)
            let response = await axios(option)
            console.log(response)
            if (response.status === 200) {
                alert("Post Created")
            }
            if (response.status === 204) {
                alert("Not Joined, Cannot post")
            }
        }
        catch (e) {
            alert("Post NOT created")
        }
    }

    return (
        <>
            <Navbar />
            <div className="row">
                <div className="col-4">
                    <div className="card mb-3">
                        <img className="card-img-top" src={subs.image} alt="No image provided" />
                        <div className="card-body">
                            <h5 className="card-title">{subs.caption}</h5>
                            <p className="card-text">{subs.desc}</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <p><h3><center>You wont be able to post if you are NOT joined</center></h3></p>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        {/* <!-- Button trigger modal --> */}
                        <div className="d-grid gap-4 mx-4">
                            <button type="button" className="btn btn-dark my-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Create Post
                            </button>
                        </div>
                        {/* <!-- Modal --> */}
                        <div className="modal fade modal-dialog modal-dialog-centered" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Create a new post</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Post</label>
                                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="text"
                                                value={input.text} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}></textarea>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary" onClick={()=>{window.location.reload()}}>Create Post</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <Post />
                </div>
            </div>
        </>
    )
}
