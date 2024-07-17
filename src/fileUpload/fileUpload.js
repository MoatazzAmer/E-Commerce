import { appError } from '../utils/appError.js'
import multer from "multer"
import { v4 as uuidv4 } from 'uuid'


const uploadFile = (folderName)=>{
    const storage = multer.diskStorage({
        destination:(req, file, cb) =>{
        cb(null, `uploads/ ${folderName}`)
        },
        filename:  (req, file, cb)=> {
        cb(null,uuidv4 + "-" + file.originalname)
        }
    })

    function fileFilter (req, file, cb) {
        if(file.mimetype.startsWith('image')){
            cb(null, true)
        }else{
            cb(new appError('please upload Image Only ', 401),false)
        }
        
    }
    const upload = multer({ storage  , fileFilter })
    return upload
}

export const uploadSingleFile =(filename,folderName)=>{
    return uploadFile(folderName).single(filename)
}

export const uploadMixOfFiles =(arrayOfFields,folderName)=>{
    return uploadFile(folderName).fields(arrayOfFields)
}