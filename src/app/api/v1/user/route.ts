import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const cookie = request.headers.get('cookie');
    
    console.log('🔍 Frontend requesting user:', { cookie: cookie ? '✅ exists' : '❌ missing' });

    const response = await fetch('http://localhost:8000/api/v1/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookie || '', // ✅ pass cookies through
      },
      credentials: 'include', // ✅ important for backend
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Backend error:', data);
      return NextResponse.json(data, { status: response.status });
    }

    console.log('✅ Backend returned:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}
