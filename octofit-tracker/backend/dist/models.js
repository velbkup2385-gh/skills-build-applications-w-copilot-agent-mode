"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    age: Number,
    fitnessGoal: String,
});
const teamSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    sport: { type: String, required: true },
    members: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
    captain: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
});
const activitySchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: Number,
    date: { type: Date, default: Date.now },
});
const leaderboardSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
});
const workoutSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: Number, required: true },
    difficulty: String,
});
exports.User = mongoose_1.default.model('User', userSchema);
exports.Team = mongoose_1.default.model('Team', teamSchema);
exports.Activity = mongoose_1.default.model('Activity', activitySchema);
exports.LeaderboardEntry = mongoose_1.default.model('LeaderboardEntry', leaderboardSchema);
exports.Workout = mongoose_1.default.model('Workout', workoutSchema);
