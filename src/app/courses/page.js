import { getCourses } from "@/lib/data"
async function Courses() {
    const courses=await getCourses();
  return (
    <div>Courses</div>
  )
}

export default Courses