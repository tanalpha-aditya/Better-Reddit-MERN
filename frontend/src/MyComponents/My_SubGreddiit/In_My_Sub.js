import React, { useEffect } from 'react'
import { Navbar } from '../Home/Navbar'
import { useParams } from 'react-router-dom'
import { JoinReq } from './JoinReq'
import { Reports } from './Reports'
import { Stats } from './Stats'
import { Users } from './Users'

export const In_My_Sub = () => {
    const { id } = useParams()
    // console.log(id)
    localStorage.setItem("subID", JSON.stringify(id))

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case '1':
                    document.getElementById('pills-home-tab').click()
                    break
                case '2':
                    document.getElementById('pills-profile-tab').click()
                    break
                case '3':
                    document.getElementById('pills-contact-tab').click()
                    break
                case '4':
                    document.getElementById('pills-report-tab').click()
                    break
                default:
                    break
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <div>
            <Navbar/>
            <ul className="nav nav-pills mb-3 nav" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Users</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Joining Request Page</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Stats</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-report-tab" data-bs-toggle="pill" data-bs-target="#pills-report" type="button" role="tab" aria-controls="pills-report" aria-selected="false">Reports</button>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab"><Users/></div>
                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"><JoinReq _id = {id}/></div>
                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab"><Stats/></div>
                <div className="tab-pane fade" id="pills-report" role="tabpanel" aria-labelledby="pills-report-tab"><Reports/></div>
            </div>
        </div>
    )
}
