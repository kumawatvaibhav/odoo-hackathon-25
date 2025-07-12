import Users from '../models/auth.js';
import Questions from '../models/questions.js';

// Get admin dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await Users.countDocuments();
    const totalQuestions = await Questions.countDocuments();
    const totalAnswers = await Questions.aggregate([
      {
        $group: {
          _id: null,
          totalAnswers: { $sum: { $size: "$answer" } }
        }
      }
    ]);

    const recentUsers = await Users.find()
      .sort({ joinedON: -1 })
      .limit(5)
      .select('name email joinedON role');

    const recentQuestions = await Questions.find()
      .sort({ askedOn: -1 })
      .limit(5)
      .select('questionTitle userPosted askedOn');

    res.status(200).json({
      stats: {
        totalUsers,
        totalQuestions,
        totalAnswers: totalAnswers[0]?.totalAnswers || 0
      },
      recentUsers,
      recentQuestions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users for admin
export const getAllUsersForAdmin = async (req, res) => {
  try {
    const users = await Users.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a question 
export const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  
  try {
    const question = await Questions.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    await Questions.findByIdAndDelete(id);
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an answer from a question
export const deleteAnswer = async (req, res) => {
  const { questionId, answerId } = req.params;
  
  try {
    const question = await Questions.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Find and remove the specific answer
    const answerIndex = question.answer.findIndex(
      answer => answer._id.toString() === answerId
    );

    if (answerIndex === -1) {
      return res.status(404).json({ message: "Answer not found" });
    }

    question.answer.splice(answerIndex, 1);
    question.noOfAnswers = question.answer.length;
    await question.save();

    res.status(200).json({ message: "Answer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user role
export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: "Invalid role. Must be 'user' or 'admin'" });
  }

  try {
    const user = await Users.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 