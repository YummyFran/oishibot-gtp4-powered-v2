const { Configuration, OpenAIApi } = require('openai')
const dotenv = require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const server = express()

const config = new Configuration({
    organization: process.env.MY_ORG,
    apiKey: process.env.OPENAI_KEY
})
const ai = new OpenAIApi(config)


server.use(bodyParser.json())
server.use(cors())

server.post('/', async (req, res) => {
    const { message } = req.body
    console.log('thinking...')
    const completion = await ai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {role: 'user', content: message}
        ]
    }).catch(err => console.log("Unable to fetch data"))
    const result = completion.data.choices[0].message.content
    console.log(result)
    res.json(result)
})

server.listen(3000, () => console.log("listening to port 3000"))