// import 'only-server'
// 'use server'
// import fs from  'fs'

// import { sql } from "@vercel/postgres";

// export const getCourses=async()=>{
//     const query=await sql`SELECT * FROM courses`;
//     const data=query.rows
//     return data;
// }


export const getSomething=async()=>{
    console.log(process.env.POSTGRES_URL);
    const res=await fetch('https://jsonplaceholder.typicode.com/todos/1')
    return  res.json()
}