class VideoEditor {
    constructor() {
        this.currentVideo = null;
        this.videos = [];
        this.timeline = null;
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 0;
        this.selectedClip = null;
        this.timelineScale = 10; // pixels per second

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupTimeline();
        this.updateTimelineRuler();
    }

    setupEventListeners() {
        // File upload
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');

        uploadArea.addEventListener('click', () => fileInput.click());
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.backgroundColor = 'rgba(0, 170, 255, 0.2)';
        });
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.backgroundColor = '';
        });
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.backgroundColor = '';
            this.handleFileUpload(e.dataTransfer.files);
        });

        fileInput.addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files);
        });

        // Video controls
        document.getElementById('playPauseBtn').addEventListener('click', () => {
            this.togglePlayPause();
        });

        document.getElementById('stopBtn').addEventListener('click', () => {
            this.stop();
        });

        // Property controls
        document.getElementById('startTime').addEventListener('input', (e) => {
            this.updateVideoTiming();
        });

        document.getElementById('endTime').addEventListener('input', (e) => {
            this.updateVideoTiming();
        });

        document.getElementById('playbackSpeed').addEventListener('change', (e) => {
            this.updatePlaybackSpeed(parseFloat(e.target.value));
        });

        // Effects controls
        document.getElementById('brightness').addEventListener('input', (e) => {
            this.updateVideoEffects();
            document.getElementById('brightnessValue').textContent = e.target.value + '%';
        });

        document.getElementById('contrast').addEventListener('input', (e) => {
            this.updateVideoEffects();
            document.getElementById('contrastValue').textContent = e.target.value + '%';
        });

        document.getElementById('saturation').addEventListener('input', (e) => {
            this.updateVideoEffects();
            document.getElementById('saturationValue').textContent = e.target.value + '%';
        });

        // Timeline controls
        document.getElementById('addTrackBtn').addEventListener('click', () => {
            this.addTrack();
        });

        document.getElementById('splitBtn').addEventListener('click', () => {
            this.splitClip();
        });

        // Export modal
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.showExportModal();
        });

        document.getElementById('closeModal').addEventListener('click', () => {
            this.hideExportModal();
        });

        document.getElementById('cancelExport').addEventListener('click', () => {
            this.hideExportModal();
        });

        document.getElementById('startExport').addEventListener('click', () => {
            this.startExport();
        });

        // Video element events
        const video = document.getElementById('previewVideo');
        video.addEventListener('loadedmetadata', () => {
            this.duration = video.duration;
            this.updateTimeDisplay();
            document.getElementById('endTime').value = this.duration.toFixed(1);
            this.updateTimelineRuler();
        });

        video.addEventListener('timeupdate', () => {
            this.currentTime = video.currentTime;
            this.updateTimeDisplay();
            this.updateTimelinePlayhead();
        });

        video.addEventListener('ended', () => {
            this.isPlaying = false;
            this.updatePlayPauseButton();
        });
    }

    handleFileUpload(files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('video/')) {
                this.addVideoToLibrary(file);
            }
        });
    }

    addVideoToLibrary(file) {
        const videoData = {
            file: file,
            name: file.name,
            size: this.formatFileSize(file.size),
            url: URL.createObjectURL(file),
            duration: 0
        };

        this.videos.push(videoData);
        this.createMediaItem(videoData);

        // If this is the first video, load it automatically
        if (this.videos.length === 1) {
            this.loadVideo(videoData);
        }
    }

    createMediaItem(videoData) {
        const mediaList = document.getElementById('mediaList');
        const mediaItem = document.createElement('div');
        mediaItem.className = 'media-item';
        mediaItem.dataset.videoId = this.videos.length - 1;

        mediaItem.innerHTML = `
            <div class="media-item-name">${videoData.name}</div>
            <div class="media-item-info">${videoData.size}</div>
        `;

        mediaItem.addEventListener('click', () => {
            this.selectMediaItem(mediaItem, videoData);
        });

        mediaItem.addEventListener('dblclick', () => {
            this.loadVideo(videoData);
        });

        mediaList.appendChild(mediaItem);
    }

    selectMediaItem(element, videoData) {
        // Remove previous selection
        document.querySelectorAll('.media-item').forEach(item => {
            item.classList.remove('selected');
        });

        // Select current item
        element.classList.add('selected');
    }

    loadVideo(videoData) {
        this.currentVideo = videoData;
        const video = document.getElementById('previewVideo');
        const overlay = document.getElementById('videoOverlay');

        video.src = videoData.url;
        video.style.display = 'block';
        overlay.style.display = 'none';

        // Add to timeline
        this.addClipToTimeline(videoData);
    }

    addClipToTimeline(videoData) {
        const trackContent = document.querySelector('.track-content[data-track="video1"]');
        const clip = document.createElement('div');
        clip.className = 'video-clip';
        clip.dataset.videoId = this.videos.indexOf(videoData);

        // Create a temporary video element to get duration
        const tempVideo = document.createElement('video');
        tempVideo.addEventListener('loadedmetadata', () => {
            const duration = tempVideo.duration;
            videoData.duration = duration;
            
            const width = duration * this.timelineScale;
            clip.style.width = width + 'px';
            clip.style.left = '0px';
            clip.textContent = videoData.name;

            URL.revokeObjectURL(tempVideo.src);
        });
        tempVideo.src = videoData.url;

        clip.addEventListener('click', () => {
            this.selectClip(clip);
        });

        trackContent.appendChild(clip);
    }

    selectClip(clipElement) {
        // Remove previous selection
        document.querySelectorAll('.video-clip').forEach(clip => {
            clip.classList.remove('selected');
        });

        // Select current clip
        clipElement.classList.add('selected');
        this.selectedClip = clipElement;
    }

    togglePlayPause() {
        const video = document.getElementById('previewVideo');
        
        if (this.isPlaying) {
            video.pause();
            this.isPlaying = false;
        } else {
            video.play();
            this.isPlaying = true;
        }
        
        this.updatePlayPauseButton();
    }

    stop() {
        const video = document.getElementById('previewVideo');
        video.pause();
        video.currentTime = 0;
        this.isPlaying = false;
        this.updatePlayPauseButton();
    }

    updatePlayPauseButton() {
        const btn = document.getElementById('playPauseBtn');
        const icon = btn.querySelector('i');
        
        if (this.isPlaying) {
            icon.className = 'fas fa-pause';
        } else {
            icon.className = 'fas fa-play';
        }
    }

    updateTimeDisplay() {
        document.getElementById('currentTime').textContent = this.formatTime(this.currentTime);
        document.getElementById('duration').textContent = this.formatTime(this.duration);
    }

    updateTimelinePlayhead() {
        const playhead = document.getElementById('timelinePlayhead');
        const position = (this.currentTime * this.timelineScale) + 120; // 120px for track header
        playhead.style.left = position + 'px';
    }

    updateVideoTiming() {
        const video = document.getElementById('previewVideo');
        const startTime = parseFloat(document.getElementById('startTime').value) || 0;
        const endTime = parseFloat(document.getElementById('endTime').value) || this.duration;

        // Note: In a full implementation, this would involve more complex video manipulation
        // For now, we'll just update the current time
        if (video.currentTime < startTime || video.currentTime > endTime) {
            video.currentTime = startTime;
        }
    }

    updatePlaybackSpeed(speed) {
        const video = document.getElementById('previewVideo');
        video.playbackRate = speed;
    }

    updateVideoEffects() {
        const video = document.getElementById('previewVideo');
        const brightness = document.getElementById('brightness').value;
        const contrast = document.getElementById('contrast').value;
        const saturation = document.getElementById('saturation').value;

        video.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
    }

    setupTimeline() {
        const timelineContainer = document.querySelector('.timeline-container');
        
        // Add click handler for timeline scrubbing
        timelineContainer.addEventListener('click', (e) => {
            const rect = timelineContainer.getBoundingClientRect();
            const x = e.clientX - rect.left - 120; // Subtract header width
            const time = Math.max(0, x / this.timelineScale);
            
            if (this.currentVideo) {
                const video = document.getElementById('previewVideo');
                video.currentTime = Math.min(time, this.duration);
            }
        });
    }

    updateTimelineRuler() {
        const ruler = document.getElementById('timelineRuler');
        ruler.innerHTML = '';

        if (!this.duration) return;

        const totalWidth = Math.max(1000, this.duration * this.timelineScale);
        ruler.style.minWidth = totalWidth + 'px';
        
        // Add time markers every 5 seconds
        for (let i = 0; i <= this.duration; i += 5) {
            const marker = document.createElement('div');
            marker.style.position = 'absolute';
            marker.style.left = (i * this.timelineScale) + 'px';
            marker.style.top = '0';
            marker.style.width = '1px';
            marker.style.height = '100%';
            marker.style.backgroundColor = '#666';
            marker.style.fontSize = '10px';
            marker.style.color = '#aaa';
            marker.style.paddingLeft = '3px';
            marker.textContent = this.formatTime(i);
            
            ruler.appendChild(marker);
        }
    }

    addTrack() {
        const tracksContainer = document.getElementById('timelineTracks');
        const trackCount = tracksContainer.children.length + 1;
        
        const track = document.createElement('div');
        track.className = 'track';
        track.id = `videoTrack${trackCount}`;
        
        track.innerHTML = `
            <div class="track-header">
                <span>Video Track ${trackCount}</span>
            </div>
            <div class="track-content" data-track="video${trackCount}">
            </div>
        `;
        
        tracksContainer.appendChild(track);
    }

    splitClip() {
        if (!this.selectedClip) {
            alert('Please select a clip to split');
            return;
        }

        // In a full implementation, this would split the clip at the current playhead position
        alert('Split functionality would be implemented here');
    }

    showExportModal() {
        document.getElementById('exportModal').style.display = 'block';
    }

    hideExportModal() {
        document.getElementById('exportModal').style.display = 'none';
        document.getElementById('exportProgress').style.display = 'none';
        document.getElementById('progressFill').style.width = '0%';
    }

    startExport() {
        if (!this.currentVideo) {
            alert('Please load a video first');
            return;
        }

        const format = document.getElementById('exportFormat').value;
        const quality = document.getElementById('exportQuality').value;
        
        document.getElementById('exportProgress').style.display = 'block';
        
        // Simulate export progress
        this.simulateExport();
    }

    simulateExport() {
        let progress = 0;
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                progressText.textContent = 'Export completed!';
                
                setTimeout(() => {
                    this.downloadVideo();
                }, 1000);
            } else {
                progressText.textContent = `Exporting... ${Math.round(progress)}%`;
            }
            
            progressFill.style.width = progress + '%';
        }, 200);
    }

    downloadVideo() {
        // In a real implementation, this would generate and download the processed video
        // For now, we'll just download the original video
        if (this.currentVideo) {
            const a = document.createElement('a');
            a.href = this.currentVideo.url;
            a.download = `edited_${this.currentVideo.name}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        
        this.hideExportModal();
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// Initialize the video editor when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new VideoEditor();
});

// Prevent default drag behaviors on the document
document.addEventListener('dragover', (e) => e.preventDefault());
document.addEventListener('drop', (e) => e.preventDefault());