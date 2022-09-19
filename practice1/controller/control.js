const Pratice = require('../schema/schema')


const getAllItems = async (req, res) => {
    try {
         let task = await Pratice.find({})
         if(!task){
            return res.json({success:false , msg:'No task exsit'})
         }
         res.json(task)
    } catch (error) {
        res.json({success: false , msg:'can not get task'})
    }
}

const createItem = async (req, res) => {
    try {
        let task = await Pratice.create({name:req.body.name})
        if(!task){
         return res.json({success:false , msg:'name is required'})
        }
        res.json(task)
    } catch (error) {
        res.json({success:false , msg:'can not create task'})
    }
}

const editItem = async (req, res) => {
    try {
        let task = await Pratice.findOneAndUpdate({_id:req.params.id},{name:req.body.name},{
            new:true
        })
        res.json(task)
    } catch (error) {
        res.json({success:false , msg:'something went wrong'})
        
    }
}

const getSpecificItem = async (req, res) => {
    try {
        let task = await Pratice.findOne({_id:req.params.id})
        if(!task){
            return res.json({success:false , msg:'no task exsist'})
        }
        res.json(task)
    } catch (error) {
        res.json({success:false , msg:'Something went wrong'})
    }
}

const deleteItem = async (req, res) => {
    try {
        const task = await Pratice.findOneAndRemove({_id:req.params.id})
        res.json(task)
    } catch (error) {
        res.json({success:false , msg:'Something went wrong'})
        
    }
}

module.exports = {
    getAllItems,
    createItem,
    editItem,
    getSpecificItem,
    deleteItem
}