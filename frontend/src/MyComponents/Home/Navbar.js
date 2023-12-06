import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import Profile from '@mui/icons-material/AccountCircle';
import MySubGreddit from '@mui/icons-material/Subtitles';
import SubGreddiit from '@mui/icons-material/AutoAwesomeMotion';
import Saved from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const nav = useNavigate()

  return (
<>
            {/* navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/"><GoogleIcon />
                        reddiit</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page"  onClick={ () => (nav('/profile'))}><Profile />Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={ () => (nav('/mySubGreddiit'))}><MySubGreddit />My_SubGreddiit</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={ () => (nav('/subGreddiit'))}><SubGreddiit />SubGreddiit</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={ () => (nav('/savedPosts'))}><Saved />Saved_Posts</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>  )
}
