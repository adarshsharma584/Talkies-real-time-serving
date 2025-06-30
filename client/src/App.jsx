import React from 'react'
import { loginUserThunk } from './redux/user/user.thunk'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
 console.log(user);
  useEffect(() => {
    dispatch(loginUserThunk());
  }, []);

  return (
    <div>App</div>
  )
}

export default App