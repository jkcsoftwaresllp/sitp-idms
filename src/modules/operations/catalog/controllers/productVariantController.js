import * as productVariantService from '../services/productVariantService.js';

export const getAllVariants = async (req, res) => {
  try {
    const variants = await productVariantService.getAllVariants();
    res.json({
      success: true,
      data: variants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getVariantsByProductId = async (req, res) => {
  try {
    const variants = await productVariantService.getVariantsByProductId(parseInt(req.params.productId));
    res.json({
      success: true,
      data: variants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getVariantById = async (req, res) => {
  try {
    const variant = await productVariantService.getVariantById(parseInt(req.params.id));
    res.json({
      success: true,
      data: variant
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

export const createVariant = async (req, res) => {
  try {
    const variant = await productVariantService.createVariant(req.body);
    res.status(201).json({
      success: true,
      message: 'Product variant created successfully',
      data: variant
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const updateVariant = async (req, res) => {
  try {
    const variant = await productVariantService.updateVariant(parseInt(req.params.id), req.body);
    res.json({
      success: true,
      message: 'Product variant updated successfully',
      data: variant
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteVariant = async (req, res) => {
  try {
    const result = await productVariantService.deleteVariant(parseInt(req.params.id));
    res.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
