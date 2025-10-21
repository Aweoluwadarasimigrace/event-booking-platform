import { apiClient } from "@/app/lib/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"


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
const Router = useRouter()
const [isLoading, setisLoading] = useState(false)
const [errors, seterrors] = useState<{message:string}>({message: ""})
const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setformdata({
        ...formdata,
        [e.target.name]:e.target.value
    })
}


const handleSubmit=async (e:React.FormEvent)=>{
    e.preventDefault()
    setisLoading(true)

    if(!formdata.firstname || !formdata.lastname || !formdata.email || !formdata.password){
        seterrors({message:"All fields are required"})
        setisLoading(false)
        return
    }
    try {
        const res = await apiClient.post(`/api/admin/register`, formdata)
        if(res.data){
            sessionStorage.setItem("token", res.data.token)
            toast.success(res.data.message)
            Router.push("/dashboard/events")
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message
            toast.error(message || "failed to register")
        } else {
            console.log("An unknown error occurred")
        }
    } finally {
        setisLoading(false)
    }
}


return {formdata, handleChange, handleSubmit, isLoading, errors}

}