import db from '../config/db.js';

// CREATE
export const createPartner = (req, res) => {
  const partner = req.body;
  const sql = `INSERT INTO transport_partner
    (name, business_name, contact_person, phone, alternate_phone, email, address_line, city, state, pin_code,
     pan_number, gst_number, vehicle_details, rate_per_km, base_rate, is_active, created_at, updated_at, created_by, updated_by) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?, ?)`;

  const values = [
    partner.name, partner.business_name, partner.contact_person, partner.phone, partner.alternate_phone,
    partner.email, partner.address_line, partner.city, partner.state, partner.pin_code,
    partner.pan_number, partner.gst_number, JSON.stringify(partner.vehicle_details), partner.rate_per_km,
    partner.base_rate, partner.is_active, partner.created_by, partner.updated_by
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, message: 'Partner created' });
  });
};

// READ ALL
export const getAllPartners = (_, res) => {
  db.query('SELECT * FROM transport_partner', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// READ ONE
export const getPartnerById = (req, res) => {
  db.query('SELECT * FROM transport_partner WHERE transport_id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (!result.length) return res.status(404).send('Not found');
    res.json(result[0]);
  });
};

// UPDATE
export const updatePartner = (req, res) => {
  const partner = req.body;
  const sql = `UPDATE transport_partner SET 
    name = ?, business_name = ?, contact_person = ?, phone = ?, alternate_phone = ?, email = ?, 
    address_line = ?, city = ?, state = ?, pin_code = ?, pan_number = ?, gst_number = ?, 
    vehicle_details = ?, rate_per_km = ?, base_rate = ?, is_active = ?, 
    updated_at = NOW(), updated_by = ? WHERE transport_id = ?`;

  const values = [
    partner.name, partner.business_name, partner.contact_person, partner.phone, partner.alternate_phone,
    partner.email, partner.address_line, partner.city, partner.state, partner.pin_code,
    partner.pan_number, partner.gst_number, JSON.stringify(partner.vehicle_details),
    partner.rate_per_km, partner.base_rate, partner.is_active, partner.updated_by,
    req.params.id
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Partner updated' });
  });
};

// DELETE
export const deletePartner = (req, res) => {
  db.query('DELETE FROM transport_partner WHERE transport_id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Partner deleted' });
  });
};
