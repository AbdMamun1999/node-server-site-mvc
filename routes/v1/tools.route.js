const express = require("express");

const router = express.Router();
const toolsController = require("../../controllers/tools.coltroller");
const limiter = require("../../middleware/limiter");
const viewCount = require("../../middleware/viewCount");

/* router.get('/:id',(req,res)=>{
    res.send('tools found with id')
})

router.post('/',(req,res)=>{
    res.send('tools added')
}) */

router
  .route("/")
  /**
   * @api {post} /tools All tools
   * @apiDescription post all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(toolsController.getAllTools)

  /**
   * @api {get} /tools All tools
   * @apiDescription Get all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .post(toolsController.saveATools);

router.route("/test").post(toolsController.test).get(toolsController.testGet);

router
  .route("/:id")
  .get(viewCount, toolsController.toolsDetails)
  .patch(toolsController.updateTools)
  .put(toolsController.replaceTools)
  .delete(toolsController.deleteTools);

module.exports = router;
