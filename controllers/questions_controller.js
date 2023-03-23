const Question = require('../models/question');
const Option = require('../models/option');
const mongoose = require('mongoose');

//controller to get list of questions - only id and title
module.exports.allQuestions = async function (req, res) {
    try {
        let questions = await Question.find({}).sort({ "createdAt": -1 }).select('id title');
        return res.status(200).json({
            message: "Here is a list of all the questions. Please use the id to get the question details",
            questions: questions
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "message": "Internal Server Error"
        })
    }
}

//controller to get question by id
module.exports.questionById = async function (req, res) {
    try {
        //check if id is objectid
        if (mongoose.isValidObjectId(req.params.id)) {
            //check if question exists with the id and populate options
            let ques = await Question.findById(req.params.id)
                .populate({
                    path: 'options',
                    select: 'id text votes link_to_vote'
                })
                .select('id title options');
            if (ques) {
                return res.status(200).json({
                    question: ques
                })
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

//controller for question creation api
module.exports.create = async function (req, res) {
    try {
        if (req.body.title) {
            //read the title for question from request body
            let ques = await Question.create({ title: req.body.title })
            return res.status(200).json({
                message: "Question created successfully!",
                _id: ques.id
            })
        } else {
            return res.status(403).json({
                message: "title missing in request body"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            "message": "Internal Server Error"
        })
    }
}

//controller for question deletion api
module.exports.delete = async function (req, res) {
    try {
        //check if id is objectid
        if (mongoose.isValidObjectId(req.params.id)) {
            //get the question using id
            let ques = await Question.findById(req.params.id);
            if (ques) {
                //get the options for the question
                let options = await Option.find({ question: req.params.id });
                for (let option of options) {
                    //return if any option has votes
                    if (option.votes > 0) {
                        return res.status(200).json({
                            message: "One of the options has votes. Cannot delete the question"
                        })
                    }
                }
                //delete the options and question
                await Option.deleteMany({ question: req.params.id });
                await Question.findByIdAndRemove(req.params.id);
                return res.status(200).json({
                    message: "Question deleted successfully!"
                })
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