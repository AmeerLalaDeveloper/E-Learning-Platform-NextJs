'use client'
import React, { useEffect, useState } from 'react';
import styles from './CourseManager.module.css'; // Ensure this CSS module is created
import { getCourses, getSomething } from '@/lib/data';


function CourseManager() {
  const [courses, setCourses] = useState([
    { id: 1, title: 'Intro to Programming', description: 'Learn the basics of programming.' },
    { id: 2, title: 'Web Development', description: 'Dive into web development.' },
    // Add more courses as needed
  ]);
  const [showForm, setShowForm] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  useEffect(()=>{
    getSomething().then(courses=>courses)
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
      {showForm && <CourseForm course={currentCourse} onClose={handleCloseForm} />}
    </div>
  );
}

function CourseForm({ course, onClose }) {
  const [formData, setFormData] = useState(course || { title: '', description: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Submit logic here
    onClose(); // Close the form after submission
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button type="submit" className={styles.submitButton}>Submit</button>
        <button onClick={onClose} className={styles.closeButton}>Close</button>
      </form>
    </div>
  );
}

export default CourseManager;
