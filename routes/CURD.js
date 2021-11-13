const router = require('express').Router();
const multer = require('multer');

const curdControllers = require('../controllers/CURDcontrollers');
const verify = require('../middleware/verifytoken');

// multer 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    //   cb(null, file.originalname + '.' + file.mimetype.split('/')[1])
    }
  });

const upload = multer({ storage: storage });

// routes
router.post('/senddata',verify,upload.single('fufile'),curdControllers.sendData);
router.post('/deletedata/:id',verify,curdControllers.delData);
router.get('/viewdata',verify,curdControllers.viewData);
router.post('/updatedata/:id',verify,curdControllers.updateData);

module.exports = router;