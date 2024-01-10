'use server'

import { signIn } from "@/auth";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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


export const deleteCourseById=async(courseId)=>{
      await sql`DELETE  FROM courses WHERE id = ${courseId};`
      revalidatePath('/courses/manage')
    return {message:"Deleted Successfully"};
}
export const getCourseById=async(courseId)=>{
      const query=await sql`SELECT * FROM courses WHERE id = ${courseId};`;
    const data=query.rows[0]
    return data;
}
export const addCourse = async (instructorId, formData) => {
  const formDataObj = Object.fromEntries(formData.entries());
    await sql`
      INSERT INTO courses 
        (Title, Description, Image_url, Instructorid, Createdat, Updatedat, Categoryid) 
      VALUES 
        (${formDataObj.Title}, ${formDataObj.Description}, ${formDataObj.image_url}, ${instructorId}, NOW(), NOW(), ${formDataObj.CategoryId})
    `;
  revalidatePath('/courses')
  revalidatePath('/courses/manage')
  redirect('/courses/manage')
};

export const editCourse=async(courseId,formData)=>{
  const formDataObj = Object.fromEntries(formData.entries());
    // Update existing course
 await sql`
  UPDATE courses 
  SET 
    Title = ${formDataObj.Title}, 
    Description = ${formDataObj.Description}, 
    Image_url = ${formDataObj.image_url}, 
    Updatedat = NOW(), 
    Categoryid = ${formDataObj.CategoryId}
  WHERE id = ${courseId}
`;
  revalidatePath('/courses/manage')
    redirect('/courses/manage')
}
export const getSomething=async()=>{
    console.log(process.env.POSTGRES_URL);
    const res=await fetch('https://jsonplaceholder.typicode.com/todos/1')
    return  res.json()
}

export const authenticate=async(formData)=>{
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error ) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}