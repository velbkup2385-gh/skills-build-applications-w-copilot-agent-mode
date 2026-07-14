import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        role: 'Captain',
        age: 36,
        fitnessGoal: 'Marathon prep',
      },
      {
        name: 'Grace Hopper',
        email: 'grace@example.com',
        role: 'Member',
        age: 42,
        fitnessGoal: 'Strength training',
      },
      {
        name: 'Katherine Johnson',
        email: 'katherine@example.com',
        role: 'Member',
        age: 39,
        fitnessGoal: 'Cycling endurance',
      },
    ]);

    const savedUsers = users.map((user) => user._id);

    await Team.insertMany([
      {
        name: 'Alpha Squad',
        sport: 'Running',
        members: [savedUsers[0], savedUsers[1]],
        captain: savedUsers[0],
      },
      {
        name: 'Delta Crew',
        sport: 'Cycling',
        members: [savedUsers[2]],
        captain: savedUsers[2],
      },
    ]);

    await Activity.insertMany([
      {
        userId: savedUsers[0],
        type: 'Run',
        duration: 45,
        distance: 8.5,
        date: new Date('2026-07-10T06:00:00.000Z'),
      },
      {
        userId: savedUsers[1],
        type: 'Strength',
        duration: 35,
        distance: 0,
        date: new Date('2026-07-11T18:30:00.000Z'),
      },
      {
        userId: savedUsers[2],
        type: 'Cycling',
        duration: 60,
        distance: 24,
        date: new Date('2026-07-12T07:15:00.000Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: savedUsers[0], score: 1250, rank: 1 },
      { userId: savedUsers[1], score: 980, rank: 2 },
      { userId: savedUsers[2], score: 915, rank: 3 },
    ]);

    await Workout.insertMany([
      { name: 'HIIT Burst', category: 'Cardio', duration: 20, difficulty: 'Intermediate' },
      { name: 'Core Strength', category: 'Strength', duration: 25, difficulty: 'Beginner' },
      { name: 'Hill Ride', category: 'Cycling', duration: 40, difficulty: 'Advanced' },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
