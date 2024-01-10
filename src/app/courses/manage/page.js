import Link from 'next/link';
import styles from './CourseManager.module.css'; // Ensure this CSS module is created
import { getCategories, getCourses, getSomething, handleAction } from '@/lib/data';
import DeleteCourse from '../components/DeleteCourse/DeleteCourse';


async function CourseManager(props) {

const courses=await getCourses()

  return (
    <div className={styles.container}>
      <h1>Course Management</h1>
      <Link  href={"/courses/manage/new"} className={styles.addButton}>Add New Course</Link>
      <ul className={styles.coursesList}>
      {courses?.map((course) => (
        <li key={course.id} className={styles.course}>
          <h2 className={styles.title}>{course.title}</h2>
          <p className={styles.description}>{course.description}</p>
          <DeleteCourse id={course.id}/>
          <Link href={`/courses/manage/${course.id}/edit`} className={styles.editButton}>Edit</Link>
        </li>
      ))}
      </ul>
       {/* <CourseForm /> */}
       

         
    </div>
  );
}


export default CourseManager;
