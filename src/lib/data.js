'use server'

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export const getCourses=async()=>{
    const query=await sql`select * from courses`;
    const data=query.rows
    return data;
}

export const getCategories=async()=>{
    const query=await sql`SELECT * FROM categories`;
    const data=query.rows
    return data;
}



export const handleAction = async (details, formData) => {
  const {currentCourse:course,instructorId}=details
  const formDataObj = Object.fromEntries(formData.entries());
console.log(course);
  if (course) {
    // Update existing course
    await sql`
      UPDATE courses 
      SET 
        Title = ${formDataObj.Title}, 
        Description = ${formDataObj.Description}, 
        Image_url = ${formDataObj.image_url}, 
        Instructorid = ${instructorId}, 
        Updatedat = NOW(), 
        Categoryid = ${formDataObj.CategoryId}, 
      WHERE Id = ${course.id}
    `;
  } else {
    // Insert new course
    await sql`
      INSERT INTO courses 
        (Title, Description, Image_url, Instructorid, Createdat, Updatedat, Categoryid) 
      VALUES 
        (${formDataObj.Title}, ${formDataObj.Description}, ${formDataObj.image_url}, ${instructorId}, NOW(), NOW(), ${formDataObj.CategoryId})
    `;
  }
  revalidatePath('/courses')
  revalidatePath('/courses/manage')
};
export const getSomething=async()=>{
    console.log(process.env.POSTGRES_URL);
    const res=await fetch('https://jsonplaceholder.typicode.com/todos/1')
    return  res.json()
}