import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import User from '../../../models/User';

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { name, class: classValue } = body;

    // Enhanced validation
    if (!name || !classValue) {
      return NextResponse.json({ 
        message: 'name and class are required',
        error: 'MISSING_FIELDS'
      }, { status: 400 });
    }

    // Type validation
    if (typeof name !== 'string' || typeof classValue !== 'string') {
      return NextResponse.json({ 
        message: 'name and class must be strings',
        error: 'INVALID_TYPE'
      }, { status: 400 });
    }

    // Length validation
    if (name.trim().length === 0 || classValue.trim().length === 0) {
      return NextResponse.json({ 
        message: 'name and class cannot be empty',
        error: 'EMPTY_FIELDS'
      }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedName = name.trim();
    const sanitizedClass = classValue.trim();

    const user = await User.findOneAndUpdate(
      { name: sanitizedName },
      { name: sanitizedName, class: sanitizedClass },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ user });
  } catch (error) {
    console.error('POST /api/users error', error);
    return NextResponse.json({ 
      message: 'Server error',
      error: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');

    if (name) {
      const user = await User.findOne({ name });
      return NextResponse.json({ user });
    }

    const users = await User.find({}).sort({ createdAt: -1 }).limit(50);
    return NextResponse.json({ users });
  } catch (error) {
    console.error('GET /api/users error', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}


