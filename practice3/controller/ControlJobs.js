const Job = require('../model/Job')

const getAlljob = async (req,res)=>{
    const jobs = await Job.find({
        createdBy:req.user.UserID
    })
    res.json({jobs})
}

const getSingleProduct = async (req,res)=>{
    let {id} = req.params
    const job = await Job.findOne({id,createdBy:req.user.UserID })
    res.json({job})
}

const createJob =async (req,res)=>{
    req.body.createdBy = req.user.UserID
    const job = await Job.create(req.body)
    res.json({job})

}
const UpdateJob = async (req,res)=>{
    let {id} = req.params

    const job = await Job.findByIdAndUpdate({_id:id,createdBy:req.user.UserID},req.body,{new:true})
    res.json({job})
}

const deleteJob = async(req,res)=>{
    let {id} = req.params
    const job = await Job.findByIdAndDelete({_id:id ,createdBy:req.user.UserID })
    res.json({job})
}

module.exports = {
    getAlljob,
    getSingleProduct,
    createJob,
    UpdateJob,
    deleteJob
}