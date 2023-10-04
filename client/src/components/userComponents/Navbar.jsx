import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserSignOut } from '../../redux/features/userAuth';

function Navbar(props) {
    const navigate=useNavigate()
    const [open, setOpen] = useState(false);
    const [show,setShow]=useState(false)
    const user=useSelector((state)=>state.user.login)
    const dispatch=useDispatch()
    // if(user===true){
      
    // }else{

    // }
    useEffect(() => {
        function handleResize () {
          if(window.innerWidth >=768) {
            setOpen(true)
            setShow(false)
           
          }
          if(window.innerWidth < 768 ) {
            setOpen(false)
            setShow(true)
    
          }
        }
    
        
    
        handleResize();
    
        window.addEventListener('resize' , handleResize)
    
        return () => window.removeEventListener('resize' , handleResize);
    
      }, [])

      const toggleDropdown = () => {
        setOpen(!open);
      };
    
      const closeDropdown = () => {
        setOpen(false);
      };

      function logOut(){
        localStorage.removeItem('JwtToken')
        dispatch(setUserSignOut())
        navigate('/login')
    }
  return (
    <div className="antialiased bg-gray-100 dark-mode:bg-gray-900 shadow">
      <div className="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
        <div
          x-data="{ open: false }"
          className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
        >
          <div className="flex flex-row items-center justify-between p-4">
            <a
              onClick={()=>navigate('/')}
              className="cursor-pointer text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
            >
              Learn UP
            </a>
            
            {show && (
                <>{open? (
              <button
                onClick={closeDropdown}
                className="rounded-lg focus:outline-none focus:shadow-outline"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            ) : (
              <button
                onClick={toggleDropdown}
                className="lg:hidden rounded-lg focus:outline-none focus:shadow-outline"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            )}
            </>)}
          </div>
          <nav
            className={`${
              open
                ? 'flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row'
                : 'hidden'
            }`}
          >
            <a
              className="cursor-pointer px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              onClick={()=>navigate('/category')}
            >
              All Courses
            </a>
            <a
              className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              href="#"
            >
              Portfolio
            </a>
            <a
              className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              onClick={()=>navigate('/my-entrollments')}
            >
              my courses
            </a>
            {user===true ?(<a
              className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              onClick={logOut}
            >
              LogOut
            </a>):(<a
              className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              onClick={()=>navigate('/login')}
            >
              Sign In
            </a>)}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar