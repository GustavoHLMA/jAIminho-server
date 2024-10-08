"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const repositories_1 = require("../repositories");
class LoginController {
    async login(req, res, next) {
        try {
            const { cpf, password } = req.body;
            const userTest = await repositories_1.UserTestRepository.findByCpf(cpf);
            if (!userTest) {
                return res.status(400).json({
                    message: 'Invalid credentials.',
                });
            }
            const checkPassword = await (0, bcryptjs_1.compare)(password, userTest.password);
            if (!checkPassword) {
                return res.status(400).json({
                    message: 'Invalid credentials.',
                });
            }
            const accessToken = repositories_1.TokenRepository.generateAccessToken(userTest.id, '60s');
            const refreshToken = repositories_1.TokenRepository.generateRefreshToken(userTest.id, '5d');
            repositories_1.CookieRepository.setCookie(res, 'refresh_token', refreshToken);
            const { password: _ } = userTest, loggedUserTest = __rest(userTest, ["password"]);
            return res.status(200).json({
                message: 'UserTest logged',
                data: {
                    loggedUserTest,
                    accessToken,
                },
            });
        }
        catch (error) {
            return next(error);
        }
    }
    async refresh(req, res, next) {
        try {
            const refreshToken = req.cookies.refresh_token;
            if (!refreshToken) {
                delete req.headers.authorization;
                return res.status(401).json({
                    message: 'Invalid token',
                });
            }
            const decodedRefreshToken = repositories_1.TokenRepository.verifyRefreshToken(refreshToken);
            if (!decodedRefreshToken) {
                delete req.headers.authorization;
                return res.status(401).json({
                    message: 'Invalid token',
                });
            }
            const userTest = await repositories_1.UserTestRepository.findById(decodedRefreshToken.id);
            if (!userTest) {
                return res.status(400).json({
                    message: 'UserTest not found',
                });
            }
            repositories_1.CookieRepository.clearCookies(res, 'refresh_token');
            const newRefreshToken = repositories_1.TokenRepository.generateRefreshToken(userTest.id, '1d');
            const accessToken = repositories_1.TokenRepository.generateAccessToken(userTest.id, '30s');
            repositories_1.CookieRepository.setCookie(res, 'refresh_token', newRefreshToken);
            const { password: _ } = userTest, loggedUser = __rest(userTest, ["password"]);
            return res.status(200).json({
                message: 'Token refreshed',
                data: {
                    loggedUser,
                    accessToken,
                },
            });
        }
        catch (error) {
            return next(error);
        }
    }
    async logout(req, res, next) {
        try {
            repositories_1.CookieRepository.clearCookies(res, 'refresh_token');
            delete req.headers.authorization;
            return res.status(200).json({
                message: 'User logged out',
            });
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.default = new LoginController();
