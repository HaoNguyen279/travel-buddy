const {
    getAllUsers: getAllUsersService,
    getUserById: getUserByIdService,
    getUserProfileById: getUserProfileByIdService,
    followUser: followUserService,
    unfollowUser: unfollowUserService,
    getFollowersByUserId: getFollowersByUserIdService,
    getFollowingByUserId: getFollowingByUserIdService,
    createNewUser,
    verifyLoginUser,
    deleteUserById,
    updateUser
} = require('../services/user.service')
const {hash_password} = require('../auth/password');
const {generateAccesssToken, generateRefreshToken} = require('../middlewares/cookiesJwtAuth');
const { insertRefreshToken } = require('../services/token.service');
const jwt = require("jsonwebtoken");
const { json } = require('express');

class UserController{
    async getMe(req, res, next){
        try {
            const userId = req.user?.id;
            if(!userId) return res.status(400).json({message: "User ID is required"});
            const data = await getUserByIdService(userId);
            if(!data) return res.status(404).json({message: "User not found"});
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({message: "Internal server error:" + error}); 
        }
    }

    async getMyProfile(req, res, next){
        try {
            const userId = req.user?.id;
            if(!userId) return res.status(400).json({message: "User ID is required"});
            const data = await getUserProfileByIdService(userId, userId);
            if(!data) return res.status(404).json({message: "User not found"});
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({message: "Internal server error:" + error});
        }
    }

    async getAllUsers(req, res, next){
        try {
            const data = await getAllUsersService();
            return res.json(data);
        } catch (error) {
            return res.status(500).json({message: "Internal server error:" + error});
        }
    }
    async getUserById(req, res, next){
        try {
            const id = req.params.id;
            const data = await getUserByIdService(id);
            if(!data) return res.status(404).json({message: "User not found"});
            return res.json(data);
        } catch (error) {
            return res.status(500).json({message: "Internal server error:" + error});
        }
    }
    async getUserProfile(req, res, next){
        try {
            const targetUserId = req.params.id;
            const viewerUserId = req.user?.id ?? null;
            if(!targetUserId) return res.status(400).json({message: "User ID is required"});
            const data = await getUserProfileByIdService(targetUserId, viewerUserId);
            if(!data) return res.status(404).json({message: "User not found"});
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({message: "Internal server error:" + error});
        }
    }
    async deleteUserById(req, res, next){
        try {
            const id = req.params.id;
            const result = await deleteUserById(id);
            return res.json(result);
        } catch (error) {
            return res.status(500).json({message: "Internal server error:" + error});
        }
    }
    async updateUser(req, res, next){
        try {
            const userdata = req.body;
            const result = await updateUser(userdata);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({message: "Internal server error:" + error});
        }

    }

    async followUser(req, res, next) {
        try {
            const followerId = req.user?.id;
            const followingId = req.params.id;
            if(!followerId || !followingId){
                return res.status(400).json({message: "Follower ID and target user ID are required"});
            }
            const followed = await followUserService(followerId, followingId);
            return res.status(200).json({followed});
        } catch (error) {
            return res.status(500).json({message: "Internal server error:" + error});
        }
    }

    async unfollowUser(req, res, next) {
        try {
            const followerId = req.user?.id;
            const followingId = req.params.id;
            if(!followerId || !followingId){
                return res.status(400).json({message: "Follower ID and target user ID are required"});
            }
            const unfollowed = await unfollowUserService(followerId, followingId);
            return res.status(200).json({unfollowed});
        } catch (error) {
            return res.status(500).json({message: "Internal server error:" + error});
        }
    }

    async getFollowers(req, res, next) {
        try {
            const userId = req.params.id;
            const limit = Number(req.query.limit ?? 20);
            const offset = Number(req.query.offset ?? 0);
            const data = await getFollowersByUserIdService(userId, limit, offset);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({message: "Internal server error:" + error});
        }
    }

    async getFollowing(req, res, next) {
        try {
            const userId = req.params.id;
            const limit = Number(req.query.limit ?? 20);
            const offset = Number(req.query.offset ?? 0);
            const data = await getFollowingByUserIdService(userId, limit, offset);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({message: "Internal server error:" + error});
        }
    }


    async register(req, res, next){
        const ud = req.body;
        console.log("1" + ud);
        const hashed_password = await hash_password(ud.password);
        const result = await createNewUser(ud.username, ud.email, hashed_password, ud.fullname, ud.avatar_url, ud.bio);
        if(result){
            console.log(ud);
        }
        res.json({message: "Create new user endpoint"});
    }

    async login(req, res, next) {
        const userdata = req.body;
        console.log("Logged user data :" + userdata.email + " " + userdata.password);
        const user = await verifyLoginUser(userdata.email, userdata.password);
        const user_cookie = req.cookies;
        console.log("User cookie data :" + JSON.stringify(user_cookie));
        if(user){
            console.log("User logged in successfully");
            const accessToken = generateAccesssToken(user);
            const refreshToken = generateRefreshToken(user);
            
            await insertRefreshToken({
                userId: user.user_id,
                refreshToken,
                userAgent: req.headers["user-agent"],
                ip: req.ip 
            });

            // Với localhost HTTP: secure=false, sameSite='lax'
            // Với production HTTPS: secure=true, sameSite='none'
            const isProduction = process.env.NODE_ENV === 'production';
            
            const cookieOptions1 = {
                httpOnly: true,
                secure: isProduction,  // false cho HTTP localhost, true cho HTTPS production
                sameSite: isProduction ? 'none' : 'lax',  // 'lax' hoạt động với HTTP
                path: '/'
            };

            const cookieOptions2 = {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? 'none' : 'lax',
                path: '/auth/refresh'
            };

            res.cookie("refreshToken", refreshToken, {
                ...cookieOptions2,
                maxAge: 1000 * 60 * 60 * 3 // 3 hours
            });
            res.cookie("accessToken", accessToken, {
                ...cookieOptions1,
                maxAge: 1000 * 60 * 15 // 15 minutes 
            });
            res.json({message : "Login successful" });
        } else {
            console.log("Login failed");
            res.json({message: "Login failed"});
        }
    }
    async refresh(req, res, next){
        console.log("Request to refresh access token");
        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken){
            console.log("Ko tìm thấy refresh token trong cookies");
            return res.status(401).json(
                {
                    message : "Missing refresh token!"
                }
            )
        }

        console.log("Refresh token found! Token is: " + refreshToken);
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) =>{
            if(err){
                console.log("Failed to verify refresh token, look like its a fake token 😨😨😨");
                return res.json("Failed to verify refresh token");
            }

            const isProduction = process.env.NODE_ENV === 'production';
            const newAccessToken  = generateAccesssToken(user);
            res.cookie("accessToken", newAccessToken, {
                httpOnly : true,
                secure : isProduction,
                sameSite : isProduction ? 'none' : 'lax',
                path : '/',
                maxAge : 1000 * 60 * 15 // 15 minutes 
            })
            return res.status(200).json({message : "Generate new access token successfully"});
        })
    }

 

    
    async me(req, res, next){
        const request_access_token = req.cookies.accessToken;
        if(!request_access_token){
            return res.status(401).json({message : "Access token missing"});
        }
        const payload = jwt.verify(request_access_token, process.env.JWT_ACCESS_SECRET);
        
    }
}

module.exports = new UserController;