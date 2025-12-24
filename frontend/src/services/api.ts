import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth API
export const authApi = {
    login: async (email: string, password: string) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },

    signup: async (username: string, email: string, password: string) => {
        const response = await api.post('/auth/signup', { username, email, password });
        return response.data;
    },
};

// Audio Job Types
export interface AudioJob {
    jobId: string;
    status: 'pending' | 'uploaded' | 'processing' | 'completed' | 'failed';
    originalFilename: string;
    createdAt: string;
    updatedAt: string;
    title?: string;
    error?: string;
    summary?: {
        title: string;
        summary: string;
        actionItems: string[];
        keyPoints: string[];
    };
}

export interface JobResult extends AudioJob {
    audioUrl: string;
    transcript: string;
}

// Audio API
export const audioApi = {
    // Upload audio file
    upload: async (file: File): Promise<{ jobId: string; status: string }> => {
        const formData = new FormData();
        formData.append('audio', file);
        const response = await api.post('/audio/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },

    // Get job status (for polling)
    getJobStatus: async (jobId: string): Promise<AudioJob> => {
        const response = await api.get(`/audio/jobs/${jobId}`);
        return response.data;
    },

    // Get full result (transcript + summary)
    getJobResult: async (jobId: string): Promise<JobResult> => {
        const response = await api.get(`/audio/jobs/${jobId}/result`);
        return response.data;
    },

    // List user's jobs
    listJobs: async (limit = 20): Promise<{ count: number; jobs: AudioJob[] }> => {
        const response = await api.get(`/audio/jobs?limit=${limit}`);
        return response.data;
    },

    // Delete a job
    deleteJob: async (jobId: string): Promise<void> => {
        await api.delete(`/audio/jobs/${jobId}`);
    },
};

export default api;

