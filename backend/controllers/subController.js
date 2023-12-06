const Sub = require("../models/createsub")
var bcrypt = require('bcryptjs')
const { use } = require("passport")
const Post = require("../models/posts")

const subAdd = async (req, res) => {
    // console.log(req.body)
    try {
        const { caption, desc, image, tags, bannedWords } = req.body
        console.log(req.user._id)
        if (!caption || !desc || !image) {
            res.status(400).send('Please fill all details')
        }
        const createSub = new Sub({
            caption: caption,
            desc: desc,
            image: image,
            tags: tags,
            bannedWords: bannedWords,
            owner: req.user._id,
            joined: req.user._id
        })
        await createSub.save()
        res.status(200).send('Create Sub successfully')
    } catch (error) {
        res.status(500).send('Error' + error)
    }
}

const subShowMine = async (req, res) => {
    // let data = await Users.find()

    let { user } = req
    const subs = await Sub.find({ owner: user._id }).populate("owner")
    // console.log(subs, '<<<<<<<<<')
    res.status(200).json({ subs })
}

const subShowAll = async (req, res) => {
    // let data = await Users.find()
    const subs = await Sub.find().populate("owner")
    // console.log(subs, '<<<<<<<<<')
    res.status(200).json({ subs })
}

const subShowExcept = async (req, res) => {
    let { user } = req
    // let data = await Users.find()
    const subs = await Sub.find({ owner: { $ne: user._id } }).populate("owner")
    res.status(200).json({ subs })
}

const subOne = async (req, res) => {
    // let data = await Users.find()

    let { id } = req.query
    // console.log(id, req.query,'<<<<<<<<<')
    const subs = await Sub.findById(id).populate("owner").populate("blocked")
    // console.log(subs, '<<<<<<<<<')
    res.status(200).json({ subs })
}

const subReq = async (req, res) => {

    const { id } = req.body
    const { user } = req
    const sub = await Sub.findOne({ _id: id })
    console.log(id, " <<<+++>>>", user._id)
    if (sub.joined.includes(user._id)) return res.status(204).send("already joined")
    if (sub.left.includes(user._id)) return res.status(208).send("U have left this Sub, Can't join again....cope!!!")
    if (sub.blocked.includes(user._id)) return res.status(212).send("U have been BLOCKED !!!")
    Sub.findByIdAndUpdate(id, {
        $push: { req: user._id }
    }, {
        new: true
    },
        (error, result) => {
            if (error) {
                return res.status(422).json({ error: error })
            }
            res.json(result)
            console.log(result)
        })
}

const subGetReq = async (req, res) => {
    // let data = await Users.find()

    let { id } = req.query
    console.log(id)
    const requ = await Sub.findById(id).populate("req")
    console.log(requ)
    res.status(200).json({ requ })
}

const subJoin = async (req, res) => {
    const { id } = req.query
    const { reqId } = req.body
    if (!id) return res.status(400).send('id is empty')
    const sub = await Sub.findOne({ _id: id })
    if (!sub) return res.status(404).send('Sub not found')
    // if (post.upvotes.includes(user._id)) return res.status(204).send("already upvoted")
    try {
        // console.log("hehehehe")
        const updatePost = await Sub.updateOne({ _id: id }, {
            $push: { joined: reqId },
            $pull: { req: reqId }
        })
        const sub = await Sub.findById(id).populate("req")
        res.status(200).json({ sub })
        // res.status(200).json({ isUp: true })
    } catch (error) {
        console.log(error, 'error')
        res.status(500).send(error)
    }
}

const subReject = async (req, res) => {
    const { id } = req.query
    const { reqId } = req.body
    if (!id) return res.status(400).send('id is empty')
    const sub = await Sub.findOne({ _id: id })
    if (!sub) return res.status(404).send('Sub not found')
    // if (post.upvotes.includes(user._id)) return res.status(204).send("already upvoted")
    try {
        // console.log("hehehehe")
        const updatePost = await Sub.updateOne({ _id: id }, {
            $pull: { req: reqId }
        })
        const sub = await Sub.findById(id).populate("req")
        res.status(200).json({ sub })
        // res.status(200).json({ isUp: true })
    } catch (error) {
        console.log(error, 'error')
        res.status(500).send(error)
    }
}

const subGetUser = async (req, res) => {
    // let data = await Users.find()
    let { id } = req.query
    // console.log(id)
    const requ = await Sub.find({ _id: id, }).populate("joined").populate("blocked")
    console.log(requ)
    console.log("kadfbhrgbvjerugbekruhyb")
    res.status(200).json({ requ })
}

const subDelete = async (req, res) => {
    // const { user } = req
    const { reqId } = req.body
    if (!reqId) return res.status(400).send('user is empty')
    const sub = await Sub.findOne({ _id: reqId })
    if (!sub) return res.status(404).send('Sub not found')

    // if (post.upvotes.includes(user._id)) return res.status(204).send("already upvoted")
    try {
        // console.log("hehehehe")
        const sub = await Sub.findOne({ _id: reqId })
        await Post.deleteMany({ postedIn: reqId })
        await sub.remove()
        // await post.remove()
        res.status(200).json({ sub })
        // res.status(200).json({ isUp: true })
    } catch (error) {
        console.log(error, 'error')
        res.status(500).send(error)
    }
}

const subLeave = async (req, res) => {
    const { user } = req
    const { reqId } = req.body
    // if (!id) return res.status(400).send('id is empty')
    const sub = await Sub.findOne({ _id: reqId })
    if (!sub) return res.status(404).send('Sub not found')
    if (await Sub.findOne({ owner: user._id })) return res.status(208).send(" U cannot leave because you are the moderator")
    if (sub.joined.includes(user._id)) {
        try {
            // console.log("hehehehe")
            const updatePost = await Sub.updateOne({ _id: reqId }, {
                $pull: { joined: user._id },
                $push: { left: user._id }
            })
            const sub = await Sub.find()
            res.status(200).json({ sub })
            // res.status(200).json({ isUp: true })
        } catch (error) {
            console.log(error, 'error')
            res.status(500).send(error)
        }
    } else return res.status(204).send(" Not yet joined")

}

module.exports = {
    subAdd,
    subShowMine,
    subShowExcept,
    subOne,
    subReq,
    subGetReq,
    subJoin,
    subReject,
    subGetUser,
    subDelete,
    subLeave,
    subShowAll,
    // subShowSearch
} 