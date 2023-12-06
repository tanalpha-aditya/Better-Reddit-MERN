import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const Post = () => {
    const { id } = useParams()
    const [post, setPost] = useState([])
    const [subs, setSubs] = useState([])
    const [input, setInput] = useState({
        text: ""
    })
    const [blocked, setBlocked] = useState([])
    const [postb, setPostb] = useState([])


    useEffect(() => {

        const getSub = async () => {
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
                setSubs(response.data.subs)
                setBlocked(response.data.sub.blocked)
                console.log(response.data.subs.blocked)
            }
            catch (e) {
            }
        }
        getSub()
    }, [])

    useEffect(() => {

        const getPosts = async () => {
            let url = `http://localhost:8080/posts/get-post?id=${id}`
            let option = {
                method: 'GET',
                url: url,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            }
            try {
                let response = await axios(option)
                setPost(response.data)
                // console.log(response)
            }
            catch (e) {
            }
        }
        getPosts()
    }, [])

    const handleFollow = async (e) => {
        e.preventDefault()
        let url = 'http://localhost:8080/posts/follow'
        const params = new URLSearchParams()
        params.append('followId', subs.owner._id)
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
            console.log(response)

            if (response.status === 200) {
                alert("user followed")
            }
            if (response.status === 204) {
                alert("post already followed")
            }
        }
        catch (e) {
            alert("User NOT followed")
        }
    }

    const handleSave = async (_id) => {
        let url = 'http://localhost:8080/posts/saved'
        const params = new URLSearchParams()
        params.append('postId', _id)
        let option = {
            method: 'POST',
            url: url,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data: params
        }
        try {
            let response = await axios(option)
            if (response.status === 200) {
                alert("Post Saved")
            }
        }
        catch (e) {
            alert("Post NOT saved")
        }
    }

    const handleUpvote = async (_id) => {
        let url = 'http://localhost:8080/posts/upvote'
        const params = new URLSearchParams()
        params.append('postId', _id)
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
            console.log(response)

            if (response.status === 200) {
                alert("post upvoted")
            }
            if (response.status === 204) {
                alert("post already upvoted")
            }
            setPost(response.data)
            // window.location.reload()
        }
        catch (e) {
            alert("Post NOT Upvoted")
        }
    }

    const handleDownvote = async (_id) => {
        let url = 'http://localhost:8080/posts/downvote'
        const params = new URLSearchParams()
        params.append('postId', _id)
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
            console.log(response)

            if (response.status === 200) {
                alert("post Downvoted")
            }
            if (response.status === 204) {
                alert("post already Downvoted")
            }
            setPost(response.data)
            // window.location.reload()
        }
        catch (e) {
            alert("Post NOT Downvoted")
        }
    }

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
                setSubs(response.data.subs.owner._id)
            }
            catch (e) {
            }
        }
        getPosts()
    }, [])

    const handleComment = async (_id) => {
        let url = 'http://localhost:8080/posts/add-comment'
        const params = new URLSearchParams()
        params.append('text', input.text)
        params.append('postedIn', _id)

        let option = {
            method: 'PUT',
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
            // console.log(response)
            if (response.status === 200) {
                alert("Comment Created")
            }
            if (response.status === 204) {
                alert("Banned words")
              }
            window.location.reload()
            // setPost(response.data)

        }
        catch (e) {
            console.log(e)
            console.log( "dfehfbefbewf")
            alert("Comment NOT created")
        }
    }

    const handleReport = async (_id) => {
        let url = `http://localhost:8080/reports/add-report`
        const params = new URLSearchParams()
        params.append('concern', input.concern)
        params.append('reportedPost', _id)
        params.append('id', id)
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
            // console.log(response)
            if (response.status === 200) {
                alert("Reported")
            }
        }
        catch (e) {
            alert("Not Reported")
        }
    }

    return (
        <>{
            post?.posts?.length > 0 &&
            post?.posts?.map(({ _id = '', text = '', downvotes = '', upvotes = '', Comment = '' }) => {
                return (
                    <div className="card my-4">
                        <div className="card-body">
                            <h5 className="card-title">Post</h5>
                            <p className="card-text">{text}</p>
                            <p className="card-text">Upvotes : {upvotes.length}  Downvotes : {downvotes.length}</p>
                            <a className="btn btn-primary mx-2" onClick={(e) => handleFollow(e)}>Follow</a>
                            handleCheck(_id)
                            <button type="button" class="btn btn-outline-warning mx-2" onClick={() => handleSave(_id)} > Save Post</button>
                            <button type="button" class="btn btn-outline-success mx-2" onClick={() => handleUpvote(_id)} > Upvote</button>
                            <button type="button" class="btn btn-outline-danger mx-2" onClick={() => handleDownvote(_id)} > Downvote</button>
                            <hr />
                            <div className="row">
                                <div className="col-5">
                                    <div class="mb-3">
                                        <label for="exampleFormControlTextarea1" class="form-label">Comment</label>
                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="text"
                                            value={input.text} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}></textarea>
                                    </div>
                                    <button type="button" class="btn btn-outline-warning mx-2" onClick={() => handleComment(_id)} >Comment</button>
                                </div>
                                <div className="col-5">
                                    <div class="mb-3">
                                        <label for="exampleFormControlTextarea1" class="form-label">Report Concern</label>
                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="concern"
                                            value={input.concern} onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}></textarea>
                                    </div>
                                    <button type="button" class="btn btn-outline-danger mx-2" onClick={() => handleReport(_id)} >Report</button>
                                </div>
                            </div>

                            {
                                Comment?.length > 0 &&
                                Comment?.map(({ text = '', postedBy = '' }) => {
                                    return (<div className='card my-2'>
                                        <p className="card-text">Comment : {text}</p>
                                        <p className="card-text">By : {postedBy}</p>
                                    </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            })
        }
        </>
    )
}
