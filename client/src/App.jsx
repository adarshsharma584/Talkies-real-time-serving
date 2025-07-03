import React from 'react'
import { loginUserThunk } from './redux/user/user.thunk'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import HomePage from './pages/home/HomePage'
import { getUserProfileThunk } from './redux/user/user.thunk'
import { getOtherParticipantsProfileThunk } from "./redux/user/user.thunk"
function App() {
 const dispatch = useDispatch();
 const {userProfile, isAuthenticated} = useSelector(state => state.userReducer);

  useEffect(() => {
    (async ()=>{
     const user= await dispatch(getUserProfileThunk());
     console.log("User profile fetched:", user);
    })()
  }, [isAuthenticated, dispatch]);


  useEffect(()=>{
    (async () => {
     const otherUsers = await dispatch(getOtherParticipantsProfileThunk());
     console.log("Other users fetched:", otherUsers);
    })();
  }, [isAuthenticated, dispatch]);

  return (
    <div>
      <HomePage />
     
    </div>
  )
}

export default App