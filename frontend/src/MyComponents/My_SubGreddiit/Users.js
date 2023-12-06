import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const Users = () => {
  const [user, setUser] = useState([])
  const [userB, setUserB] = useState([])

  const { id } = useParams()

  useEffect(() => {
    const getUser = async () => {
      let url = `http://localhost:8080/subs/get-user?id=${id}`
      let option = {
        method: 'GET',
        url: url,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    }
      try {
        let response = await axios(option)
        setUser(response.data.requ[0].joined)
        setUserB(response.data.requ[0].blocked)
        // console.log(response.data.requ[0].blocked)
      }
      catch (e) {
      }
    }
    getUser()
  }, [])


  // console.log(userB)

  return (
    <div>
      <div className="card text-white bg-dark mb-3">
        <div className="card-header">Joined Users</div>
        {
          user?.length > 0 &&
          user?.map(({ _id ='', fname ='' }) => {
            return (
              <div className="card-body">
                {/* <h5 className="card-title">Dark card title</h5> */}
                <p className="card-text"> Name - {fname} </p>
              </div>
            )
          })
        }
        {
          userB?.length > 0 &&
          userB?.map(({ _id ='', fname ='' }) => {
            return (
              <div className="card-body">
                {/* <h5 className="card-title">Dark card title</h5> */}
                <p className="card-text"> Name - {fname} |||  BLOCKED  |||</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
