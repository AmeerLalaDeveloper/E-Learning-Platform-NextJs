
import { getCategories } from '@/lib/data';
import styles from './CourseForm.module.css'
async function  CourseForm({ course,action }) {

const categories=await getCategories()
    return (
        <div className={styles.formContainer}>
            <form action={action} className={styles.form}>
                <label>Category</label>
                <select
                    name="CategoryId"
                    defaultValue={course?.CategoryId}
                    required
                >
                    {categories?.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
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
                <input type='hidden' name="image_url" defaultValue={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9bLg1NQ7hxBmxr6mbk1fkQGv-a6f8QskCSmZlTK-3fg&s'} />
                <button type="submit" className={styles.submitButton}>Submit</button>
                <button className={styles.closeButton}>Close</button>
            </form>
        </div>
    );
}

export default CourseForm