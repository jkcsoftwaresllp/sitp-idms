export const queries = {
  insertPartner: `
    INSERT INTO transport_partner 
    (name, business_name, contact_person, phone, alternate_phone, email, address_line, city, state, pin_code,
     pan_number, gst_number, vehicle_details, rate_per_km, base_rate, is_active, created_at, updated_at, created_by, updated_by) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?, ?)`,
  
  getAllPartners: `SELECT * FROM transport_partner`,

  getPartnerById: `SELECT * FROM transport_partner WHERE transport_id = ?`,

  deletePartnerById: `DELETE FROM transport_partner WHERE transport_id = ?`
};
