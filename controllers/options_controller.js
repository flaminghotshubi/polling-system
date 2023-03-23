const mongoose = require('mongoose');
const Question = require('../models/question');
const Option = require('../models/option');

//controller for option creation api 
module.exports.create = async function (req, res) {
    try {
        if (mongoose.isValidObjectId(req.params.id)) {
            let question = await Question.findById(req.params.id);
            if (question) {
                let optionText = req.body.option;
                if (optionText) {
                    let option = await Option.create({
                        text: optionText,
                        votes: 0,
                        question: question
                    })
                    let link_to_vote = `http://${req.header('host')}/options/${option.id}/add_vote`;
                    option.link_to_vote = link_to_vote;
                    option.save();
                    question.options.splice(0, 0, option);
                    question.save();
                    return res.status(200).json({
                        message: "Option created successfully!",
                        _id: option.id,
                        link_to_vote: option.link_to_vote
                    })
                } else {
                    return res.status(403).json({
                        message: "Option details missing"
                    })
                }
            } else {
                return res.status(404).json({
                    message: "Question not found. Please check the id"
                })
            }
        } else {
            return res.status(403).json({
                message: "Invalid id. Please check the id"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "message": "Internal Server Error"
        })
    }
}

//controller for option deletion api 
module.exports.delete = async function (req, res) {
    try {
        if (mongoose.isValidObjectId(req.params.id)) {
            let option = await Option.findById(req.params.id);
            if (option) {
                if(option.votes > 0) {
                    return res.status(200).json({
                        message: "Cannot delete an option with votes!"
                    })
                }
                await Question.findByIdAndUpdate(option.question, { $pull: { options: option.id } })
                await Option.findByIdAndDelete(req.params.id);
                return res.status(200).json({
                    message: "Option deleted successfully!"
                })
            } else {
                return res.status(404).json({
                    message: "Question not found! Please check the id"
                })
            }
        } else {
            return res.status(403).json({
                message: "Invalid id. Please check the id"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "message": "Internal Server Error"
        })
    }
}

//controller for voting 
module.exports.addVote = async function (req, res) {
    try {
        if (mongoose.isValidObjectId(req.params.id)) {
            let option = await Option.findById(req.params.id);
            if (option) {
                option.votes += 1;
                option.save();
                return res.status(200).json({
                    message: "Option voted successfully!"
                })
            } else {
                return res.status(404).json({
                    message: "Option not found! Please check the id"
                })
            }
        } else {
            return res.status(403).json({
                message: "Invalid id! Please check the id"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "message": "Internal Server Error"
        })
    }
}