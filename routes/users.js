var express = require('express');
var router = express.Router();
const { getDatabaseConnection } = require('../configs/database');

const connection = getDatabaseConnection();
const dbo = connection.db('sgroup');
const collection = dbo.collection('users');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const data = await collection.find({}).toArray();
  return res.status(200).json({ data });
});

router.post('/', async function (req, res, next) {
  const {
    name,
    age,
    gender,
  } = req.body;

  const connection = getDatabaseConnection();
  const dbo = connection.db('sgroup');
  const collection = dbo.collection('users');
  await collection.insertOne({
    name,
    age,
    gender,
  });
  return res.status(200).json({ message: 'success' });
});

module.exports = router;
