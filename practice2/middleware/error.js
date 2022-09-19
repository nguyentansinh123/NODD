const errHandler= async (err, req , res ,next)=>{
    console.log(err);
    return res.status(500).json({success: false , msg: 'Something when wrong please comeback later'})
}

module.exports = errHandler