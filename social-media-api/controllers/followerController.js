const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const { followers, users } = require('../utils/mockData');

// @desc Get all followers
// @route GET /api/followers
// @access Public
exports.getFollowers = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = followers.length;

    const results = followers.slice(startIndex, endIndex);

    const enhancedResults = results.map(follow => {
        const user = users.find(u => u.id === follow.user_id);
        const follower = users.find(u => u.id === follow.follower_id);
        return {
            ...follow,
            user: { id: user.id, username: user.username },
            follower: { id: follower.id, username: follower.username }
        };
    });

    const pagination = {};
    if (endIndex < total) pagination.next = { page: page + 1, limit };
    if (startIndex > 0) pagination.prev = { page: page - 1, limit };

    res.status(200).json({
        success: true,
        count: enhancedResults.length,
        page,
        total_pages: Math.ceil(total / limit),
        pagination,
        data: enhancedResults
    });
});

// @desc Create new follower
// @route POST /api/followers
// @access Private
exports.createFollower = asyncHandler(async (req, res, next) => {
    const userId = req.header('X-User-Id');
    if (!userId) return next(new ErrorResponse('Not authorized', 401));

    const user = users.find(u => u.id === userId);
    const follower = users.find(u => u.id === req.body.follower_id);
    if (!user || !follower) return next(new ErrorResponse('User not found', 404));

    const newFollow = {
        id: (followers.length + 1).toString(),
        user_id: userId,
        follower_id: req.body.follower_id,
        created_at: new Date().toISOString().slice(0, 10)
    };
    followers.push(newFollow);

    res.status(201).json({ success: true, data: newFollow });
});

// @desc Delete follower
// @route DELETE /api/followers/:id
// @access Private
exports.deleteFollower = asyncHandler(async (req, res, next) => {
    const userId = req.header('X-User-Id');
    if (!userId) return next(new ErrorResponse('Not authorized', 401));

    const follow = followers.find(f => f.id === req.params.id);
    if (!follow) return next(new ErrorResponse(`Follow not found with id ${req.params.id}`, 404));
    if (follow.user_id !== userId) return next(new ErrorResponse('Not authorized to remove this follower', 401));

    const index = followers.findIndex(f => f.id === req.params.id);
    followers.splice(index, 1);

    res.status(200).json({ success: true, data: {} });
});