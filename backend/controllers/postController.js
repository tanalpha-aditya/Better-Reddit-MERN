const Post = require("../models/posts")
var bcrypt = require('bcryptjs')
const { use } = require("passport")
const User = require("../models/users")
const Sub = require("../models/createsub")

const postAdd = async (req, res) => {
    console.log("puipui")
    console.log(req.body)
    const { text, postedIn } = req.body
    const sub = await Sub.findById(postedIn)
    console.log("ddd")
    console.log(sub)
    if (sub.joined.includes(req.user._id)) {
        try {
            // console.log(req.user._id
            if (!text) {
                res.status(400).send('Please fill the details')
            }
            const createPost = new Post({
                text: text,
                fname: req.user.fname,
                lname: req.user.lname,
                postedBy: req.user._id,
                postedIn: postedIn
            })
            await createPost.save()
            res.status(200).send('Created Post successfully')
        } catch (error) {
            res.status(500).send('Error' + error)
        }
        console.log("pui pui pui")
    }
    else {
        console.log("pui pui")
        return res.status(204).send("Not Joined, Cannot post")
    }
}

const postShow = async (req, res) => {
    // let data = await Users.find()

    let { id } = req.query
    // const {user} = req
    const posts = await Post.find({ postedIn: id })
    // console.log(subs, '<<<<<<<<<')
    res.status(200).json({ posts })
}

const postShowBlocked = async (req, res) => {
    // let data = await Users.find()

    let { id } = req.query
    // const sub = Sub.findById(id)
    // const {user} = req
    const posts = await Post.find({ postedBy: id })
    console.log(id, '<<<<<<<<<')
    res.status(200).json({ posts })
}

const follow = async (req, res) => {
    let { followId } = req.body
    const { user } = req
    if (!followId) return res.status(400).send('id is empty')
    // console.log(followId,"ddenfejf",user._id)
    // let abc = User.find({_id : followId})
    // console.log(abc._id)
    const usera = await User.findOne({ _id: followId })
    if (!usera) return res.status(404).send('User not found')
    if (usera.follower.includes(user._id)) return res.status(204).send("already followed")
    User.findByIdAndUpdate(followId, {
        $push: { follower: user._id }
    }, {
        new: true
    }, (error, result) => {
        if (error) {
            return res.status(422).json({ error: error })
        }
        User.findByIdAndUpdate(user._id, {
            $push: { following: followId }
        }, { new: true }).then(result => {
            res.json(result)
            // res.status(200).json ()
        }).catch(err => {
            return res.status(422).json({ error: err })
        })
    })
}

const showfollow = async (req, res) => {
    let { user } = req
    const usera = await User.findById(user._id).populate("follower")
    res.status(200).json({ usera })
}

const showfollowing = async (req, res) => {
    let { user } = req
    const usera = await User.findById(user._id).populate("following")
    res.status(200).json({ usera })
}

const unfollow = async (req, res) => {
    const { unfollowId } = req.body
    const { user } = req
    // console.log(unfollowId,"ddenfejf",user._id)

    if (!unfollowId) return res.status(400).send('id is empty')
    // console.log(unfollowId,"ddenfejf",user._id)

    User.findByIdAndUpdate(unfollowId, {
        $pull: { follower: user._id }
    }, {
        new: true
    }, (error, result) => {
        if (error) {
            return res.status(422).json({ error: error })
        }
        User.findByIdAndUpdate(user._id, {
            $pull: { following: unfollowId }
        }, { new: true }).then(result => {
            res.json(result)
        }).catch(err => {
            return res.status(422).json({ error: err })
        })
    })
}

const unfollowing = async (req, res) => {
    const { unfollowingId } = req.body
    const { user } = req
    // console.log(unfollowId,"ddenfejf",user._id)

    if (!unfollowingId) return res.status(400).send('id is empty')
    // console.log(unfollowId,"ddenfejf",user._id)

    User.findByIdAndUpdate(unfollowingId, {
        $pull: { following: user._id }
    }, {
        new: true
    }, (error, result) => {
        if (error) {
            return res.status(422).json({ error: error })
        }
        User.findByIdAndUpdate(user._id, {
            $pull: { follower: unfollowingId }
        }, { new: true }).then(result => {
            res.json(result)
        }).catch(err => {
            return res.status(422).json({ error: err })
        })
    })
}

const postSave = async (req, res) => {
    const { postId } = req.body
    const { user } = req
    // console.log(postId, 'kkkkkkkkkkkkkkkk')

    const post = await Post.findById(postId)
    if (post) {
        post.saved = true
        post.savedBy = user._id
        const updatePost = await post.save()
        res.json({ updatePost })
    }
}

const postShowSavedPost = async (req, res) => {
    // let data = await Users.find()

    let { user } = req
    // const {user} = req
    const posts = await Post.find({ savedBy: user._id, saved: true }).populate("postedIn")
    // console.log(subs, '<<<<<<<<<')
    res.status(200).json({ posts })
}

const postSaveDelete = async (req, res) => {
    const { postId } = req.body
    // console.log(postId, 'kkkkkkkkkkkkkkkk')

    const post = await Post.findById(postId)
    if (post) {
        post.saved = false
        post.savedBy = null

        const updatePost = await post.save()
        res.json({ updatePost })
    }
}

const postUpvote = async (req, res) => {
    const { user } = req
    const { postId } = req.body
    if (!postId) return res.status(400).send('id is empty')
    const post = await Post.findOne({ _id: postId })
    if (!post) return res.status(404).send('Post not found')
    if (post.upvotes.includes(user._id)) return res.status(204).send("already upvoted")
    try {
        // console.log("hehehehe")
        if (post.downvotes.includes(user._id)) {
            const updatePost = await Post.updateOne({ _id: postId }, {
                $push: { upvotes: user._id },
                $pull: { downvotes: user._id }
            })
        }
        else {
            const updatePost = await Post.updateOne({ _id: postId }, {
                $push: { upvotes: user._id }
            })
        }
        const posts = await Post.find()
        res.status(200).json({ posts })
        // res.status(200).json({ isUp: true })
    } catch (error) {
        console.log(error, 'error')
        res.status(500).send(error)
    }
}

const postDownvote = async (req, res) => {
    const { user } = req
    const { postId } = req.body
    if (!postId) return res.status(400).send('id is empty')
    const post = await Post.findOne({ _id: postId })
    if (!post) return res.status(404).send('Post not found')
    if (post.downvotes.includes(user._id)) return res.status(204).send("already Downvoted")
    try {
        if (post.upvotes.includes(user._id)) {
            const updatePost = await Post.updateOne({ _id: postId }, {
                $push: { downvotes: user._id },
                $pull: { upvotes: user._id }
            })
        }
        else {
            const updatePost = await Post.updateOne({ _id: postId }, {
                $push: { downvotes: user._id }
            })
        }
        // res.status(200).json({ isUp: true })
        const posts = await Post.find()
        res.status(200).json({ posts })
    } catch (error) {
        console.log(error, 'error')
        res.status(500).send(error)
    }
}

const postComment = async (req, res) => {
    console.log(req.body)

    const { text, postedIn } = req.body
    const { user } = req
    // console.log(req.user._id)

    if (!text) {
        res.status(400).send('Please fill the details')
    }
    const comment = {
        text: text,
        postedBy: user.fname
    }
    Post.findByIdAndUpdate(postedIn, {
        $push: { Comment: comment }
    }, { new: true }).then(result => {
        res.json(result)
    }).catch(err => {
        return res.status(422).json({ error: err })
    })
}

module.exports = {
    postAdd,
    postShow,
    follow,
    unfollow,
    unfollowing,
    postSave,
    postShowSavedPost,
    postSaveDelete,
    postUpvote,
    postDownvote,
    showfollow,
    showfollowing,
    postComment,
    postShowBlocked
}