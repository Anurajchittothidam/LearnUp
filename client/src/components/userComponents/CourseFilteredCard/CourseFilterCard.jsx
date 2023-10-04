import React, { useState } from "react";
import "./CourseFilterCard.scss";

function CourseFilterCard({ categories, filterCategory, setfilterCategory, priceFilter , setPriceFilter }) {
  const [showDrawer, setShowDrawer] = useState(true);

  const handleToggleDrawer = () => {
    setShowDrawer(!showDrawer);
    console.log(showDrawer);
  };

  const handlePriceFilterChange = ({currentTarget:input}) => {
    if(input.checked){
      setPriceFilter(input.value);
    }else{
      setPriceFilter('All')
    }
  
  };

  const onChange = ({ currentTarget: input }) => {
    if (input.checked) {
      const state = [...filterCategory, input.value];
      setfilterCategory(state);
    } else {
      const state = filterCategory.filter((val) => val != input.value);
      setfilterCategory(state);
    }
  };

  return (
    <>
      <div className="">
        {/* <!-- drawer init and toggle --> */}
        {/* <div className="flex justify-center ">
          <button
            // className="btn btn-outline rounded-sm h-4 "
            className=" text-white  bg-gray-900    font-semibold rounded-lg text-sm px-4 py-2.5 ml-2 mr-2  dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            type="button"
            data-drawer-target="drawer-example"
            data-drawer-show="drawer-example"
            aria-controls="drawer-example"
            onClick={handleToggleDrawer}
          >
            Filter
          </button>
        </div> */}

        {/* <!-- drawer component --> */}

        {showDrawer && (
          <form
            action="#"
            method="get"
            id="drawer-example"
            className="absolute top-0 left-0 z-40 w-1/2 hidden md:block md:w-36 lg:w-64 pl-7   form-control h-screen max-w-sm p-4 overflow-y-auto translate-x-0 bg-white dark:bg-gray-800"
            tabindex="-1"
          >
            {/* <h5 className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
              Apply filters
            </h5> */}
            {/* <button
              type="button"
              onClick={handleToggleDrawer}
              data-drawer-dismiss="drawer-example"
              aria-controls="drawer-example"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close menu</span>
            </button> */} 

            <div className=" mb-10 " >
              <h1 className="text-4xl font-bold text-violet-700"> Courses </h1>
            </div>

            <div className="flex flex-col justify-between flex-1">
              <ul className="space-y-6">
                {/* Categories */}
                <li className="space-y-2">
                  <h6 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">
                    Categories
                  </h6>

                  <ul className="space-y-2">
                    {categories.map((cat , index) => (
                      <li className="flex items-center" key={index}>
                        <input
                          id={`checkbox-${index}`}
                          type="checkbox"
                          value={cat}
                          key={index}
                          className="checkbox h-4 w-4 "
                          onChange={onChange}
                        />
                        <label htmlFor={`checkbox-${index}`} key={index} className="checkbox-label mt-2 ">
                          {cat}
                        </label>
                      </li>
                    ))}

                   
                  </ul>
                </li>

                {/* Prices */}
                <li className="space-y-2">
                  <h6 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                    Prices
                  </h6>
                  <div className="flex flex-col mb-">
                    <div className="mb-[1.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                      <input
                        className="checkbox h-4 w-4"
                        type="checkbox"
                        name="flexRadioNoLabel"
                        id="radioNoLabel01"
                        value="false"
                        
                        onChange={handlePriceFilterChange}
                      />
                      <label
                        htmlFor="radioNoLabel01"
                        className="checkbox-label "
                      >
                        Paid
                      </label>
                    </div>

                    <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                      <input
                        className="checkbox h-4 w-4"
                        type="checkbox"
                        name="flexRadioNoLabel"
                        id="radioNoLabel02"
                        value="true"
                       onChange={handlePriceFilterChange}
                      />
                      <label
                        htmlFor="radioNoLabel02"
                        className="checkbox-label"
                      >
                        Free
                      </label>
                    </div>
                  </div>
                </li>

                {/* Rating */}
              </ul>

              {/* <div className="bottom-0 left-0 flex justify-center w-full pb-4 mt-6 space-x-4 md:px-4 md:absolute">
              <button
                type="submit"
                className="w-full px-5 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-700 dark:hover:bg-primary-800 dark:focus:ring-primary-800"
              >
                Apply filters
              </button>
              <button
                type="reset"
                className="w-full px-5 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Clear all
              </button>
            </div> */}
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default CourseFilterCard;