import { getCourses } from "@/lib/data"
  async function Courses() {
    const courses=await getCourses();
console.log('====================================');
console.log(courses);
    console.log('====================================');
  return (
    <div>Courses</div>
  )
}

export default Courses