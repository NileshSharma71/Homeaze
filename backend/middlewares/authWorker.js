<<<<<<< HEAD
import jwt from "jsonwebtoken";

const authWorker = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;

    if (!dtoken) {
      return res.json({ success: false, message: "Not Authorized" });
    }

    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.workerId = decoded.id;

    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

=======
import jwt from 'jsonwebtoken'

// worker authentication middleware
const authWorker = async (req, res, next) => {
    const { dtoken } = req.headers
    if (!dtoken) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }
    try {
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
        req.workerId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

>>>>>>> 69b6e65 (Add existing project files and Ubuntu setup)
export default authWorker;