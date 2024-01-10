'use client'
import { deleteCourseById } from "@/lib/data"
import {useFormState} from 'react-dom'
const DeleteCourse=({id})=>{
    const handleDeleteCourse=deleteCourseById.bind(null,id);
    const [state, action] = useFormState(handleDeleteCourse,{message:null})

    if( state.message)return <div>{state.message}</div>
    return <form action={action}>
    <button >Delete</button>
  </form>
}
export default DeleteCourse