import express from 'express'
import {
  register,
  googleAuth,
  login,
  refreshToken,
  logout,
} from '../controller/auth.controller.js'

const router = express.Router()

// @route   POST /api/auth/login
router.post('/register', register)
router.post('/google', googleAuth)
router.post('/login', login)
router.post('/refresh', refreshToken)
router.post('/logout', logout)

export default router
