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


const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault()
    setisLoading(true)
    try {
        
        
    } catch (error) {
        
    }
}


return {formdata, handleChange, handleSubmit}

}