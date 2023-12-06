import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navbar } from '../Home/Navbar'
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';


export const SubGreddiit = () => {
  const [subse, setSubse] = useState([])
  const navigate = useNavigate()
  const [subs, setSubs] = useState([])
  const [subsa, setSubsa] = useState([])
  const [sortCriteria, setSortCriteria] = useState([]);
  const [sort, setSort] = useState("0");
  const [subss, setSubss] = useState([])
  const [searchQuery, setSearchQuery] = useState('');


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

  useEffect(() => {

    const getPosts = async () => {
      let url = 'http://localhost:8080/subs/get-subexcp'
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
        setSubse(response.data)
      }
      catch (e) {
        // nav("/login")
        // axios.post("http://localhost:8080/users/add",input )
        // .then(res=>console.log(res))
      }
    }
    getPosts()
  }, [])

  useEffect(() => {

    const getPosts = async () => {
      let url = 'http://localhost:8080/subs/get-suball'
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
        setSubsa(response.data.subs)
        setSubss(response.data.subs)
        console.log(response.data.subs)
      }
      catch (e) {
        // nav("/login")
        // axios.post("http://localhost:8080/users/add",input )
        // .then(res=>console.log(res))
      }
    }
    getPosts()
  }, [])

  const handleJoin = async (_id) => {
    let url = 'http://localhost:8080/subs/join-req'
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
        alert("Join req sent")
      }
      if (response.status === 204) {
        alert("Already Joined")
      }
      if (response.status === 208) {
        alert("U have left this Sub, Can't join again....cope!!!")
      }
      if (response.status === 212) {
        alert("U have been BLOCKED !!!")
      }
      // set(response.data)
      // window.location.reload()
    }
    catch (e) {
      alert("Join req NOT sent")
    }
  }

  const handleLeave = async (_id) => {
    let url = 'http://localhost:8080/subs/leave-sub'
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
        alert("Left Successfully")
      }
      if (response.status === 204) {
        alert("Not joined yet")
      }
      if (response.status === 208) {
        alert("U cannot leave because you are the moderator")
      }
      // set(response.data)
      // window.location.reload()
    }
    catch (e) {
      alert("Left req NOT sent")
    }
  }

  const handleSortChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(o => o.value)
    setSort("1")
    setSortCriteria(selectedOptions)
  }

  const handleReset = () => {
    setSort("0")
    refreshSubss()
  }

  const handleSearch = () => {
    setSort("2")
    performSearch(searchQuery);
  }

  const refreshSubss = async () => {
    let url = 'http://localhost:8080/subs/get-suball'
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
      // setSubsa(response.data.subs)
      setSubss(response.data.subs)
      console.log(response.data.subs)
    }
    catch (e) {
      // nav("/login")
      // axios.post("http://localhost:8080/users/add",input )
      // .then(res=>console.log(res))
    }
  }

const options = {
  keys: ['caption', 'desc', 'tags'],
  threshold: 0.3
};

const performSearch = async (query) => {
  const fuse = new Fuse(subss, options);
  const result = fuse.search(query);
  setSubss(result);
};

  console.log(sort)
  console.log(subss)

  return (
    <>
      <Navbar />
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <hr />
      <div>
        <div>
          <label>
            Sort by:
            <select multiple={true} value={sortCriteria} onChange={handleSortChange}>
              <option value="nameAsc" >Name (Ascending) </option>
              <option value="nameDesc" >Name (Descending)</option>
              <option value="followersDesc" >Followers (Descending)</option>
              <option value="creationDateNewFirst" >Creation Date (New First)</option>
            </select>
          </label>
        </div>
        <button class="btn btn-danger my-2 py-4 my-sm-0" type="reset" onClick={handleReset}>RESET</button>

        <ul>
          {sort === "1" &&
            subsa.sort((sub1, sub2) => {
              if (sortCriteria.includes('nameAsc')) {
                return sub1.caption.localeCompare(sub2.caption)
              } else if (sortCriteria.includes('nameDesc')) {
                return sub2.caption.localeCompare(sub1.caption)
              } else if (sortCriteria.includes('followersDesc')) {
                return sub2.joined.length - sub1.joined.length
              } else if (sortCriteria.includes('creationDateNewFirst')) {
                return new Date(sub2.createdAt) - new Date(sub1.createdAt)
              } else if (sortCriteria.includes('multipleCriteria')) {
                if (sub1.caption === sub2.caption) {
                  return sub2.joined.length - sub1.joined.length
                } else {
                  return sub1.caption.localeCompare(sub2.caption)
                }
              }
              return 0
            })
              .map(({ _id, caption = '', bannedWords = [], image = '', desc = '' }) => {
                return (
                  <div className="card mb-3 container p-5 cursor-pointer d-flex" onClick={() => navigate(`/user/${_id}`)}>
                    <img className="card-img-top-thumbnail" src={image} alt="No image provided" />
                    <div className="card-body">
                      <h5 className="card-title">{caption}</h5>
                      <p className="card-text">{desc}</p>
                      <p className="card-text"><small className="text-muted">Banned words : {bannedWords}</small></p>
                      <button type="button" className="btn btn-dark mx-2">Enter SubGreddiit</button>
                      <button type="button" className="btn btn-danger" onClick={() => handleLeave(_id)} >Leave</button>
                    </div>
                  </div>
                )
              })}
        </ul>
      </div>
      <hr />
      {
        subss?.length > 0 && sort === "2" &&
        subss?.map(({ item = ''}) => {
          return (
            <div className="card mb-3 container p-5 cursor-pointer d-flex" onClick={() => navigate(`/user/${item._id}`)}>
              <img className="card-img-top-thumbnail" src={item.image} alt="No image provided" />
              <div className="card-body">
                <h5 className="card-title">{item.caption}</h5>
                <p className="card-text">{item.desc}</p>
                <p className="card-text"><small className="text-muted">Banned words : {item.bannedWords}</small></p>
                <button type="button" className="btn btn-dark mx-2">Enter SubGreddiit</button>
                <button type="button" className="btn btn-danger" onClick={() => handleLeave(item._id)} >Leave</button>
              </div>
            </div>
          )
        })
      }
      <>
        {
          subs?.subs?.length > 0 && sort === "0" &&
          subs?.subs?.map(({ _id, caption = '', bannedWords = [], image = '', desc = '' }) => {
            return (
              <div className="card mb-3 container p-5 cursor-pointer d-flex" onClick={() => navigate(`/user/${_id}`)}>
                <img className="card-img-top-thumbnail" src={image} alt="No image provided" />
                <div className="card-body">
                  <h5 className="card-title">{caption}</h5>
                  <p className="card-text">{desc}</p>
                  <p className="card-text"><small className="text-muted">Banned words : {bannedWords}</small></p>
                  <button type="button" className="btn btn-dark mx-2">Enter SubGreddiit</button>
                  <button type="button" className="btn btn-danger" onClick={() => handleLeave(_id)} >Leave</button>
                </div>
              </div>
            )
          })
        }
        {
          subse?.subs?.length > 0 && sort === "0" &&
          subse?.subs?.map(({ _id, caption = '', bannedWords = [], image = '', desc = '' }) => {
            return (
              <div className="card mb-3 container p-5 d-flex" onClick={() => navigate(`/user/${_id}`)}>
                <img className="card-img-top-thumbnail" src={image} alt="No image provided" />
                <div className="card-body">
                  <h5 className="card-title">{caption}</h5>
                  <p className="card-text">{desc}</p>
                  <p className="card-text"><small className="text-muted">Banned words : {bannedWords}</small></p>
                  <button type="button" className="btn btn-dark mx-2" onClick={() => handleJoin(_id)}>Join</button>
                  <button type="button" className="btn btn-danger" onClick={() => handleLeave(_id)} >Leave</button>
                </div>
              </div>
            )
          })
        }
      </>
    </>
  )
}
