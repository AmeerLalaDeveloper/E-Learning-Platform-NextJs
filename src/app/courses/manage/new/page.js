import { addCourse, handleAction } from "@/lib/data"
import CourseForm from "../../components/CourseForm/CourseForm"

function NewCourse() {
    const addCourseWithParam=addCourse.bind(null,1)
  return (
    <><CourseForm action={addCourseWithParam}/></>
  )
}

export default NewCourse