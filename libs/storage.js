import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './storage/imgs')
    },
    filename: function (req, file, cb) {
      /* cb(null, file.fieldname + '-' + uniqueSuffix) */
      
      cb(null, `${file.fieldname}- ${Date.now()}.png`)
    }
  })
  
  const upload = multer({ storage: storage })

export default  upload