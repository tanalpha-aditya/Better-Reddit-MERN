import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Navbar } from "../Home/Navbar";

export const SavedPosts = () => {

  const [post, setPost] = useState([])
  const [subs, setSubs] = useState([])
  const [isFollowed, setIsFollowed] = useState(false)
  
  useEffect(() => {

    const getPosts = async () => {
        let url = `http://localhost:8080/posts/get-savedPost`
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
            console.log(response)
        }
        catch (e) {
        }
    }
    getPosts()
}, [])

const handleUnsave = async (_id) => {
  let url = 'http://localhost:8080/posts/savedDelete'
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
          alert("Post Unsaved")
          window.location.reload()
      }
  }
  catch (e) {
      alert("Post NOT Unsaved")
  }
}
  return (
    <div>
      <Navbar/>
      {

      post?.posts?.length > 0 &&
      post?.posts?.map(({ _id = '',text = '' }) => {
          return (
              <div className="card">
                  <div className="card-body">
                      <h5 className="card-title">Post</h5>
                      <p className="card-text">{text}</p>
                      {/* {
                          !isFollowed ?
                          <a className="btn btn-primary" onClick={(e) => handleFollow(e)}>Follow</a>
                          :
                          <a className="btn btn-primary" onClick={(e) => handleUnfollow(e)}>Unfollow</a>
                      } */}
                      <button type="button" class="btn btn-outline-warning mx-2" onClick={() => handleUnsave(_id)} > Unsave </button>
                  </div>
              </div>
          )
      })
  }
  </div>
  )
}
