import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import * as cloudinary from "cloudinary";
import fs from "fs"; //for temporary file storage before cloudinary upload, check line 30 & 39

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dyxmk21pz",
  api_key: "858792668534929",
  api_secret: "u7pZuleceMT0_ZnrjV34msph1Mg",
});

export const cloudinaryUpload = async (locaFilePath) => {
  // locaFilePath: path of image which was just
  // uploaded to "uploads" folder

  var mainFolderName = "download";
  // filePathOnCloudinary: path of image we want
  // to set when it is uploaded to cloudinary
  var filePathOnCloudinary = mainFolderName + "/" + locaFilePath;

  return cloudinary.uploader
    .upload(locaFilePath, { public_id: filePathOnCloudinary })
    .then((result) => {
      // Image has been successfully uploaded on
      // cloudinary So we dont need local image
      // file anymore
      // Remove file from local uploads folder
      fs.unlinkSync(locaFilePath);

      return {
        message: "Success",
        url: result.url,
      };
    })
    .catch((error) => {
      // Remove file from local uploads folder
      fs.unlinkSync(locaFilePath);
      return { message: "Fail" };
    });
};

export default cloudinaryUpload;
