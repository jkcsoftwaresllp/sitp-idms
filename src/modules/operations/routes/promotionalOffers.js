const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// CREATE
router.post('/', async (req, res) => {
  try {
    const {
      name, description, offer_type, discount_value, discount_type,
      max_discount_amount, min_order_amount, usage_limit_per_customer,
      total_usage_limit, start_date, end_date, is_active,
      terms_conditions, created_by
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO promotional_offers (
        name, description, offer_type, discount_value, discount_type,
        max_discount_amount, min_order_amount, usage_limit_per_customer,
        total_usage_limit, start_date, end_date, is_active,
        terms_conditions, created_by, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        name, description, offer_type, discount_value, discount_type,
        max_discount_amount, min_order_amount, usage_limit_per_customer,
        total_usage_limit, start_date, end_date, is_active,
        terms_conditions, created_by
      ]
    );

    res.status(201).json({ message: 'Offer created', offer_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  try {
    const [offers] = await pool.query('SELECT * FROM promotional_offers');
    res.json(offers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const [offer] = await pool.query('SELECT * FROM promotional_offers WHERE offer_id = ?', [req.params.id]);
    if (offer.length === 0) return res.status(404).json({ message: 'Offer not found' });
    res.json(offer[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const {
      name, description, offer_type, discount_value, discount_type,
      max_discount_amount, min_order_amount, usage_limit_per_customer,
      total_usage_limit, start_date, end_date, is_active,
      terms_conditions, updated_by
    } = req.body;

    const [result] = await pool.query(
      `UPDATE promotional_offers SET
        name = ?, description = ?, offer_type = ?, discount_value = ?, discount_type = ?,
        max_discount_amount = ?, min_order_amount = ?, usage_limit_per_customer = ?,
        total_usage_limit = ?, start_date = ?, end_date = ?, is_active = ?,
        terms_conditions = ?, updated_by = ?, updated_at = NOW()
      WHERE offer_id = ?`,
      [
        name, description, offer_type, discount_value, discount_type,
        max_discount_amount, min_order_amount, usage_limit_per_customer,
        total_usage_limit, start_date, end_date, is_active,
        terms_conditions, updated_by, req.params.id
      ]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Offer not found' });
    res.json({ message: 'Offer updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM promotional_offers WHERE offer_id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Offer not found' });
    res.json({ message: 'Offer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

