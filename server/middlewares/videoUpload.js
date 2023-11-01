import multer from 'multer'
import AWS from 'aws-sdk'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const bucketName = process.env.AWS_S3_BUCKET_NAME
const region = process.env.AWS_S3_BUCKET_REGION
const accessKeyId = process.env.AWS_S3_ACCESS_KEY
const secretAccessKey = process.env.AWS_S3_SECRET_KEY
process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = '1';

const s3 = new AWS.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region:region
});

const upload = multer({ dest: 'public/uploads/' })



export const S3Upload=async(file)=>{ 
    const fileStream=fs.createReadStream(file.path);
    const params = {
        Bucket: bucketName,
        Key: file.originalname,
        // ACL:"public-read-write",   
        Body: fileStream,
    };
    
       s3.upload(params, function (err, data) {
            console.log(data)
            if (err) {
                throw err
            }
            console.log(`File uploaded successfully. 
                          ${data.Location}`);
            return data
        })

}


export default upload