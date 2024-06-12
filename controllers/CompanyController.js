
const {companyModel} = require('../models/CompanyModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const uploadOptions = require('../middlewares/uploadImage');

const signup = async (req, res, next) => {
  const files = req.files;
  const company = req.body;

  if (!files || !files.companyLogo || !files.companyImage) {
    return res.status(400).json({ message: "There is no image in this request" });
  }

  const logoFileName = files.companyLogo[0].filename;
  const imageFileName = files.companyImage[0].filename;

  try {
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    company.companyLogo = `${basePath}${logoFileName}`;
    company.companyImage = `${basePath}${imageFileName}`;

    const { companyName, companyIndustry, companyEmail, companyPassword, companyLocation } = req.body;

    if (!companyName || !companyIndustry || !companyEmail || !companyPassword || !companyLocation || !companyLocation.state || !companyLocation.city) {
      return res.status(400).json({ message: 'Email, password, name, industry, logo, image, state, and city are required' });
    }

    const existingCompany = await companyModel.findOne({ companyEmail });
    if (existingCompany) {
      return res.status(409).json({ message: 'Company with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(companyPassword, 10);

    const newCompany = new companyModel({
      companyName,
      companyIndustry,
      companyEmail,
      companyPassword: hashedPassword,
      companyLogo: `${basePath}${logoFileName}`,
      companyImage: `${basePath}${imageFileName}`,
      companyLocation: {
        state: companyLocation.state,
        city: companyLocation.city
      }
    });

    await newCompany.save();

    return res.status(201).json({ message: 'Company created successfully', company: newCompany });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating company', error: error.message });
  }
};





const companyLogin = async (req, res) => {
  let { companyEmail, companyPassword } = req.body;

  if (!companyEmail || !companyPassword) {
    return res.status(400).json({ message: 'You must provide email and password' });
  }

  try {
    let company = await companyModel.findOne({ companyEmail });
    if (!company) {
      return res.status(404).json({ message: 'Invalid email or password' });
    }

    let isValid = await bcrypt.compare(companyPassword, company.companyPassword);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    let token = jwt.sign({ data: { companyEmail: company.companyEmail, id: company._id } }, 'This_is_my_jwt');

    res.status(200).json({ message: 'Success', token: token });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};



const getCompanyById = async (req, res) => {
  let { id } = req.params;
  try {
    let company = await companyModel.findById(id).exec();
    if (company) {
      res.status(200).json({ message: "success", data: company });
    } else {
      res.status(400).json({ message: `Company doesn't exist` });
    }
  } catch (err) {
    res.status(500).json({ message: `try again please` });
  }
};


const getAllCompanies= async(req,res)=>{
try{
  let allCompany=await companyModel.find();
  res.status(200).json({message:"succes",data:allCompany})
}catch(err){
  res.status(500).json({message:err})
}

}



const updateCompanyData = async (req, res) => {
  let { id } = req.params;
  let { name } = req.body;

  try {
    let updatedData = await companyModel.findByIdAndUpdate(id, { companyName: name }, { new: true });
    res.status(200).json({ "message": `company data updated Sucessfully`, data: updatedData });
  } catch (error) {
    res.status(422).json({ 'message': error.message });
  }
}


const deleteCompanyData= async(req,res)=>{
  let {id}=req.params;
  try{
    const deleteCompanyAccount = await companyModel.findByIdAndDelete(id);
    if(deleteCompanyAccount){
      res.status(200).json({"message":`account deleted Successfully`});
    }else{
      res.status(404).json({"message":`account not found `})
    }
  
  }catch(error){
    res.status(422).json({ "message": error.message });
  }
}


// search by city
const getCompaniesByCity = async (req,res)=>{
  let {city}=req.params;
  try{
    let companies = await companyModel.find({"companyLocation.city":city});
    if(companies.length>0){
      res.status(200).json({message:"success",data:companies});
    }else{
      res.status(404).json({ message: `No companies found in ${city}` });
    }
  }catch(error){
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
}

// count by city
const countCompaniesInCity = async (req, res) => {
  let { city } = req.params;

  try {
    if (!city) {
      return res.status(400).json({ message: 'City parameter is required' });
    }

    let count = await companyModel.countDocuments({ "companyLocation.city": city });
    res.status(200).json({ message: "success", count: count });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};
// count all companies

const countAllCompanies = async (req, res) => {
  try {
    let count = await companyModel.countDocuments();
    // console.log(`Number of companies: ${count}`);
    res.status(200).json({ message: "success", count: count });
  } catch (error) {
    // console.error(`Error counting all companies: ${error.message}`);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};







module.exports = {signup, getCompanyById,getAllCompanies, companyLogin,updateCompanyData,deleteCompanyData,getCompaniesByCity,countCompaniesInCity,countAllCompanies};
