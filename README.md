# AI Video Editor - Open Source Video Editing Tool

A modern, web-based video editor built with HTML5, CSS3, and JavaScript. This open-source video editor provides essential video editing capabilities directly in your browser without requiring any installations or plugins.

## 🎬 Features

### Core Video Editing
- **Video Import**: Drag and drop or click to upload video files
- **Multi-format Support**: Supports MP4, WebM, and other HTML5 video formats
- **Real-time Preview**: Instant video preview with playback controls
- **Timeline Interface**: Professional timeline with multiple tracks support
- **Video Trimming**: Set start and end times for precise editing

### Visual Effects
- **Brightness Control**: Adjust video brightness (0-200%)
- **Contrast Control**: Modify video contrast (0-200%)
- **Saturation Control**: Change color saturation (0-200%)
- **Playback Speed**: Variable speed control (0.5x to 2x)

### Professional Tools
- **Multiple Tracks**: Add and manage multiple video tracks
- **Clip Selection**: Select and manipulate individual video clips
- **Timeline Scrubbing**: Click anywhere on timeline to jump to specific time
- **Split Functionality**: Split clips at current playhead position (planned)
- **Export Options**: Export videos in MP4 or WebM formats

### User Interface
- **Modern Dark Theme**: Professional video editor appearance
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Drag & Drop**: Intuitive file upload with visual feedback
- **Keyboard Shortcuts**: Efficient workflow with keyboard controls (planned)

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software or plugins required

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VIIICORP/AIVIDEOUI.git
   cd AIVIDEOUI
   ```

2. **Open in browser:**
   Simply open `index.html` in your web browser, or serve it using a local web server:
   
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Access the editor:**
   Navigate to `http://localhost:8000` in your browser

## 📖 How to Use

### Basic Workflow

1. **Import Video:**
   - Click the upload area or drag video files into the media library
   - Videos will appear in the media library on the left

2. **Load Video:**
   - Double-click a video in the media library to load it
   - The video will appear in the preview area and timeline

3. **Edit Video:**
   - Use the properties panel on the right to adjust video settings
   - Modify brightness, contrast, saturation, and playback speed
   - Set start and end times for trimming

4. **Timeline Control:**
   - Click anywhere on the timeline to jump to that time
   - Use play/pause and stop buttons for playback control
   - Add additional tracks using the "Add Track" button

5. **Export Video:**
   - Click the "Export" button in the header
   - Choose format (MP4 or WebM) and quality
   - Click "Start Export" to download the edited video

### Interface Layout

- **Left Panel**: Media library for imported videos
- **Center**: Video preview with playback controls
- **Right Panel**: Properties and effects controls
- **Bottom**: Timeline with tracks and playhead

## 🛠️ Technical Details

### Architecture
- **Frontend Only**: Pure client-side application
- **No Server Required**: All processing happens in the browser
- **Web APIs**: Uses HTML5 Video API and Canvas for video manipulation
- **Modern CSS**: Flexbox and Grid layouts for responsive design

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

### File Format Support
- **Input**: MP4, WebM, OGV, and other HTML5-supported formats
- **Output**: MP4, WebM (browser-dependent)

## 🎯 Roadmap

### Version 1.0 (Current)
- [x] Basic video import and preview
- [x] Timeline interface
- [x] Visual effects (brightness, contrast, saturation)
- [x] Export functionality
- [x] Responsive design

### Version 1.1 (Planned)
- [ ] Audio track support
- [ ] Transition effects
- [ ] Text overlays
- [ ] Crop and resize tools
- [ ] Keyboard shortcuts

### Version 1.2 (Future)
- [ ] Advanced effects library
- [ ] Color correction tools
- [ ] Multi-layer composition
- [ ] Video stabilization
- [ ] Motion graphics support

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Test thoroughly across different browsers
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

### Code Style
- Use ES6+ JavaScript features
- Follow semantic HTML structure
- Use CSS custom properties for theming
- Comment complex functionality
- Ensure mobile responsiveness

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Font Awesome for icons
- Modern web standards and APIs
- Open source community

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/VIIICORP/AIVIDEOUI/issues) page
2. Create a new issue with detailed information
3. Provide browser information and steps to reproduce

## 🌟 Star History

If you find this project useful, please consider giving it a star on GitHub!

---

**Made with ❤️ by the VIIICORP team**
