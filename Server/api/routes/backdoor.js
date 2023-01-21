const express = require('express');
var cors = require('cors')
const fs = require('fs');
const path = require('path');
const resolve = require('path').resolve;


const router = express.Router();


var selectedPath = resolve('./');
//Methods
router.get('/pwd', cors(),(req, res, next) =>{
    console.log(selectedPath);
    res.status(200).json({
        currentPath: selectedPath
    });
});

router.get('/dirs',  cors(),(req, res, next) =>{
    const response = fs.readdirSync(selectedPath)
        .map((file) =>{
            return file;
        });
    console.log(response);
    res.status(200).json({
        files: response
    });

});

router.get('/back',  cors(),(req, res, next) =>{
    selectedPath = path.join(selectedPath, '..');
    console.log(`Called BACK ${selectedPath}`);
    res.status(200).json({
        currentPath: selectedPath
    });
});

router.post('/open',  cors(),(req, res, next) =>{
    var fileName = req.query.file;
    console.log('Try to open ', fileName);
    if(fs.statSync(path.join(selectedPath, `/${fileName}`))){
        selectedPath = path.join(selectedPath, `/${fileName}`);
        const response = fs.readdirSync(selectedPath)
            .map((file) =>{
                return file;
            });
        console.log(response);
        res.status(200).json({
            currentPath: selectedPath
        });
    }else{
        res.status(400).json({
            message: 'Directory does not exist'
        });
    }
    
});

router.get('/download',  cors(),(req, res, next) =>{
    var fileName = req.query.file;
    var downloadPath = path.join(selectedPath, `/${fileName}`);
    console.log(`Try to download ${fileName}`);
    if(fs.existsSync(downloadPath)){
        return res.status(200).download(downloadPath);
    }else{
        res.status(400).json({
            message: 'File does not exist'
        });
    }
});

router.get('/delete', cors(),(req, res, next) =>{
    console.log(`Try to delete ${req.query.file}`);
    var deletePath = path.join(selectedPath, `/${req.query.file}`);
    if(fs.existsSync(deletePath)){
        try{
            fs.rmSync(deletePath);
        }catch(e){
            res.status(500).json({
                message: 'Error with deleting'
            });
        }
    }else{
        res.status(400).json({
            message: 'File does not exist'
        });
    }
    res.status(200).json({
        message: 'Compite'
    });
});



module.exports = router;