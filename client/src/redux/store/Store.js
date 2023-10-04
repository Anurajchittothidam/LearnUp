import {configureStore,combineReducers} from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userAuth from '../features/userAuth'
import adminAuth from '../features/adminAuth'
import teacherAuth from '../features/teacherAuth'
import adminSidebar from '../features/adminSidebar'
import courseDetails from '../features/CourseRedux'

const rootReducer = combineReducers({
  user: userAuth,
  admin: adminAuth,
  teacher: teacherAuth,
  adminSidebar: adminSidebar,
  course:courseDetails,
});

const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default configureStore({
  reducer: persistedReducer,
});
