const express = require('express');
const { pool, io } = require('../index');
const router = express.Router();

router.put('/status', async (req, res) => {
  const { status } = req.body;
  const partnerId = req.user.id;

  try {
    const updatedPartner = await pool.query(
      'UPDATE partners SET status = $1 WHERE id = $2 RETURNING id, name, email, status',
      [status, partnerId]
    );

    if (updatedPartner.rows.length === 0) {
      return res.status(404).json({ msg: 'Partner not found' });
    }

    io.emit('partnerStatusUpdated', updatedPartner.rows[0]);
    res.json(updatedPartner.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;