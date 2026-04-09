import streamifier from "streamifier";
import cloudinary from "./cloudinary.js";

export async function uploadTheaterPhoto(buffer: Buffer, folder: string = "theaters"): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) resolve(result.secure_url);
        else reject(error);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
}
