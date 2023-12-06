import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';


function Login() {
    const [key, setKey] = useState('Login');
    
    return (
        <div className='container mt-4'>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3">

                <Tab eventKey="Login" title="Login">
                    <SignIn />
                    <button type="submit" className="btn btn-primary mx-5 my-5" onClick={(k) => setKey('Register')}>
                            Not yet registered?
                    </button>
                </Tab>
                <Tab eventKey="Register" title="Register">
                    <SignUp />
                    <button type="submit" className="btn btn-primary mx-5 my-5" onClick={(k) => setKey('Login')}>
                                    Already our member?
                    </button>
                </Tab>
            </Tabs>
        </div>
    );
}

export default Login;