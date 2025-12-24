import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { audioApi, type AudioJob } from '../services/api';
import { useRecorder } from '../hooks/useRecorder';
import {
    Header,
    HeroSection,
    RecordCard,
    UploadCard,
    JobsList,
    ResultPanel,
    dashboardStyles as styles,
} from '../components/dashboard';

/**
 * Dashboard page - Main application view
 * 
 * Refactored to use sub-components for better maintainability.
 * This component handles state management and orchestrates the sub-components.
 */
export default function Dashboard() {
    const { user, logout } = useAuth();

    // Jobs state
    const [jobs, setJobs] = useState<AudioJob[]>([]);
    const [isLoadingJobs, setIsLoadingJobs] = useState(true);

    // Upload state
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    // Selected job for viewing
    const [selectedJob, setSelectedJob] = useState<AudioJob | null>(null);

    // Recording state
    const recorder = useRecorder();

    // Fetch jobs on mount
    useEffect(() => {
        fetchJobs();
    }, []);

    // Polling for processing jobs
    useEffect(() => {
        const processingJobs = jobs.filter(
            (j) => j.status === 'pending' || j.status === 'uploaded' || j.status === 'processing'
        );

        if (processingJobs.length === 0) return;

        const interval = setInterval(async () => {
            for (const job of processingJobs) {
                try {
                    const updated = await audioApi.getJobStatus(job.jobId);
                    setJobs((prev) =>
                        prev.map((j) => (j.jobId === updated.jobId ? updated : j))
                    );
                } catch (err) {
                    console.error('Polling error:', err);
                }
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [jobs]);

    const fetchJobs = async () => {
        try {
            setIsLoadingJobs(true);
            const result = await audioApi.listJobs();
            setJobs(result.jobs);
        } catch (err) {
            console.error('Failed to fetch jobs:', err);
        } finally {
            setIsLoadingJobs(false);
        }
    };

    // Handle recording upload
    const handleRecordingUpload = async () => {
        const file = recorder.getRecordingFile();
        if (!file) return;

        setIsUploading(true);
        setUploadError(null);

        try {
            const result = await audioApi.upload(file);
            setJobs((prev) => [
                {
                    jobId: result.jobId,
                    status: result.status as AudioJob['status'],
                    originalFilename: file.name,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                ...prev,
            ]);
            recorder.resetRecording();
        } catch (err) {
            setUploadError(err instanceof Error ? err.message : 'Upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    // Handle file upload (from UploadCard)
    const handleFileUpload = async (file: File) => {
        setIsUploading(true);
        setUploadError(null);

        try {
            const result = await audioApi.upload(file);
            // Add new job to top of list
            setJobs((prev) => [
                {
                    jobId: result.jobId,
                    status: result.status as AudioJob['status'],
                    originalFilename: file.name,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                ...prev,
            ]);
        } catch (err) {
            setUploadError(err instanceof Error ? err.message : 'Upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    // Handle validation error from UploadCard
    const handleValidationError = (error: string) => {
        setUploadError(error);
    };

    const handleDeleteJob = async (jobId: string) => {
        if (!confirm('Delete this voice note?')) return;
        try {
            await audioApi.deleteJob(jobId);
            setJobs((prev) => prev.filter((j) => j.jobId !== jobId));
            if (selectedJob?.jobId === jobId) {
                setSelectedJob(null);
            }
        } catch (err) {
            console.error('Failed to delete:', err);
        }
    };

    const handleViewResult = async (jobId: string) => {
        try {
            const result = await audioApi.getJobResult(jobId);
            setSelectedJob(result);
        } catch (err) {
            console.error('Failed to get result:', err);
        }
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <Header
                username={user?.username || 'User'}
                onLogout={logout}
            />

            {/* Main Content */}
            <main style={styles.main}>
                <div style={styles.content}>
                    {/* Hero Section */}
                    <HeroSection />

                    {/* Action Flashcards */}
                    <section style={styles.flashcardsSection}>
                        {/* Record Card */}
                        <RecordCard
                            isRecording={recorder.isRecording}
                            audioBlob={recorder.audioBlob}
                            duration={recorder.duration}
                            isUploading={isUploading}
                            onStartRecording={recorder.startRecording}
                            onStopRecording={recorder.stopRecording}
                            onSendRecording={handleRecordingUpload}
                            onDiscardRecording={recorder.resetRecording}
                        />

                        {/* Upload Card */}
                        <UploadCard
                            isUploading={isUploading}
                            isRecording={recorder.isRecording}
                            onFileSelect={handleFileUpload}
                            onValidationError={handleValidationError}
                        />
                    </section>

                    {/* Error display */}
                    {(uploadError || recorder.error) && (
                        <p style={styles.errorText}>{uploadError || recorder.error}</p>
                    )}

                    {/* Selected Job Result */}
                    {selectedJob && selectedJob.summary && (
                        <ResultPanel
                            job={selectedJob}
                            onClose={() => setSelectedJob(null)}
                        />
                    )}

                    {/* Jobs List */}
                    <JobsList
                        jobs={jobs}
                        isLoading={isLoadingJobs}
                        onViewResult={handleViewResult}
                        onDeleteJob={handleDeleteJob}
                    />
                </div>
            </main>
        </div>
    );
}
