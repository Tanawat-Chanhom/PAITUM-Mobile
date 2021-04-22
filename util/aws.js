// import S3 from "aws-sdk/clients/s3";
// import { Credentials } from "aws-sdk";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import env from "./env.json";

import { RNS3 } from "react-native-aws3";

// const access = new Credentials({
//   accessKeyId: env.AWS_KEY_ID,
//   secretAccessKey: env.AWS_SECRET,
// });

// const s3 = new S3({
//   credentials: access,
//   region: env.S3_REGION, //Example "us-west-2"
//   signatureVersion: "v4",
// });

// const signedUrlExpireSeconds = 60 * 15;

// const url = await s3.getSignedUrlPromise("putObject", {
//   Bucket: env.S3_BUCKET,
//   Key: `${fileId}.jpg`,
//   ContentType: "image/jpeg",
//   Acl: "public-read",
//   Expires: signedUrlExpireSeconds,
// });

const fileUUID = uuidv4();

const configS3 = {
  keyPrefix: "images/",
  bucket: env.S3_BUCKET,
  region: env.S3_REGION,
  accessKey: env.AWS_KEY_ID,
  secretKey: env.AWS_SECRET,
  successActionStatus: 201,
};

export const uploadImageToS3 = async (
  imageLocation,
  imageName = fileUUID,
  imageType = "jpg"
) => {
  const fileObject = {
    uri: imageLocation,
    name: imageName,
    type: "image/" + imageType,
  };

  return fileObject;

  await RNS3.put(fileObject, configS3)
    .then((response) => {
      if (response.status !== 201) {
        throw new Error("Failed to upload image to S3");
      }
      return response.body.postResponse.location;

      /**
       * {
       *   postResponse: {
       *     bucket: "your-bucket",
       *     etag : "9f620878e06d28774406017480a59fd4",
       *     key: "uploads/image.png",
       *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
       *   }
       * }
       */
    })
    .catch((error) => {
      console.error(error);
    });
};
