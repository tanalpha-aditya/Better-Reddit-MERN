import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const JoinReq = () => {

  const [req, setReq] = useState([])
  const { id } = useParams()

  // let id  = _id
  // console.log(id)

  useEffect(() => {
    const getReqs = async () => {
      let url = `http://localhost:8080/subs/get-req?id=${id}`
      let option = {
        method: 'GET',
        url: url,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      }
      try {
        let response = await axios(option)
        setReq(response.data.requ.req)
      }
      catch (e) {
      }
    }
    getReqs()
  }, [])
  // console.log(req)

  const handleAccept = async (_id) => {
    let url = `http://localhost:8080/subs/join?id=${id}`
    const params = new URLSearchParams()
    params.append('reqId', _id)
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
        alert("user Joined")
      }
      setReq(response.data.sub.req)
    }
    catch (e) {
      alert("User NOT Joined")
    }
  }

  const handleReject = async (_id) => {
    let url = `http://localhost:8080/subs/reject?id=${id}`
    const params = new URLSearchParams()
    params.append('reqId', _id)
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
        alert("user rejected")
      }
      setReq(response.data.sub.req)
      console.log(response)
    }
    catch (e) {
      console.log(e)
      alert("User NOT Rejected")
    }
  }

  return (
    <div>
      <div className="card text-white bg-dark mb-3">
        <div className="card-header">Join Requests</div>
        {
          req?.length > 0 &&
          req?.map(({ _id = '', fname = '' }) => {
            return (
              <div className="card-body">
                {/* <h5 className="card-title">Dark card title</h5> */}
                <p className="card-text"> Name - {fname} </p>
                <button type="button" className="btn btn-success mx-2" onClick={() => handleAccept(_id)}>Accept</button>
                <button type="button" className="btn btn-danger mx-2" onClick={() => handleReject(_id)}>Reject</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
