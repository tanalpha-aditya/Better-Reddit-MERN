import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const Reports = () => {

  const [reports, setReports] = useState([])
  const { id } = useParams()
  const [count, setCount] = useState(3);
  const [text, setText] = useState("BLOCK");
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  const handleClick = (_id) => {
    if (!intervalId) {
      let currentCount = count;
      const id = setInterval(() => {
        currentCount--;
        if (currentCount >= 0) {
          setText(`Cancel ${currentCount}`);
        }
        if (currentCount === 0) {
          setTimeout(() => {
            // Trigger your function here
            handleBlock(_id)
            setText("Done!");
          }, 1000);
        }
      }, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
      setIntervalId(null);
      setCount(3);
      setText("BLOCK");
    }
  };

  const handleBlock = async (_id) => {
    let url = 'http://localhost:8080/reports/block'
    const params = new URLSearchParams()
    params.append('id', _id)
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
        alert("User BLocked")
      }

      setReports(response.data.report)
      // window.location.reload()
    }
    catch (e) {
      alert("User NOT blocked")
    }
  }

  const handleDelete = async (_id) => {
    let url = 'http://localhost:8080/reports/delete'
    const params = new URLSearchParams()
    params.append('id', _id)
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
        alert("Deleted")
      }
      setReports(response.data.report1)
      // window.location.reload()
    }
    catch (e) {
      alert("Report NOT deleted")
    }
  }

  const handleIgnore = async (_id) => {
    let url = 'http://localhost:8080/reports/ignore'
    const params = new URLSearchParams()
    params.append('id', _id)
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
            alert("Request Ignored")
        }
        setReports(response.data.report1)

    }
    catch (e) {
        alert("Request NOT ignored")
    }
}

  useEffect(() => {
    const getReqs = async () => {
      let url = `http://localhost:8080/reports/get-report?id=${id}`
      let option = {
        method: 'GET',
        url: url,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      }
      try {
        let response = await axios(option)
        setReports(response.data.reports)
        console.log(response)
      }
      catch (e) {
      }
    }
    getReqs()
  }, [])

  console.log(reports)
  return (
    <div>
      <div className="card text-white bg-dark mb-3 ">
        <div className="card-header">Reports</div>
        {
          reports?.length > 0 &&
          reports?.map(({ _id = '', reportedBy = '', reportedPost = '', concern = '', isIgnored = '' }) => {
            return (
              <div className="card-body">
                {/* <h5 className="card-title">Dark card title</h5> */}
                <p className="card-text"> Concern - {concern} </p>
                {
                  reportedBy?.length > 0 &&
                  reportedBy?.map(({ fname = '', lname = '' }) => {
                    return (
                      <p className="card-text"> Reported By - {fname} {lname} </p>
                    )
                  })
                }
                {
                  reportedPost?.length > 0 &&
                  reportedPost?.map(({ text = '', postedBy = '', fname = '', lname = '' }) => {
                    return (
                      <>
                        <p className="card-text"> Reported Text - {text} </p>
                        <p className="card-text"> Report Against - {fname} {lname} </p>
                      </>
                    )
                  })
                }
                <button type="button" className="btn btn-danger mx-2" onClick={() => handleClick(_id)} disabled = {isIgnored} >{text}</button>
                <button type="button" className="btn btn-danger mx-2" onClick={() => handleDelete(_id)} disabled = {isIgnored} >Delete Post</button>
                <button type="button" className="btn btn-warning mx-2" onClick={() => handleIgnore(_id)}>Ignore (lite) </button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
