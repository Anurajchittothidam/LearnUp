import users from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyTeacher = async (req, res, next) => {
  try {
    const secret = process.env.SECRET_KEY;
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
          return res.json({ status: false, message: "Permission not allowed" });
        } else {
          //finding teacher with decoded id
          const Teacher = await users.findById(decoded.id);
          if (Teacher) {
            if (Teacher.block === true) {
              return res
                .status(400)
                .json({ status: false, message: "Your accound blocked" });
            } else {
              if (Teacher.verify === false) {
                return res
                  .status(400)
                  .json({
                    status: false,
                    message: "Your account is not verified",
                  });
              } else {
                // if user exist passing the user id with the request
                req.teacherId = decoded.id;
                next();
              }
            }
          } else {
            return res.json({ status: false, message: "Teacher not exist" });
          }
        }
      });
    } else {
      res.json({ status: false, message: "No token found" });
      next();
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json("Something went wrong");
  }
};

export default verifyTeacher;
