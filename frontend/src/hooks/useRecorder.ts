import { useState, useRef, useCallback } from 'react';

export interface RecordingState {
    isRecording: boolean;
    isPaused: boolean;
    duration: number;
    audioBlob: Blob | null;
    error: string | null;
}

/**
 * Hook for recording audio from browser microphone
 * Uses MediaRecorder API
 */
export function useRecorder() {
    const [state, setState] = useState<RecordingState>({
        isRecording: false,
        isPaused: false,
        duration: 0,
        audioBlob: null,
        error: null,
    });

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);

    const startRecording = useCallback(async () => {
        try {
            // Reset state
            chunksRef.current = [];
            setState((prev) => ({ ...prev, error: null, audioBlob: null, duration: 0 }));

            // Request microphone access
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100,
                }
            });

            // Create MediaRecorder with best supported format
            const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
                ? 'audio/webm;codecs=opus'
                : MediaRecorder.isTypeSupported('audio/webm')
                    ? 'audio/webm'
                    : 'audio/mp4';

            const mediaRecorder = new MediaRecorder(stream, { mimeType });
            mediaRecorderRef.current = mediaRecorder;

            // Collect audio chunks
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };

            // Handle recording stop
            mediaRecorder.onstop = () => {
                // Stop all tracks
                stream.getTracks().forEach((track) => track.stop());

                // Create blob from chunks
                const blob = new Blob(chunksRef.current, { type: mimeType });
                setState((prev) => ({
                    ...prev,
                    isRecording: false,
                    isPaused: false,
                    audioBlob: blob,
                }));

                // Clear timer
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                }
            };

            // Start recording
            mediaRecorder.start(1000); // Collect data every second
            startTimeRef.current = Date.now();

            // Start duration timer
            timerRef.current = window.setInterval(() => {
                setState((prev) => ({
                    ...prev,
                    duration: Math.floor((Date.now() - startTimeRef.current) / 1000),
                }));
            }, 1000);

            setState((prev) => ({ ...prev, isRecording: true }));

        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to access microphone';
            setState((prev) => ({ ...prev, error: message }));
        }
    }, []);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && state.isRecording) {
            mediaRecorderRef.current.stop();
        }
    }, [state.isRecording]);

    const pauseRecording = useCallback(() => {
        if (mediaRecorderRef.current && state.isRecording && !state.isPaused) {
            mediaRecorderRef.current.pause();
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            setState((prev) => ({ ...prev, isPaused: true }));
        }
    }, [state.isRecording, state.isPaused]);

    const resumeRecording = useCallback(() => {
        if (mediaRecorderRef.current && state.isPaused) {
            mediaRecorderRef.current.resume();
            timerRef.current = window.setInterval(() => {
                setState((prev) => ({
                    ...prev,
                    duration: prev.duration + 1,
                }));
            }, 1000);
            setState((prev) => ({ ...prev, isPaused: false }));
        }
    }, [state.isPaused]);

    const resetRecording = useCallback(() => {
        chunksRef.current = [];
        setState({
            isRecording: false,
            isPaused: false,
            duration: 0,
            audioBlob: null,
            error: null,
        });
    }, []);

    // Convert blob to File for upload
    const getRecordingFile = useCallback((): File | null => {
        if (!state.audioBlob) return null;

        const extension = state.audioBlob.type.includes('webm') ? 'webm' : 'mp4';
        const filename = `recording-${Date.now()}.${extension}`;
        return new File([state.audioBlob], filename, { type: state.audioBlob.type });
    }, [state.audioBlob]);

    return {
        ...state,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
        resetRecording,
        getRecordingFile,
    };
}

/**
 * Format seconds to MM:SS display
 */
export function formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
