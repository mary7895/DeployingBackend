const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadImage'); 
const {
  signup,
  getCompanyById,
  getAllCompanies,
  companyLogin,
  updateCompanyData,
  deleteCompanyData,
  getCompaniesByCity,
  countCompaniesInCity,
  countAllCompanies,
  sendEmail,
  resetPassword
} = require('../controllers/CompanyController');
const { auth } = require('../middlewares/auth');

// Routes
router.post('/signup',
  //  upload.fields([{ name: 'companyLogo', maxCount: 1 }, { name: 'companyImage', maxCount: 1 }]),
    signup);
router.get('/:id', getCompanyById);
router.get('/', getAllCompanies);
router.post('/login', companyLogin);
router.post('/sendMail',sendEmail);
router.patch('/:id', auth, updateCompanyData);
router.delete('/:id', auth, deleteCompanyData);
router.get('/city/:city', getCompaniesByCity);
router.get('/count/:city', countCompaniesInCity);
router.get('/count-all', countAllCompanies);
router.post('/resetPassword', resetPassword)

module.exports = router;
