const checker         = reqlib('/app/util/checker')
const router          = require('express').Router();
const smplCtrl        = require('./smpl.ctrl');

router.get('/sendMail',smplCtrl.sendMail);
router.get('/select',smplCtrl.select);
router.get('/transaction', smplCtrl.transaction);
router.get('/nested', smplCtrl.nested);
router.get('/spread', smplCtrl.spread);

//, type : 'string' 은적어주지않아도됨, default임. 단, number 타입일때는 반드시적어줘야함
router.post('/validation',
  checker.doValidate({
    email : {require : true, extra : 'checkEmailRules'}
  }),
  smplCtrl.validation);

//http://stackoverflow.com/questions/28250680/how-do-i-access-previous-promise-results-in-a-then-chain
//http://bluebirdjs.com/docs/api-reference.html
//http://bluebirdjs.com/docs/api/promise.join.html

module.exports = router;
