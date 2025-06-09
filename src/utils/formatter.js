export const formatPartnerValues = (partner) => [
  partner.name, partner.business_name, partner.contact_person, partner.phone, partner.alternate_phone,
  partner.email, partner.address_line, partner.city, partner.state, partner.pin_code,
  partner.pan_number, partner.gst_number, JSON.stringify(partner.vehicle_details),
  partner.rate_per_km, partner.base_rate, partner.is_active, partner.created_by, partner.updated_by
];
