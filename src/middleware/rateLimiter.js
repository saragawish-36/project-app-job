import { rateLimit } from 'express-rate-limit'

export const globalLimiter  = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 5, 
    handler:(req,res,next) =>{
        return next(new Error('rate limit reached'))
    },
   standardHeaders: 'draft-8',
})

export const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 5, 
    // retryAfter: Math.ceil(req.rateLimit.resetTime - Date.now()) + "ms", 
    handler:(req,res,next) =>{
        return next(new Error('rate limit reached'))
    }
})

 export const adminLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
	limit: 20,
    skip: (req, res) => req.user && req.user.role === "admin",
    handler:(req,res,next) =>{
        return next(new Error('rate limit reached'))
    }
})