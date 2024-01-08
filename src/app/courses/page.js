import { getCourses } from '@/lib/data';
import styles from './Courses.module.css'; // Ensure you have this CSS module
import Image from 'next/image';
import Link from 'next/link';

async function Courses() {
  const courses = await getCourses();

  return (
    <div className={styles.coursesContainer}>
      {courses.map(course => (
        <Link href={`/courses/${course.id}`} key={course.id} className={styles.courseItem}>
          <Image src={course.image_url} alt={course.title} className={styles.courseImage} width={100} height={100}/>
          <div className={styles.courseContent}>
            <h2 className={styles.courseTitle}>{course.title}</h2>
            <p className={styles.courseDescription}>{course.description}</p>
            <p className={styles.courseInfo}>
              Created At: {new Date(course.createdat).toLocaleDateString()} | 
              Updated At: {new Date(course.updatedat).toLocaleDateString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Courses;
