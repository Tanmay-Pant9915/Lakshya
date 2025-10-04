import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Progress from '../../../models/Progress';

// GET /api/progress?userName=Alice
export async function GET(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const userName = searchParams.get('userName');
    if (userName) {
      const progress = await Progress.findOne({ userName });
      return NextResponse.json({ progress });
    }
    // Fallback: return recent items to help with debugging/verification
    const recent = await Progress.find({}).sort({ updatedAt: -1 }).limit(20);
    return NextResponse.json({ progress: recent });
  } catch (e) {
    console.error('GET /api/progress error', e);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// POST /api/progress
// { userName, class, subject: 'science'|'technology'|'engineering'|'mathematics',
//   incrementCompleted?: number, score?: number, badgesToAdd?: string[] }
export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { userName, class: classValue, subject, incrementCompleted = 0, score, badgesToAdd = [] } = body;

    // Enhanced validation
    if (!userName || !classValue || !subject) {
      return NextResponse.json({ 
        message: 'userName, class and subject are required',
        error: 'MISSING_FIELDS'
      }, { status: 400 });
    }

    // Type validation
    if (typeof userName !== 'string' || typeof classValue !== 'string' || typeof subject !== 'string') {
      return NextResponse.json({ 
        message: 'userName, class and subject must be strings',
        error: 'INVALID_TYPE'
      }, { status: 400 });
    }

    // Length validation
    if (userName.trim().length === 0 || classValue.trim().length === 0 || subject.trim().length === 0) {
      return NextResponse.json({ 
        message: 'userName, class and subject cannot be empty',
        error: 'EMPTY_FIELDS'
      }, { status: 400 });
    }

    const validSubjects = ['science', 'technology', 'engineering', 'mathematics'];
    if (!validSubjects.includes(subject)) {
      return NextResponse.json({ 
        message: 'invalid subject. Must be one of: science, technology, engineering, mathematics',
        error: 'INVALID_SUBJECT'
      }, { status: 400 });
    }

    // Validate numeric fields
    if (incrementCompleted !== undefined && (typeof incrementCompleted !== 'number' || incrementCompleted < 0)) {
      return NextResponse.json({ 
        message: 'incrementCompleted must be a non-negative number',
        error: 'INVALID_INCREMENT'
      }, { status: 400 });
    }

    if (score !== undefined && (typeof score !== 'number' || score < 0)) {
      return NextResponse.json({ 
        message: 'score must be a non-negative number',
        error: 'INVALID_SCORE'
      }, { status: 400 });
    }

    if (badgesToAdd && (!Array.isArray(badgesToAdd) || !badgesToAdd.every(badge => typeof badge === 'string'))) {
      return NextResponse.json({ 
        message: 'badgesToAdd must be an array of strings',
        error: 'INVALID_BADGES'
      }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedUserName = userName.trim();
    const sanitizedClass = classValue.trim();
    const sanitizedSubject = subject.trim();

    const setPath = `${sanitizedSubject}`;
    const update = {
      userName: sanitizedUserName,
      class: sanitizedClass,
      $setOnInsert: { totalScore: 0 },
      $inc: {},
      $set: {},
      $addToSet: {},
    };

    if (incrementCompleted) {
      update.$inc[`${setPath}.quizzesCompleted`] = incrementCompleted;
    }
    if (typeof score === 'number') {
      update.$set[`${setPath}.lastScore`] = score;
      update.$set[`${setPath}.lastAttemptAt`] = new Date();
      // Note: bestScore will be handled manually after the upsert
    }
    if (badgesToAdd && badgesToAdd.length) {
      update.$addToSet['badges'] = { $each: badgesToAdd };
    }

    // Upsert first to ensure document exists
    const doc = await Progress.findOneAndUpdate(
      { userName: sanitizedUserName },
      update,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Ensure badges array exists if it doesn't
    if (!doc.badges) {
      doc.badges = [];
      await doc.save();
    }

    // Manually apply bestScore max if needed
    if (typeof score === 'number') {
      const currentBest = doc?.[sanitizedSubject]?.bestScore || 0;
      if (score > currentBest) {
        doc[sanitizedSubject].bestScore = score;
        await doc.save();
      }
      doc.totalScore = (doc.totalScore || 0) + score;
      await doc.save();
    }

    return NextResponse.json({ progress: doc });
  } catch (e) {
    console.error('POST /api/progress error:', e);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}


