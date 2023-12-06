const Sub = require("../models/createsub")
var bcrypt = require('bcryptjs')
const { use } = require("passport")
const Post = require("../models/posts")
const Report = require("../models/report")

const reportAdd = async (req, res) => {
    // console.log("ddd")
    try {
        // const { id } = req.query
        const { user } = req
        const { concern, reportedPost, id} = req.body

        if (!concern || !reportedPost ) {
            res.status(400).send('Please fill all details')
        }

        const createReport = new Report({
            concern: concern,
            reportedBy: user._id,
            reportedPost: reportedPost,
            reportedSub: id
        })
        await createReport.save()
        res.status(200).send('Create Report successfully')
        // const posts = Post.find()
        // res.status(200).json({ posts })

    } catch (error) {
        res.status(500).send('Error' + error)
    }
}

const reportShow = async (req, res) => {
    // let data = await Users.find()

    let { id } = req.query
    // Calculate the date 10 days ago
    const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)

    // Find reports with reportedSub matching the ID and created before ten days ago
    const reportsToDelete = await Report.find({
        reportedSub: id,
        createdAt: { $lt: tenDaysAgo },
    })
    
    // Delete the old reports
    await Report.deleteMany({ _id: { $in: reportsToDelete.map(report => report._id) } })
    // const {user} = req
    const reports = await Report.find({ reportedSub: id }).populate("reportedPost").populate("reportedBy")
    // console.log(subs, '<<<<<<<<<')
    res.status(200).json({ reports })
}

const block = async (req, res) => {
    const { id } = req.body
    console.log(id, "iddddddd")
    if (!id) return res.status(400).send('id is empty')
    const report = await Report.findOne({ _id: id })
    if (!report) return res.status(404).send('report not found')
    // if (post.upvotes.includes(user._id)) return res.status(204).send("already upvoted")
    try {
        // console.log("hehehehe")
        const report1 = await Report.findOne({ _id: id })
        report1.isBlocked = true
        const post = await Post.findById(report1.reportedPost[0])
        const updateSub = await Sub.updateOne({ _id: report1.reportedSub }, {
            $push: { blocked: post.postedBy },
            $pull: { joined: post.postedBy },
        })
        await post.remove()
        await report1.remove()
        const report = await Report.find({reportedSub : report1.reportedSub}).populate("reportedPost").populate("reportedBy")
        res.status(200).json({ report })
        // res.status(200).json({ isUp: true })
    } catch (error) {
        console.log(error, 'error')
        res.status(500).send(error)
    }
}

const deleteReport = async (req, res) => {
    // const { user } = req
    const { id } = req.body
    if (!id) return res.status(400).send('id is empty')
    const report = await Report.findOne({ _id : id })
    if (!report) return res.status(404).send('report not found')

    // if (post.upvotes.includes(user._id)) return res.status(204).send("already upvoted")
    try {
        console.log("hehehehe")
        const report = await Report.findOne({ _id : id })
        const post = await Post.findById(report.reportedPost[0])
        await post.remove()
        await report.remove()
        // await post.remove()
        const report1 = await Report.find({reportedSub : report.reportedSub}).populate("reportedPost").populate("reportedBy")
        res.status(200).json({ report1 })
        // res.status(200).json({ isUp: true })
    } catch (error) {
        console.log(error, 'error')
        res.status(500).send(error)
    }
}

const ignore = async (req, res) => {
    const { id } = req.body
    const report = await Report.findById(id)
    if (report) {
        report.isIgnored = true
        const updateReport = await report.save()
        const report1 = await Report.find({reportedSub : report.reportedSub}).populate("reportedPost").populate("reportedBy")
        res.json({ report1 })
    }
}

const check = async ( req, res) => {
    const { id } = req.query
    const report = await Report.findOne( {reportedPost :id})
    res.status(200).json({report})
}


module.exports = {
    reportAdd,
    reportShow,
    block,
    deleteReport,
    ignore,
    check
}