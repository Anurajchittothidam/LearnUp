import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getAllCategories } from "../../../services/userApi";
import { allCourses } from "../../../services/userApi";
import Navbar from "../Navbar";

function Category() {
  const [open, setOpen] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [categories, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState("");
  const [filterCategory, setfilterCategory] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [limit, setLimit] = useState(3);
  const [price, setPrice] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setIsLoading(true)
    allCourses(filterCategory.toString(), price, search, sort, page, limit)
      .then((res) => {
        if (res.data.block === "true") {
        } else {
          setCourses(res.data.courses);
          let total = res.data.total;
          total % 3 === 0
            ? setTotal(Math.floor(total / 3))
            : setTotal(Math.floor(total / 3) + 1);
        }
      })
      .catch((err) => {
        setCourses([]);
        // toast.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    getAllCategories().then((res) => {
      setCategory(res.data.category);
    });
  }, [sort, filterCategory, page, search, price]);

  const filterChange = (e) => {
    if (e.target.checked) {
      setfilterCategory((prev) => [...prev, e.target.value]);
    } else {
      const state = filterCategory.filter((cat) => cat !== e.target.value);
      setfilterCategory(state);
    }
  };

  const setPriceChange = (e) => {
    if (e.target.checked) {
      setPrice(e.target.value);
    } else {
      setPrice("All");
    }
  };

  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <div className="min-h-screen bg-gradient-to-tr from-red-300 to-yellow-200  py-20">
        <div className="flex flex-row justify-between">
              <div className="basis-1/4">
                <h3 className="ps-5 text-3xl">All Courses</h3>
              </div>
              <div className="basis-2/4">
                <label
                  for="default-search"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    id="default-search"
                    class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Mockups, Logos..."
                  />
                  {/* <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                </div>
              </div>
            </div>
          {/* <div className="flex flex-col w-full"> */}
            
            <div className="flex">
              <div className="min-h-screen bg-white basis-1/6 mt-10 flex-initial w-64 rounded-xl">
                <h3 className="p-5 text-2xl font-medium">Categories</h3>
                {categories.map((category, index) => (
                  <div className="flex items-center ps-5 p-3" key={index}>
                    <input
                      id={`checked-checkbox-${index}`}
                      type="checkbox"
                      onChange={(e) => filterChange(e)}
                      value={category?.name}
                      className="w-5 h-5 border-gray-300 focus:ring-blue-700 focus:ring-offset-2 focus:ring checked:bg-red-400 rounded"
                    />
                    <label
                      htmlFor={`checked-checkbox-${index}`}
                      className="ml-5 text-xl font-medium text-gray-900 dark:text-gray-300"
                    >
                      {category?.name}
                    </label>
                  </div>
                ))}
                <h3 className="p-5 text-2xl font-medium">Price</h3>

                <div className="flex items-center ps-5 p-3">
                  <input
                    type="radio"
                    id="paid"
                    name="price"
                    value="false"
                    onChange={(e) => setPriceChange(e)}
                    className="w-5 h-5 border-gray-300  rounded"
                  />
                  <label
                    htmlFor="paid"
                    className="ml-5 text-xl font-medium text-gray-900 dark:text-gray-300"
                  >
                    Paid
                  </label>
                </div>
                <div className="flex items-center ps-5 p-3">
                  <input
                    type="radio"
                    id="free"
                    name="price"
                    value="true"
                    onChange={(e) => setPriceChange(e)}
                    className="w-5 h-5 border-gray-300  rounded"
                  />
                  <label
                    htmlFor="free"
                    className="ml-5 text-xl font-medium text-gray-900 dark:text-gray-300"
                  >
                    Free
                  </label>
                </div>
                <div className="flex items-center ps-5 p-3">
                  <input
                    type="radio"
                    id="free"
                    name="price"
                    value=""
                    onChange={(e) => setPriceChange(e)}
                    className="w-5 h-5 border-gray-300  rounded"
                  />
                  <label
                    htmlFor="free"
                    className="ml-5 text-xl font-medium text-gray-900 dark:text-gray-300"
                  >
                    All
                  </label>
                </div>

                <select
                  onChange={(e) => setSort(e.target.value)}
                  class="m-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg>
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                  <option
                    value=""
                    className="text-sm text-start px-5 font-medium block py-2.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sort by
                  </option>
                  <option
                    value="price-ase"
                    class="text-sm text-start px-5 font-medium block py-2.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Price-asending
                  </option>
                  <option
                    value="price-dec"
                    class="text-sm text-start px-5 font-medium block py-2.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Price-desending
                  </option>
                  <option
                    value="order-ase"
                    class="text-sm text-start px-5 font-medium block py-2.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Order-asending
                  </option>
                  <option
                    value="order-dec"
                    class="text-sm text-start px-5 font-medium block py-2.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Order-desending
                  </option>
                </select>
              </div>
              {isLoading ? (
                <div className="basis-5/6 min-h-screen block bg-white mt-10 opacity-25 z-50">
                  <span class="text-green-500 opacity-75 top-1/2  block  w-0 h-0">
                    <i className="fas fa-circle-notch fa-spin fa-5x"></i>
                  </span>
                </div>
              ) : (<>
              <div className="basis-5/6 min-h-screen">
              
                  {courses.length === 0 ? (
                    <>
                    <div className="flex flex-col bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg m-5">
                        <h3 className="text-center text-4xl text-black">No course found</h3>
                        <img src="/images/noCourse.avif" alt="" />
                      </div>
                    </>
                  ) : (
                  <div className="h-64 flex-initial mt-20 md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
                   { courses.map((result) => (
                      <div className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
                        {/* <h3 className="mb-3 text-xl font-bold text-indigo-600"></h3> */}
                         <div className="relative">
                          <img
                            onClick={() =>
                              navigate(`/course-details/${result._id}`)
                            }
                            style={{
                              width: "330px",
                              height: "140px",
                              objectFit: "cover",
                            }}
                            className="w-full rounded-xl"
                            src={result?.image}
                            alt="Colors"
                          />
                          <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
                          ₹ {result?.price}
                          </p>
                        </div>
                        <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">
                          {result?.name}
                        </h1>
                        <div className="my-4">
                          <div className="flex space-x-1 items-center">
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-indigo-600 mb-1.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </span>
                            <p>{result.duration}</p>
                          </div>
                          <div className="flex space-x-1 items-center">
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-indigo-600 mb-1.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </span>
                            <p>{(result?.course).length} Chapters</p>
                          </div>
                          <div className="flex space-x-1 items-center">
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-indigo-600 mb-1.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                />
                              </svg>
                            </span>
                            <p>{result.language}</p>
                          </div>
                          <button
                            onClick={() =>
                              navigate(`/course-details/${result._id}`)
                            }
                            className="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg"
                          >
                            {result.price === 0
                              ? "Entroll Now "
                              : "Purchase Now"}
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
                  )}
              
            </div> 
            </>
              )}
              </div>
            {total > 1 && (
              <nav
                aria-label="Page navigation example"
                className="flex justify-center items-center "
              >
                <ul class="inline-flex -space-x-px text-base h-10">
                  {page > 1 && (
                    <li>
                      <a
                        onClick={() => setPage((pre) => pre - 1)}
                        class="cursor-pointer flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <svg
                          class="w-3.5 h-3.5 mr-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 5H1m0 0 4 4M1 5l4-4"
                          />
                        </svg>
                        Previous
                      </a>
                    </li>
                  )}
                  {Array.from({ length: total }, (_, index) => {
                    const color =
                      page === index + 1 ? "bg-blue-500" : "bg-white";

                    return (
                      <li key={index}>
                        <a
                          onClick={() => setPage(index + 1)}
                          className={`cursor-pointer flex items-center justify-center px-4 h-10 leading-tight  ${color} border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white `}
                        >
                          {index + 1}
                        </a>
                      </li>
                    );
                  })}

                  {page !== total && (
                    <li>
                      <a
                        onClick={() => setPage((pre) => pre + 1)}
                        class="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        Next
                        <svg
                          class="w-3.5 h-3.5 ml-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </a>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          {/* </div> */}
        </div>

        <ToastContainer />
      </div>

      <script
        src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"
        defer
      ></script>
    </>
  );
}

export default Category;
