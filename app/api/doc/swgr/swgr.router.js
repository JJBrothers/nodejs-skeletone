const rootPath             = require('app-root-path');
const compose              = require('composable-middleware');
const express              = require('express');
const path                 = require('path')
const router               = express.Router();

router.get('/smpl' , (req,res) => res.status(200).send(require('./smpl.doc.js')));

router.use('/', compose().use((req, res, next) => {
                  if(req.url==='/') res.redirect('/swgr?url=smpl');
                  else next();
                }).use(express.static(path.join(rootPath.path, '/node_modules/swagger-ui/dist'))));

module.exports = router;
//http://expressjs.com/ko/starter/static-files.html
