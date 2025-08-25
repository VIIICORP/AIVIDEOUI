# Contributing to AI Video Editor

We love your input! We want to make contributing to AI Video Editor as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## Pull Requests

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Development Setup

1. **Fork and Clone the Repository**
   ```bash
   git clone https://github.com/your-username/AIVIDEOUI.git
   cd AIVIDEOUI
   ```

2. **Start Development Server**
   ```bash
   # Using Python 3
   python3 -m http.server 8080
   
   # Or using npm (if you have Node.js)
   npm run start
   ```

3. **Access the Application**
   Open http://localhost:8080 in your browser

## Code Style Guidelines

### JavaScript
- Use ES6+ features when possible
- Use camelCase for variable and function names
- Use PascalCase for class names
- Add comments for complex functionality
- Use semicolons
- Use single quotes for strings unless interpolation is needed

### CSS
- Use kebab-case for class names
- Group related properties together
- Use CSS custom properties for theming
- Ensure mobile responsiveness
- Follow BEM methodology where applicable

### HTML
- Use semantic HTML5 elements
- Include proper ARIA attributes for accessibility
- Use meaningful class and ID names
- Keep HTML structure clean and organized

## Testing

### Manual Testing Checklist
- [ ] Video file upload (drag & drop and click)
- [ ] Video playback controls (play, pause, stop)
- [ ] Timeline functionality (scrubbing, playhead movement)
- [ ] Effects controls (brightness, contrast, saturation)
- [ ] Video settings (start time, end time, playback speed)
- [ ] Timeline track management (add track, select clips)
- [ ] Export functionality
- [ ] Responsive design on different screen sizes
- [ ] Cross-browser compatibility

### Browser Testing
Test your changes in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Submitting Issues

### Bug Reports
When filing an issue, make sure to answer these questions:

1. What browser and version are you using?
2. What operating system are you using?
3. What did you do?
4. What did you expect to see?
5. What did you see instead?

### Feature Requests
We welcome feature requests! Please provide:

1. A clear description of the feature
2. Use cases and motivation
3. Any relevant examples or mockups
4. Consider the scope and complexity

## Feature Development Priority

### High Priority
- Audio track support
- Basic transition effects
- Text overlay functionality
- Keyboard shortcuts

### Medium Priority
- Advanced video effects
- Color correction tools
- Video stabilization
- Performance optimizations

### Low Priority
- Motion graphics
- 3D effects
- Advanced compositing
- Plugin system

## Code Review Process

1. All submissions require review before merging
2. Reviews focus on:
   - Code quality and style
   - Functionality and testing
   - Performance impact
   - User experience
   - Security considerations

## License

By contributing, you agree that your contributions will be licensed under the Apache License 2.0.

## Getting Help

- Check existing [issues](https://github.com/VIIICORP/AIVIDEOUI/issues)
- Create a new issue for bugs or feature requests
- Join discussions in existing issues

## Recognition

Contributors will be recognized in:
- README.md acknowledgments
- Release notes for significant contributions
- GitHub contributor statistics

Thank you for contributing to AI Video Editor! 🎬