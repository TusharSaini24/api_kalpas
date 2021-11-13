const csv = require('csvtojson'); 
const fs = require('fs');

// imported modal
const data = require('../model/data')

exports.sendData = async(req,res) => {
    // console.log(req.body);
    console.log(req.file);
    const fname = req.file.filename;

    csv()  
.fromFile(req.file.path)  // retrieving data from file
.then((jsonObj)=>{  
    console.log(jsonObj);  
    
    // while saving data each json data is stored with their filename
    for(var i =0 ;i<jsonObj.length;i++)
    {
        jsonObj[i]["filename"] = fname;
    }

     data.insertMany(jsonObj,(err,data)=>{  
            if(err){  
                console.log(err);  
            }
            else{
                res.status(202).send('file saved !!!');
            }
     });  
   });  

}

exports.delData = async (req,res)=>{
    data.findByIdAndRemove({_id: req.params.id}, 
        function(err, docs){
     if(err) res.json(err);
     else    res.send('deleted successfully');
     });
}

exports.viewData = async(req,res)=>{

    var result = await data.find();
    // console.log(result);
    res.json(result);
}

exports.updateData = async (req,res)=>{
    let id = req.params.id

    let info = {
        salary:req.body.salary
    }

    const result = await data.findByIdAndUpdate(id,info,{new:true})
    res.json(result)
}