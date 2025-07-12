import Questions from "../models/questions.js";
import Notifications from "../models/notifications.js";
import mongoose from "mongoose";

export const askQuestion = async (req, res) => {
  const postQuestionData = req.body
  const postQuestion = new Questions(postQuestionData)

  try {
    await postQuestion.save()
    res.status(200).json('Question posted successfully')
  } catch (error) {
    console.log(error)
    res.status(409).json("Couldn't post a new question");
  }
}

export const getAllQuestions = async (req, res) => {
  try {
    const questionList = await Questions.find().sort({ askedOn: -1 });
    res.status(200).json(questionList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }

  try {
    await Questions.findByIdAndRemove(_id);
    res.status(200).json({ message: "Question successfully deleted..."});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const voteQuestion = async (req, res) => {
  const { id: _id } = req.params;
  const { value, userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }

  try {
    const question = await Questions.findById(_id);
    /*
    When a user votes on a question, the function checks if the user has already upvoted or downvoted the question by checking if their userId is in the respective array. If the user has already voted in the opposite way (e.g. they previously downvoted but now want to upvote), their userId is removed from the opposite array. If the user has not already voted in the same way (e.g. they have not already upvoted and now want to upvote), their userId is added to the respective array. If the user has already voted in the same way, their userId is removed from the respective array, effectively canceling their previous vote.
    */
    const upIndex = question.upVote.findIndex((id) => id === String(userId));
    const downIndex = question.downVote.findIndex(
      (id) => id === String(userId)
    );

    if (value === "upVote") {
      if (downIndex !== -1) {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
      
      if (upIndex === -1) {
        question.upVote.push(userId);
      } else {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
      }
    } else if (value === "downVote") {
      if (upIndex !== -1) {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
      }
      if (downIndex === -1) {
        question.downVote.push(userId);
      } else {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
    }
    await Questions.findByIdAndUpdate(_id, question);
    
    // Create notification for question owner if someone votes on their question
    if (question.userId !== userId) {
      const voteType = value === "upVote" ? "upvoted" : "downvoted";
      const notification = new Notifications({
        recipient: question.userId,
        sender: userId,
        type: 'vote',
        questionId: _id,
        content: `Someone ${voteType} your question "${question.questionTitle}"`
      });
      await notification.save();
    }
    
    res.status(200).json({ message: "Voted successfully..." });
  } catch (error) {
    res.status(404).json({ message: "Id not found" });
  }
};

export const acceptAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { answerId, userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }

  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    return res.status(404).send("Answer unavailable...");
  }

  try {
    const question = await Questions.findById(_id);
    
    if (!question) {
      return res.status(404).send("Question not found...");
    }

    // Check if the user is the question owner
    if (question.userId !== userId) {
      return res.status(403).send("Only question owner can accept answers...");
    }

    // First, unaccept all answers
    await Questions.updateOne(
      { _id },
      { $set: { "answer.$[].isAccepted": false } }
    );

    // Then accept the selected answer
    await Questions.updateOne(
      { _id, "answer._id": answerId },
      { $set: { "answer.$.isAccepted": true } }
    );

    // Find the accepted answer to get the user who answered
    const updatedQuestion = await Questions.findById(_id);
    const acceptedAnswer = updatedQuestion.answer.find(ans => ans._id.toString() === answerId);
    
    if (acceptedAnswer && acceptedAnswer.userId !== userId) {
      // Create notification for the answer author
      const notification = new Notifications({
        recipient: acceptedAnswer.userId,
        sender: userId,
        type: 'accept',
        questionId: _id,
        answerId: answerId,
        content: `Your answer to "${question.questionTitle}" was accepted!`
      });
      await notification.save();
    }

    res.status(200).json({ message: "Answer accepted successfully..." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};