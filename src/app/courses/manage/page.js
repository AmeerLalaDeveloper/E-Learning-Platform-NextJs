'use client'
import React, { useEffect, useState } from 'react';
import {useFormState} from 'react-dom'
import styles from './CourseManager.module.css'; // Ensure this CSS module is created
import { getCategories, getCourses, getSomething, handleAction } from '@/lib/data';


function CourseManager() {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  const handleActionWithParams=handleAction.bind(null,currentCourse)
  useEffect(()=>{
    getCourses().then(courses=>setCourses(courses))
  },[])

  const handleAddEdit = (course) => {
    setCurrentCourse(course);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setCurrentCourse(null);
  };

  const handleDelete = (courseId) => {
    // Delete logic here
    console.log('Delete Course with ID:', courseId);
    // Example: setCourses(courses.filter(course => course.id !== courseId));
  };



  return (
    <div className={styles.container}>
      <h1>Course Management</h1>
      <button onClick={() => handleAddEdit(null)} className={styles.addButton}>Add New Course</button>
      <ul className={styles.coursesList}>
      {courses.map((course) => (
        <li key={course.id} className={styles.course}>
          <h2 className={styles.title}>{course.title}</h2>
          <p className={styles.description}>{course.description}</p>
          <button onClick={() => handleDelete(course.id)} className={styles.deleteButton}>Delete</button>
          <button onClick={() => handleAddEdit(course)} className={styles.editButton}>Edit</button>
        </li>
      ))}
      </ul>
      {showForm && <CourseForm dispatch={handleActionWithParams} course={currentCourse} onClose={handleCloseForm} />}
    </div>
  );
}

 function CourseForm({ course,onClose,dispatch }) {
  const [categories,setCategories]=useState([]);
    useEffect(()=>{
    getCategories().then(categories=>setCategories(categories))
  },[])

  console.log('====================================');
  console.log(categories);
  console.log('====================================');
  return (
    <div className={styles.formContainer}>
      <form   action={dispatch} className={styles.form}>
        <label>Category</label>
        <select
          name="Categoryid"
          defaultValue={course?.Categoryid}
          required
        >
          {categories?.map(category=><option  key={category.id} value={category.id}>{category.name}</option>)}
        </select>
        <label>Title</label>
        <input
          type="text"
          name="Title"
          defaultValue={course?.title}
          required
        />

        <label>Description</label>
        <textarea
          name="Description"
          defaultValue={course?.description}
          required
        />
          <label>Image</label>
      <input type='file' name="image_url"/>
        <button type="submit" className={styles.submitButton}>Submit</button>
        <button onClick={onClose} className={styles.closeButton}>Close</button>
      </form>
    </div>
  );
}

export default CourseManager;
