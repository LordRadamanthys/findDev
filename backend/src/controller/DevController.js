const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringArray')
const { findConnections, sendMessage , sendMessageRemove} = require('../websocket')
module.exports = {
    async index(req, res) {
        const devs = await Dev.find()

        return res.json(devs)
    },


    async store(req, res) {

        const { github_username, techs, latitude, longitude } = req.body
        const gitUser = github_username.toLowerCase() 
        const newTechs = techs.toLowerCase() 
         
        const user = await Dev.findOne({ github_username })
        if (user) return res.json({ error: "Usuario ja existe" })
        const apiResponse = await axios.get('https://api.github.com/users/' + github_username)
        const { name = login, avatar_url, bio } = apiResponse.data

        const techsArray = parseStringAsArray(newTechs)

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        const dev = await Dev.create({
            github_username:gitUser,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
        })

        //filtrar as conexoes que estão a no maximo 10km de mim
        const sendToSocketMessageTo = await findConnections(
            { latitude, longitude },
            techsArray
        )
        sendMessage(sendToSocketMessageTo, 'new-dev', dev)
        return res.json(dev)
    },

    async update(req, res) {
        const { github_username, techs, latitude, longitude, id } = req.body
        const techsArray = parseStringAsArray(techs)
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
        await Dev.updateOne({
            "_id": id
        }, // Filter
            {
                $set: {
                    "techs": techsArray,
                    location
                }
            }).then(() => {
                return res.status(200).json({ message: "ok" })
            }).catch((error) => {
                return res.status(400).send({ erro: error.message })
            })

    },

    async delete(req, res) {
        const { github_username, name, id } = req.body
        const response = await Dev.deleteOne({ _id: id })

        
        
        //sendMessageRemove('remove-dev')
        return res.send("ok")

    }
}
