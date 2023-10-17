import axios from "../../src/axios/axiosAdmin.js"

export const adminLogin=(adminData)=>{
    return axios("adminJwtToken").post('/admin/login',{...adminData})
}

export const authAdmin=()=>{
    return axios('adminJwtToken').get('/admin/auth')
}

export const getUsers=(name)=>{
    return axios("adminJwtToken").get(`/admin/${name}`)
} 


export const blockUnblockUser=(e)=>{
    return axios("adminJwtToken").patch(`/admin/${e.name}/${e.id}`)
}


export const addTeachers=(teacherData)=>{
    return axios('adminJwtToken').post('/admin/teachers/add',{...teacherData,action:'send'})
}

export const addTeachersOtp=(values)=>{
    return axios('adminJwtToken').post('/admin/teachers/add',{otp:values.otp.join(''),action:'verify'})
}

// export const googleAuth=(value)=>{
//     return axios('adminJwtToken').post('/teacher/auth/google',{...value})
// }

export const addTeacherResendOtp=()=>{
    return axios('adminJwtToken').post('/admin/teachers/resend')
}

export const getCategories=()=>{
    return axios("adminJwtToken").get('/admin/categories')
}

export const blockUnblockCategory=(id)=>{
    return axios("adminJwtToken").patch(`/admin/categories/${id}`)
}

export const addCategories=(name)=>{
    return axios("adminJwtToken").post('/admin/categories/add',{name})
}

export const editCategory=({name,id})=>{
    return axios("adminJwtToken").put(`/admin/categories/edit/${id}`,{name})
}

export const verifyTeacher=(id)=>{
    console.log(id)
    return axios('adminJwtToken').patch('/admin/verifyTeacher',{id})
}

export const getAdminDashboard=()=>{
    return axios('adminJwtToken').get('/admin/dashboard')
}

