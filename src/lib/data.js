'use server'

import { sql } from "@vercel/postgres";

export const getCourses=async()=>{
    const query=await sql`SELECT * FROM courses`;
    const data=query.rows
    return data;
}

export const getCategories=async()=>{
    const query=await sql`SELECT * FROM categories`;
    const data=query.rows
    return data;
}



export const handleAction = async (course, formData) => {
  const formDataObj = Object.fromEntries(formData.entries());
  console.log('====================================');
  console.log(formDataObj,course);
  console.log('====================================');
  if (course) {
    // Update existing course
    await sql`
      UPDATE courses 
      SET 
        Title = ${formData.Title}, 
        Description = ${formData.Description}, 
        Image_url = ${formData.Image_url}, 
        Instructorid = ${formData.Instructorid}, 
        Updatedat = NOW(), 
        Categoryid = ${formData.Categoryid}, 
        Labels = ${formData.Labels} 
      WHERE Id = ${course.id}
    `;
  } else {
    // Insert new course
    await sql`
      INSERT INTO courses 
        (Title, Description, Image_url, Instructorid, Createdat, Updatedat, Categoryid, Labels) 
      VALUES 
        (${formData.Title}, ${formData.Description}, ${formData.Image_url}, ${formData.Instructorid}, NOW(), NOW(), ${formData.Categoryid}, ${formData.Labels})
    `;
  }
};
export const getSomething=async()=>{
    console.log(process.env.POSTGRES_URL);
    const res=await fetch('https://jsonplaceholder.typicode.com/todos/1')
    return  res.json()
}