import fs from 'fs';
import path from 'path';
export const convertImageToBase64 = async (imagePath) => {
  try {
    // Resolve the full path (if necessary)
    const fullPath = path.resolve(imagePath);

    // Read the file's content in base64 format
    const data = await fs.readFile(fullPath, 'base64');

    // Create the base64 string, adjust the MIME type according to your image type
    const base64String = `data:image/jpeg;base64,${data}`;
    
    return base64String;
  } catch (err) {
    console.error("Error reading the file:", err);
    return null; // or handle the error as needed
  }
};
