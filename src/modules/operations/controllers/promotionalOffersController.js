// controllers/promotionalOffersController.js

import { pool } from '../config/db.js';  // ✅ Correct

// GET all offers
export const getAllOffers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM promotional_offers');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single offer
export const getOfferById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM promotional_offers WHERE offer_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Offer not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE offer
export const createOffer = async (req, res) => {
  try {
    const offer = req.body;
    const [result] = await pool.query('INSERT INTO promotional_offers SET ?', [offer]);
    res.status(201).json({ message: 'Offer created', offer_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE offer
export const updateOffer = async (req, res) => {
  try {
    const [result] = await pool.query(
      'UPDATE promotional_offers SET ? WHERE offer_id = ?',
      [req.body, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Offer not found' });
    res.json({ message: 'Offer updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE offer
export const deleteOffer = async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM promotional_offers WHERE offer_id = ?',
      [req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Offer not found' });
    res.json({ message: 'Offer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

