import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserSignOut } from "../../redux/features/userAuth";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.user.login);
  const dispatch = useDispatch();
  // if(user===true){

  // }else{

  // }
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setOpen(true);
        setShow(false);
      }
      if (window.innerWidth < 768) {
        setOpen(false);
        setShow(true);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const closeDropdown = () => {
    setOpen(false);
  };

  function logOut() {
    localStorage.removeItem("JwtToken");
    dispatch(setUserSignOut());
    navigate("/login");
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
              onClick={() => navigate("/")}
              className="cursor-pointer text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
            >
              Learn UP
            </a>

            {show && (
              <>
                {open ? (
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
              </>
            )}
          </div>
          <nav
            className={`${
              open
                ? "flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row"
                : "hidden"
            }`}
          >
            <a
              className="cursor-pointer px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              onClick={() => navigate("/category")}
            >
              All Courses
            </a>
            {user === true ? (
              <a
                className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                onClick={() => navigate("/profile")}
              >
                Profile
              </a>
            ) : (
              ""
            )}
            <a
              className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              onClick={() => navigate("/my-entrollments")}
            >
              my courses
            </a>
            <a
              className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              onClick={() => navigate("/my-cart")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path d="M23.283,9.034A3.008,3.008,0,0,0,20.93,8C19.5-2.6,4.492-2.591,3.07,8A3.018,3.018,0,0,0,.046,11.425l1.059,7.424A6.024,6.024,0,0,0,7.037,24h9.957a6.025,6.025,0,0,0,5.932-5.151l1.059-7.424A3,3,0,0,0,23.283,9.034ZM12,2a7,7,0,0,1,6.911,6H5.089A7,7,0,0,1,12,2Zm6.2,8L14.35,13.857a.5.5,0,0,1-.706,0L9.792,10Zm2.746,8.565A4.018,4.018,0,0,1,16.994,22H7.037a4.018,4.018,0,0,1-3.955-3.435L2.023,11.142A1,1,0,0,1,3.012,10H6.967l5.265,5.271a2.493,2.493,0,0,0,3.531,0L21.026,10a1,1,0,0,1,.982,1.14Z" />
              </svg>
            </a>
            {user === true ? (
              <a
                className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                onClick={logOut}
              >
                LogOut
              </a>
            ) : (
              <a
                className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                onClick={() => navigate("/login")}
              >
                Sign In
              </a>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
