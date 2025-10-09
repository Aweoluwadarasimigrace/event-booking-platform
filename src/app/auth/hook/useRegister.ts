import axios from "axios"
import { useState } from "react"




type dataprops ={
    formdata:{
        firstname:string,
        lastname:string,
        email:string,
        password:string
    }
}


export const useRegister = ()=>{

const [formdata, setformdata] = useState<dataprops["formdata"]>({
    firstname:"",
    lastname:"",
    email:"",
    password:""
})
const [isLoading, setisLoading] = useState(false)

const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setformdata({
        ...formdata,
        [e.target.name]:e.target.value
    })
}


const handleSubmit=async (e:React.FormEvent)=>{
    e.preventDefault()
    setisLoading(true)
    try {
        const res = await axios.post(`${process.env.BASE_URL}/api/admin/register`, formdata)
        console.log(res.data)
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message)
        }else{
            console.log("An unknown error occurred")
        }
    }finally{
        setisLoading(false)
    }
}


return {formdata, handleChange, handleSubmit, isLoading}

}