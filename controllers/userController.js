const User = require('../models/User');
const Task = require('../models/Task');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
    ErrorCodes,
    successCodes,
    errorMessages,
    successMessages,
} = require('../libs/response-libs');

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            //console.log('User already exists:', existingUser);
            return res
                .status(ErrorCodes.CONFLICT)
                .json({ error: errorMessages.User_exist });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword, isAdmin });

        await user.save();
        //console.log('User registered:', user);

        let message;
        if (isAdmin) {
            message = successMessages.admin_registration;
        } else {
            message = successMessages.user_registration;
        }

        res.status(successCodes.CREATED).json({
            status: true,
            message: message
        });
    } catch (error) {
        //console.log('Error registering user::', error);
        return res
            .status(ErrorCodes.ERROR)
            .json({ error: errorMessages.Internal_error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            //console.log('User not found');
            return res
                .status(ErrorCodes.UNAUTHORIZED)
                .json({ error: errorMessages.User_not_found });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            //console.log('Username or password is wrong');
            return res
                .status(ErrorCodes.UNAUTHORIZED)
                .json({ error: errorMessages.Username_Password_wrong });
        }

        const payload = {
            userId: user.userId,
            isAdmin: user.isAdmin
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 7 * 86400 // expires in 7 days
        });

        //console.log('User logged in:', user);

        res.status(successCodes.OK).json({
            status: true,
            token: `Bearer ${token}`,
            message: successMessages.login_success,
        });
    } catch (error) {
        //console.log('Error logging in:', error);
        return res
            .status(ErrorCodes.ERROR)
            .json({ error: errorMessages.Internal_error });
    }
};

// Admin Functions
exports.getAllUsers = async (req, res) => {
    try {
        const { query } = req;
        let { page = 1, limit = 10 } = query;

        page = parseInt(page);
        limit = parseInt(limit);

        const skip = (page - 1) * limit;

        const users = await User.find({ isAdmin: false })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const count = await User.countDocuments({ isAdmin: false });

        const pageInfo = {
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            count: count,
        };

        res.status(200).json({
            status: true,
            users: users,
            pageInfo: pageInfo
        });
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching users::::::::' });
    }
};

exports.getSingleUserTasks = async (req, res) => {
    try {
        const { query, params } = req;
        const { userId } = params;
        let { page = 1, limit = 10 } = query;

        page = parseInt(page);
        limit = parseInt(limit);

        const skip = (page - 1) * limit;

        const user = await User.findOne({ userId }).select('name email');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }



        const tasks = await Task.find({ userId: userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const count = await Task.countDocuments({ userId: userId });

        const pageInfo = {
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            count: count,
        };

        res.status(200).json({
            status: 'success',
            userName: user.name,
            userMail: user.email,
            tasks: tasks,
            pageInfo: pageInfo
        });
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching user tasks:::::::::' });
    }
};
