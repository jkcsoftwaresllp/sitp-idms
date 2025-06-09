import * as transportService from '../services/transportServices.js';

// CREATE
export const createPartner = async (req, res) => {
  try {
    const id = await partnerService.createPartner(req.body);
    res.status(201).json({ id, message: 'Partner created successfully' });
  } catch (error) {
    console.error('Error creating partner:', error);
    res.status(500).json({ message: 'Failed to create partner', error });
  }
};

// READ ALL
export const getAllPartners = async (_, res) => {
  try {
    const partners = await partnerService.getAllPartners();
    res.json(partners);
  } catch (error) {
    console.error('Error fetching partners:', error);
    res.status(500).json({ message: 'Failed to fetch partners', error });
  }
};

// READ ONE
export const getPartnerById = async (req, res) => {
  try {
    const partner = await partnerService.getPartnerById(req.params.id);
    if (!partner) return res.status(404).json({ message: 'Partner not found' });
    res.json(partner);
  } catch (error) {
    console.error('Error fetching partner:', error);
    res.status(500).json({ message: 'Failed to fetch partner', error });
  }
};

// UPDATE
export const updatePartner = async (req, res) => {
  try {
    await partnerService.updatePartner(req.params.id, req.body);
    res.json({ message: 'Partner updated successfully' });
  } catch (error) {
    console.error('Error updating partner:', error);
    res.status(500).json({ message: 'Failed to update partner', error });
  }
};

// DELETE
export const deletePartner = async (req, res) => {
  try {
    await partnerService.deletePartner(req.params.id);
    res.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    console.error('Error deleting partner:', error);
    res.status(500).json({ message: 'Failed to delete partner', error });
  }
};
