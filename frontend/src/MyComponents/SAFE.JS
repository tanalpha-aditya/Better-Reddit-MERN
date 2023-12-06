import React from 'react'
import { Navbar } from '../Home/Navbar'
import { useParams } from 'react-router-dom'
import { JoinReq } from './JoinReq'
import { Reports } from './Reports'
import { Stats } from './Stats'
import { Users } from './Users'

export const In_My_Sub = () => {
    const { id } = useParams()
    // console.log(id)
    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case '1':
                    activateTab('users');
                    break;
                case '2':
                    activateTab('joinReq');
                    break;
                case '3':
                    activateTab('stats');
                    break;
                case '4':
                    activateTab('reports');
                    break;
                default:
                    break;
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const activateTab = (tabName) => {
        const tabButton = document.querySelector(`#${tabName}-tab`);
        if (tabButton) {
          tabButton.click();
        }
      };

      
    localStorage.setItem("subID", JSON.stringify(id))
    return (
        <div>
            <Navbar />
            <ul class="nav nav-pills mb-3 nav" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Users</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Joining Request Page</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Stats</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-report-tab" data-bs-toggle="pill" data-bs-target="#pills-report" type="button" role="tab" aria-controls="pills-report" aria-selected="false">Reports</button>
                </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab"><Users /></div>
                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"><JoinReq _id={id} /></div>
                <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab"><Stats /></div>
                <div class="tab-pane fade" id="pills-report" role="tabpanel" aria-labelledby="pills-report-tab"><Reports /></div>
            </div>
        </div>
    )
}
