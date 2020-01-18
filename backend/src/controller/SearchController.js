const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringArray')

module.exports = {
//buscar todos os devs 10km e por tecs
async index(req,res){
    const {latitude, longitude, techs} = req.query
    const techsArray = parseStringAsArray(techs)
    
    const devs = await Dev.find({
        techs:{
            $in:techsArray,
        },
        location:{
            $near:{
                $geometry:{
                    type:'Point',
                    coordinates:[longitude,latitude]
                },
                $maxDistance:90000,
            }
        }
        
    }).then((response)=>{
        return res.json(response)
    }).catch((err)=>{
        return res.json({erro:err})
    })
    //console.log(techsArray)
    
}

}
