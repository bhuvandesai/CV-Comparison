# CV Comparison Tool

A simple web application to compare original and transformed CVs (PDFs) side by side.

## Features
- Upload pairs of CVs (original and transformed) to the `cv/` folder
- View and compare two CVs at a time in a clean, minimal interface
- Navigate between multiple CV pairs using compact arrow controls
- Built with Node.js and vanilla JavaScript (uses PDF.js for PDF rendering)

## Folder Structure
```
cv-comparison-tool/
├── cv/            # Place your PDF files here (filenames should include 'original' and 'transformed')
├── public/        # Static frontend files (index.html, etc.)
├── server.js      # Node.js backend server
├── package.json   # Project dependencies and scripts
```

## Getting Started

### 1. Install Node.js
If you don't have Node.js and npm, download and install from [nodejs.org](https://nodejs.org/).

### 2. Install dependencies
```
npm install
```

### 3. Add your CV PDFs
- Place your PDF files in the `cv/` folder.
- Each pair should have filenames containing `original` and `transformed` (e.g., `john_original.pdf`, `john_transformed.pdf`).

### 4. Start the server
```
npm start
```
Or:
```
node server.js
```

### 5. Open the app
Go to [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
- Click "Let's Compare" to start.
- Use the left/right arrows at the top to navigate between CV pairs.
- Click the back arrow to return to the welcome screen.

## Customization
- Edit `public/index.html` for UI changes.
- Edit `server.js` for backend logic.

## License
MIT 
