import {configureStore} from '@reduxjs/toolkit'
import userAuth from '../features/userAuth'
import adminAuth from '../features/adminAuth'
import teacherAuth from '../features/teacherAuth'
import adminSidebar from '../features/adminSidebar'

export default configureStore({
    reducer:{
        user:userAuth,
        admin:adminAuth,
        teacher:teacherAuth,
        adminSidebar:adminSidebar
    }
})