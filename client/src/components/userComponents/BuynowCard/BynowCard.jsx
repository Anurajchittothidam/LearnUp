import React , {useEffect , useState} from 'react'
import { Link } from 'react-router-dom'
// import Button from '../Button/Button'
import { useSelector } from 'react-redux'
import { isEntrolled } from '../../../services/userApi';
// import { isCourseEnrolled } from '../../../services/userApi';


function BuyNowCard({courseDetails}) {
  const user = useSelector((state) => state.user);
  const [enrolled , setIsEnrolled] = useState(false)
    useEffect(() => {
        console.log('user->' , user);
      if(user.firstName ) {
        isEntrolled(courseDetails._id).then((response) => {
          console.log("isCourseEnrolled" , response.data
          );
          if(response.data.enrolled) {
            setIsEnrolled(true)
          }
        })
      }
    })


  return (
    <div className="max-w-sm mt-8 bg-white border border-gray-200 rounded-lg w-full md:w-80 shadow dark:bg-gray-800 dark:border-gray-700">
            <div className='p-5'>
                <img className="rounded w-full object-cover" src={courseDetails?.image} alt />
            </div>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">₹ { courseDetails?.isFree ?  "Free" : courseDetails?.price}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">life long validity</p>
                <div className='button'>
                    {enrolled ?
                        <Link to={`/my-enrollments`}>
                            {/* <Button width={true}>
                                
                            </Button> */}
                            <a class="block visible py-4 px-8 mb-4 text-xs font-semibold tracking-wide leading-none text-white bg-blue-500 rounded cursor-pointer sm:mr-3 sm:mb-0 sm:inline-block">
                            Continue Learning
                </a>
                        </Link>
                        :
                        <Link className='w-full' to={`/course-payment/${courseDetails._id}`}>
                            {/* <Button width={true}>
                                Buy Now
                            </Button> */}
                            <a class="block visible py-4 px-8 mb-4 text-xs font-semibold tracking-wide leading-none text-white bg-blue-500 rounded cursor-pointer sm:mr-3 sm:mb-0 sm:inline-block">
                            Buy Now
                </a>
                        </Link>
                    }
                </div>
            </div>
            <div className='border-t pl-5 mt-4 mb-4'>
                <h4 className='font-semibold mt-3'>Whats included</h4>
                <p className='mt-3'>{courseDetails.course && courseDetails.course.length} Chapter </p>
                <p className='mt-3'>Online accessibility</p>
            </div>
        </div>
  )
}

export default BuyNowCard