import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../Home/Navbar'
import { Post_SubGreddiit } from './Post_SubGreddiit'

export const My_SubGreddiit = () => {
    const [subs, setSubs] = useState([])
    const navigate = useNavigate()
    useEffect(() => {

        const getPosts = async () => {
            let url = 'http://localhost:8080/subs/get-sub'
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
                setSubs(response.data)
            }
            catch (e) {
                // nav("/login")
                // axios.post("http://localhost:8080/users/add",input )
                // .then(res=>console.log(res))
            }
        }
        getPosts()
    }, [])

    const handleDelete = async (_id) => {
        let url = `http://localhost:8080/subs/delete-sub`
        const params = new URLSearchParams()
        params.append('reqId', _id)
        let option = {
            method: 'PUT',
            url: url,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data : params
        }
        try {
            let response = await axios(option)
            console.log(response)
  
            if (response.status === 200) {
                alert("Sub Deleted")
            }
            setSubs(response.data)
        }
        catch (e) {
            alert("Sub NOT Deleted")
        }
    }

    
    console.log(subs)
    return (
        <>
            <Navbar />
            <div class="d-grid gap-2 mx-4">
                        <button type="button" class="btn btn-dark my-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Create Subgreddiit
                        </button>
                    </div>
                    {/* <!-- Modal --> */}
                    <div class="modal fade modal-dialog modal-dialog-centered" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Create subGreddiit</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                <Post_SubGreddiit />
                                </div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{window.location.reload()}}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
            {
                subs?.subs?.length > 0 &&
                subs?.subs?.map(({ _id, caption = '', bannedWords = [], image = '', desc = '' }) => {
                    return (
                        <div className="card mb-3 container p-5 d-flex">
                            <img className="card-img-top-thumbnail " src={image} alt="No image provided" />
                            <div className="card-body">
                                
                                <h5 className="card-title">{caption}</h5>
                                <p className="card-text">{desc}</p>
                                <p className="card-text"><small className="text-muted">Banned words : {bannedWords}</small></p>
                                <p className="card-text">{desc}</p>
                                <button type="button" className="btn btn-dark mx-2" onClick={()=>navigate(`/mysub/${_id}`)}>Enter SubGreddiit</button>
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(_id)}>Delete</button>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}
