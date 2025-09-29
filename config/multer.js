// import multer
const multer = require('multer')
const path = require('path')

// multer config for images and videos
const storage = multer.diskStorage({
    fileFilter: (req, file, cb) => {
        const allowedExtensions = [ '.jpg', '.jpeg', '.png' ]
        let ext  = path.extname(file.originalname)

        // check if file extension is allowed
        if (allowedExtensions.includes(ext.toLowerCase())) {
            cb(null, true)
        } else {
            cb(new Error('File type is not supported'), false)
        }
    }
})

const upload = multer({ storage})

module.exports = upload