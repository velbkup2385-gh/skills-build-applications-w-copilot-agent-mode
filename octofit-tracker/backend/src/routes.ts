import { Router } from 'express';
import { getApiBaseUrl } from './config/api';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const router = Router();

router.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker API is running', apiBaseUrl: getApiBaseUrl() });
});

router.get('/api/users/', async (_req, res) => {
  const users = await User.find({}).lean();
  res.json(users);
});

router.get('/api/teams/', async (_req, res) => {
  const teams = await Team.find({}).populate('members').populate('captain').lean();
  res.json(teams);
});

router.get('/api/activities/', async (_req, res) => {
  const activities = await Activity.find({}).populate('userId').lean();
  res.json(activities);
});

router.get('/api/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).populate('userId').lean();
  res.json(leaderboard);
});

router.get('/api/workouts/', async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json(workouts);
});

export default router;
