const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

// const url = `mongodb+srv://fullstack:${password}@cluster0.ltbve.mongodb.net/test?ssl=true&retryWrites=true`
const url = `mongodb://fullstack:${password}@cluster0-shard-00-00.ltbve.mongodb.net:27017,cluster0-shard-00-01.ltbve.mongodb.net:27017,cluster0-shard-00-02.ltbve.mongodb.net:27017/note-app?ssl=true&replicaSet=atlas-6svlgv-shard-0&authSource=admin&retryWrites=true&w=majority`
console.log(url)

mongoose.connect(url, {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true
})

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'HTML is Easy',
    date: new Date(),
    important: true
})

console.log('right before save')
note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
}).catch(reason => {
    console.log(reason)
})
