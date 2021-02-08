const Cooperativa= require('../models/Cooperativa');

const cloudinary= require('cloudinary');
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const fs=require('fs-extra');

export const Principal = async (req, res) => {
   const cooperativas= await Cooperativa.find({}).lean();
    res.render('frm_Principal',{cooperativas}); 
    console.log(cooperativas)
}

export const getCooperativaPrincipal = async (req, res) => {
   const cooperativas = await Cooperativa.find({}).lean();
   res.render('frm_registroCooperativa', { cooperativas });
}
export const createCooperativa = async (req, res)=>{
   const { nombre, direccion } = req.body;
   console.log(req.file);
   const result = await cloudinary.v2.uploader.upload(req.file.path);
   const newCoperativa = new Cooperativa({
      nombre,
      direccion,
      imageURL: result.url,
      public_id: result.public_id
   });
   await newCoperativa.save();
   await fs.unlink(req.file.path)
   res.redirect('/guardarCooperativa/add')
}

//modificar
export const getCooperativaById =  async(req, res) => {
   const cooperativa = await Cooperativa.findById(req.params.id);
   res.render('partials/modificar_cooperativa_formulario', { cooperativa });
}
export const updateCooperativaById = async (req, res) => {
   const {nombre, direccion} = req.body;
   await Cooperativa.findByIdAndUpdate(req.params.id,{nombre, direccion});
   res.redirect('/guardarCooperativa/add');
} 
export const deleteCooperativaById = async(req, res) => {

}