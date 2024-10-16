const express = require('express');
const { pool, io } = require('../index');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const orders = await pool.query('SELECT * FROM orders WHERE status = $1', ['pending']);
    res.json(orders.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const partnerId = req.user.id;

  try {
    const updatedOrder = await pool.query(
      'UPDATE orders SET status = $1, partner_id = $2 WHERE id = $3 RETURNING *',
      [status, partnerId, id]
    );

    if (updatedOrder.rows.length === 0) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    io.emit('orderUpdated', updatedOrder.rows[0]);
    res.json(updatedOrder.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;