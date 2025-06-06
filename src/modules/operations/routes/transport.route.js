import { Router } from 'express';
import {
  createPartner,
  getAllPartners,
  getPartnerById,
  updatePartner,
  deletePartner
} from '../controllers/transportController.js';

const router = Router();

router.post('/createpartner', createPartner);
router.get('/getallpartner', getAllPartners);
router.get('/getpartnerBy/:id', getPartnerById);
router.put('/updatepartnerBy/:id', updatePartner);
router.delete('/deletepartnerBy/:id', deletePartner);

export default router;