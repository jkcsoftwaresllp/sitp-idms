// services/promotionalService.js
import pool from '../../config/db.js'; // Adjust path if needed

export const getAllOffersService = async () => {
  const [rows] = await pool.query('SELECT * FROM promotional_offers');
  return rows;
};

export const getOfferByIdService = async (id) => {
  const [rows] = await pool.query('SELECT * FROM promotional_offers WHERE offer_id = ?', [id]);
  return rows;
};

export const createOfferService = async (offer) => {
  const [result] = await pool.query('INSERT INTO promotional_offers SET ?', [offer]);
  return result.insertId;
};

export const updateOfferService = async (id, updatedData) => {
  const [result] = await pool.query('UPDATE promotional_offers SET ? WHERE offer_id = ?', [updatedData, id]);
  return result;
};

export const deleteOfferService = async (id) => {
  const [result] = await pool.query('DELETE FROM promotional_offers WHERE offer_id = ?', [id]);
  return result;
};
