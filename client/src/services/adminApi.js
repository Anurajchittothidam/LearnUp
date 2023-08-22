import axios from "../axios.js"

export const adminLogin=(adminData)=>{
    return axios("adminJwtToken").post('/admin/login',{...adminData})
}

export const getUsers=(name)=>{
    return axios("adminJwtToken").get(`/admin/${name}`)
} 


export const blockUnblockUser=(e)=>{
    return axios("adminJwtToken").patch(`/admin/${e.name}/${e.id}`)
}


export const addTeachers=(teacherData)=>{
    return axios('adminJwtToken').post('/admin/teachers/add',{teacherData})
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