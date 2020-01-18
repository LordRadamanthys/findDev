const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringArray')
module.exports = {
    async index(req, res) {
        const devs = await Dev.find()

        return res.json(devs)
    },


    async store(req, res) {

        const { github_username, techs, latitude, longitude } = req.body
        const user = await Dev.findOne({ github_username })
        if (user) return res.json({ error: "Usuario ja existe" })
        const apiResponse = await axios.get('https://api.github.com/users/' + github_username)
        const { name = login, avatar_url, bio } = apiResponse.data

        const techsArray = parseStringAsArray(techs)

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        const dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
        })
        return res.json(dev)
    },

    async update(req, res) {
        const { github_username, techs, latitude, longitude ,id} = req.body
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
                    "techs":techsArray,
                    location
                }
            }).then(() => {
                console.log(latitude)
                return res.status(200).json({ message: "ok" })
            }).catch((error) => {
                return res.status(400).send({ erro: error.message })
            })

    },

    async delete(req, res) {
        const { github_username, name, id } = req.body
        await Dev.deleteOne({ _id: id }).then(() => {
            return res.send("ok")
        }).catch((err) => {
            return res.send(err.message)
        })
    }
}
