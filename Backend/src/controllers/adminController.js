import User from "../models/user.model.js";

// GET /api/admin/users — Fetch all users (excluding password)
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({role:{$ne:"admin"}}).select("-password").sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Users fetched successfully",
            success: true,
            count: users.length,
            users
        });
    } catch (error) {
        console.error("Error fetching users:", error.message);
        next(error);
    }
};

// DELETE /api/admin/users/:id — Delete a user by ID
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Prevent admin from deleting themselves
        if (id === req.user._id.toString()) {
            return res.status(400).json({
                message: "You cannot delete your own account",
                success: false,
                error: "Self-deletion is not allowed"
            });
        }

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: "No user found with this ID"
            });
        }

        return res.status(200).json({
            message: `User "${deletedUser.username}" deleted successfully`,
            success: true,
            deletedUser: {
                id: deletedUser._id,
                username: deletedUser.username,
                email: deletedUser.email
            }
        });
    } catch (error) {
        console.error("Error deleting user:", error.message);
        next(error);
    }
};

export { getAllUsers, deleteUser };
