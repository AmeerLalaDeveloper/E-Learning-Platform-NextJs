import CourseForm from "@/app/courses/components/CourseForm/CourseForm";
import { editCourse, getCourseById } from "@/lib/data";

async function EditCourse({params}) {
    const {id}=params;
    const course=await getCourseById(id)
    const handleEditAction=editCourse.bind(null,id)
  return (
    <><CourseForm course={course} action={handleEditAction}/></>
  )
}

export default EditCourse