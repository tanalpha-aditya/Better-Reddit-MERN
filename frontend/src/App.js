import './App.css';
// import { SignIn } from './MyComponents/Sign/SignIn';
// import { SignUp } from './MyComponents/Sign/SignUp';
import Profile from './MyComponents/Profile/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './Services/ProtectedRoute';
import Login from './MyComponents/Sign/Tab';
import { ProtectLogin } from './Services/ProtectLogin';
import { Home } from './MyComponents/Home/Home';
import { My_SubGreddiit } from './MyComponents/My_SubGreddiit/My_SubGreddiit';
import { Post_SubGreddiit } from './MyComponents/My_SubGreddiit/Post_SubGreddiit';
import { SubGreddiit } from './MyComponents/SubGreddiit/SubGreddiit';
import { Posts } from './MyComponents/SubGreddiit/Posts';
import { SavedPosts } from './MyComponents/SavedPosts/SavedPosts';
import { UpdateProfile } from './MyComponents/Profile/UpdateProfile';
import { In_My_Sub } from './MyComponents/My_SubGreddiit/In_My_Sub';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            {/* protecting from going anywhere but login */}
            <Route path='/' element={<Home />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/mySubGreddiit' element={<My_SubGreddiit />}></Route>
            <Route path='/createSubGreddiit' element={<Post_SubGreddiit />}></Route>
            <Route path='/subGreddiit' element={<SubGreddiit />}></Route>
            <Route path='/user/:id' element={<Posts />}></Route>
            <Route path='/savedPosts' element={<SavedPosts />}></Route>
            <Route path='/user-update' element={<UpdateProfile />}></Route>
            <Route path='/mysub/:id' element={<In_My_Sub />}></Route>
        </Route>
        <Route path="/" element={<ProtectLogin />}>
          {/* protecting from going to login */}
          <Route path='/login' element={<Login />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
