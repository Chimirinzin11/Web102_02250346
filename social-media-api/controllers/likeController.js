const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const { likes, users, posts } = require('../utils/mockData');

// @desc Get all likes
// @route GET /api/likes
// @access Public
exports.getLikes = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = likes.length;

    const results = likes.slice(startIndex, endIndex);

    const enhancedResults = results.map(like => {
        const user = users.find(u => u.id === like.user_id);
        const post = posts.find(p => p.id === like.post_id);
        return {
            ...like,
            user: { id: user.id, username: user.username },
            post: { id: post.id, caption: post.caption }
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

// @desc Create new like
// @route POST /api/likes
// @access Private
exports.createLike = asyncHandler(async (req, res, next) => {
    const userId = req.header('X-User-Id');
    if (!userId) return next(new ErrorResponse('Not authorized', 401));

    const user = users.find(u => u.id === userId);
    if (!user) return next(new ErrorResponse('User not found', 404));

    const newLike = {
        id: (likes.length + 1).toString(),
        post_id: req.body.post_id,
        user_id: userId,
        created_at: new Date().toISOString().slice(0, 10)
    };
    likes.push(newLike);

    res.status(201).json({ success: true, data: newLike });
});

// @desc Delete like
// @route DELETE /api/likes/:id
// @access Private
exports.deleteLike = asyncHandler(async (req, res, next) => {
    const userId = req.header('X-User-Id');
    if (!userId) return next(new ErrorResponse('Not authorized', 401));

    const like = likes.find(l => l.id === req.params.id);
    if (!like) return next(new ErrorResponse(`Like not found with id ${req.params.id}`, 404));
    if (like.user_id !== userId) return next(new ErrorResponse('Not authorized to delete this like', 401));

    const index = likes.findIndex(l => l.id === req.params.id);
    likes.splice(index, 1);

    res.status(200).json({ success: true, data: {} });
});