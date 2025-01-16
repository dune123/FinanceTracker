import React, { useEffect } from 'react'
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = () => {
  const [user,loading]=useAuthState(auth);
  const navigate=useNavigate();

  useEffect(()=>{
    if(user){
      navigate("/dashboard");
    }
  },[user,loading])

  function logoutFnc(){
    try {
      signOut(auth).then(() => {
        // Sign-out successful.
        toast.success("Logged out successfully")
        navigate("/");
      }).catch((error) => {
        toast.error(error.message);
      });
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className='w-[100vw] h-[7vh] bg-[#2970FF] flex justify-between px-10 items-center relative top-0 left-0 z-50'>
       <p className='text-xl text-white'>Financly.</p> 
       {
          user && (
            <div style={{display:"flex",alignItems:"center",gap:"0.7rem"}}>
            <img 
            src={user?.photoURL ? user.photoURL : "/userx.png"} 
            style={{borderRadius:"50%",height:"2rem",width:"2rem"}}/>
            <p className='text-xl text-white opacity-80 hover:opacity-100 cursor-pointer' onClick={logoutFnc}>Logout</p>
            </div>
          )
       }
    </div>
  )
}

export default Header