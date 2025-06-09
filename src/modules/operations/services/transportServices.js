import db from '../config/db.js';
import { queries } from '../db/queries.js';
import { formatPartnerValues } from '../utils/formatters.js';


//  Create a new transport partner

export const createPartner = (partnerData) => {
  const values = formatPartnerValues(partnerData);
  return new Promise((resolve, reject) => {
    db.query(queries.insertPartner, values, (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
};


//  Get all transport partners
 
export const getAllPartners = () => {
  return new Promise((resolve, reject) => {
    db.query(queries.getAllPartners, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};


 // Get a partner by ID
 
export const getPartnerById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(queries.getPartnerById, [id], (err, result) => {
      if (err) return reject(err);
      if (!result.length) return resolve(null);
      resolve(result[0]);
    });
  });
};


 // Update partner (dynamic fields only)
 
export const updatePartner = (id, updates) => {
  return new Promise((resolve, reject) => {
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(updates)) {
      fields.push(`${key} = ?`);
      values.push(key === 'vehicle_details' ? JSON.stringify(value) : value);
    }

    fields.push('updated_at = NOW()');
    const sql = `UPDATE transport_partner SET ${fields.join(', ')} WHERE transport_id = ?`;
    values.push(id);

    db.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};


//  Delete a partner by ID

export const deletePartner = (id) => {
  return new Promise((resolve, reject) => {
    db.query(queries.deletePartnerById, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
