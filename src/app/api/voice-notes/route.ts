import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { apiResponse } from '@/lib/api-response';
import { VoiceNoteSchema } from '@/lib/validation';

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const formData = await request.formData();

    const audioBlob = formData.get('audio') as Blob;
    const tradeId = formData.get('tradeId') as string | null;
    const transcribe = formData.get('transcribe') === 'true';

    if (!audioBlob) {
      return apiResponse.validationError({ audio: 'No audio file provided' });
    }

    const buffer = Buffer.from(await audioBlob.arrayBuffer());
    const duration = Math.floor((audioBlob.size / 128000) * 8);

    let transcript = null;

    if (transcribe && process.env.OPENAI_API_KEY) {
      try {
        const file = new File([buffer], 'audio.webm', { type: 'audio/webm' });
        const response = await openai.audio.transcriptions.create({
          file: file,
          model: 'whisper-1',
          language: 'en',
        });
        transcript = response.text;
      } catch (transcribeError) {
        console.error('Transcription error:', transcribeError);
      }
    }

    const voiceNote = await prisma.voiceNote.create({
      data: {
        userId,
        tradeId: tradeId || null,
        url: `data:audio/webm;base64,${buffer.toString('base64')}`,
        duration,
        transcript,
      },
    });

    return apiResponse.success(voiceNote, undefined, 201);
  } catch (error) {
    console.error('Error saving voice note:', error);
    return apiResponse.serverError('Failed to save voice note');
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }
    const userId = request.headers.get('x-user-id') || 'demo-user';
    const { searchParams } = new URL(request.url);
    const tradeId = searchParams.get('tradeId');

    const where: Record<string, unknown> = { userId };
    if (tradeId) where.tradeId = tradeId;

    const voiceNotes = await prisma.voiceNote.findMany({
      where,
      orderBy: { recordedAt: 'desc' },
    });

    return apiResponse.success(voiceNotes);
  } catch (error) {
    console.error('Error fetching voice notes:', error);
    return apiResponse.serverError('Failed to fetch voice notes');
  }
}
