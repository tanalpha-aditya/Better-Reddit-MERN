import { upload } from '@testing-library/user-event/dist/upload'
import axios from 'axios'
import React, { useState } from 'react'
import { Navbar } from '../Home/Navbar'
import './tags.css'

export const Post_SubGreddiit = () => {

  const [data, setData] = useState({
    caption: "",
    desc: "",
    img: "",
    // tagsdata:[],
    // bannedWords:[]
  })
  const [url, setUrl] = useState('')

  // for tags 
  const [input, setInput] = useState('');
  const [tags, setTags] = useState([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };
  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (key === ',' && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      setTags(prevState => [...prevState, trimmedInput]);
      setInput('');
    }

    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag);
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  }
  const deleteTag = (index) => {
    setTags(prevState => prevState.filter((tag, i) => i !== index))
  }



  // for banned words
  const [inputb, setInputb] = useState('');
  const [tagsb, setTagsb] = useState([]);
  const [isKeyReleasedb, setIsKeyReleasedb] = useState(false);
  const onChangeb = (e) => {
    const { value } = e.target;
    setInputb(value);
  };
  const onKeyDownb = (e) => {
    const { key } = e;
    const trimmedInputb = inputb.trim();

    if (key === ',' && trimmedInputb.length && !tagsb.includes(trimmedInputb)) {
      e.preventDefault();
      setTagsb(prevState => [...prevState, trimmedInputb]);
      setInputb('');
    }

    if (key === "Backspace" && !inputb.length && tagsb.length && isKeyReleasedb) {
      const tagsCopyb = [...tagsb];
      const poppedTagb = tagsCopyb.pop();
      e.preventDefault();
      setTagsb(tagsCopyb);
      setInputb(poppedTagb);
    }

    setIsKeyReleasedb(false);
  };

  const onKeyUpb = () => {
    setIsKeyReleasedb(true);
  }
  const deleteTagb = (indexb) => {
    setTagsb(prevState => prevState.filter((tagb, i) => i !== indexb))
  }





  const uploadImage = async () => {
    const formData = new FormData()
    formData.append('file', data.img)
    formData.append('upload_preset', 'Greddiiit_Post')
    formData.append('cloud_name', 'dj85m4yf6')

    const res = await fetch('https://api.cloudinary.com/v1_1/dj85m4yf6/upload', {
      method: 'POST',
      body: formData
    })
    if (res.status === 200) {
      return await res.json()
    } else {
      return "Error"
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { secure_url } = await uploadImage()
    setUrl(secure_url)
    console.log(secure_url)

    let url = 'http://localhost:8080/subs/add-sub'
    const params = new URLSearchParams()
    params.append('caption', data.caption)
    params.append('desc', data.desc)
    params.append('image', secure_url)
    params.append('tags', tags)
    params.append('bannedWords', tagsb)
    // console.log(data.img)


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
        alert("Sub Created")
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1500);
      }

    }
    catch (e) {
      alert("Sub NOT created")

      // axios.post("http://localhost:8080/users/add",input )
      // .then(res=>console.log(res))
    }
  }


  return (
    <>
      <div className="container">
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title my-3">Create new SubGreddiit</h5>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" required placeholder="Name" value={data.caption}
                  onChange={(e) => setData({ ...data, caption: e.target.value })} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" value={data.desc}
                  onChange={(e) => setData({ ...data, desc: e.target.value })} required></textarea>
              </div>
              {/* for tags */}
              <div className="container-tags0123">
                {tags.map((tag, index) => (
                  <div className="tag0123">
                    {tag}
                    <button onClick={() => deleteTag(index)}>x</button>
                  </div>
                ))}
                <input
                  value={input}
                  placeholder="Enter a tags seperating it by ','"
                  onKeyDown={onKeyDown}
                  onKeyUp={onKeyUp}
                  onChange={onChange} />
              </div>
              {/* for banned words */}
              <div className="container-tags0123 my-2">
                {tagsb.map((tagb, indexb) => (
                  <div className="tag0123">
                    {tagb}
                    <button onClick={() => deleteTagb(indexb)}>x</button>
                  </div>
                ))}
                <input
                  value={inputb}
                  placeholder="Enter a Banned Words seperating it by ','"
                  onKeyDown={onKeyDownb}
                  onKeyUp={onKeyUpb}
                  onChange={onChangeb} />
              </div>
              <div className="mb-3 my-3">
                <label htmlFor="formFile" className="form-label">{data?.img?.name || 'Upload img'}</label>
                <input className="form-control hidden d-none" required type="file" id="formFile"
                  onChange={(e) => setData({ ...data, img: e.target.files[0] })} />
              </div>
              <button className='btn btn-warning' type='submit'>Create Post</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

