// controllers/promotionalOffersController.js

import { pool } from '../config/db.js';  // ✅ Correct

// GET all offers
// controllers/promotionalOffers.controller.js
import {
  getAllOffersService,
  getOfferByIdService,
  createOfferService,
  updateOfferService,
  deleteOfferService,
} from '../services/promotionalService.js';

export const getAllOffers = async (req, res) => {
  try {
    const rows = await getAllOffersService();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOfferById = async (req, res) => {
  try {
    const rows = await getOfferByIdService(req.params.id);
    if (rows.length === 0) return res.status(404).json({ message: 'Offer not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createOffer = async (req, res) => {
  try {
    const offerId = await createOfferService(req.body);
    res.status(201).json({ message: 'Offer created', offer_id: offerId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateOffer = async (req, res) => {
  try {
    const result = await updateOfferService(req.params.id, req.body);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Offer not found' });
    res.json({ message: 'Offer updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteOffer = async (req, res) => {
  try {
    const result = await deleteOfferService(req.params.id);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Offer not found' });
    res.json({ message: 'Offer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
