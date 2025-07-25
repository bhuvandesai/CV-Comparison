// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static('public'));
app.use('/cv', express.static('cv')); // Serve PDF files

// API to get CV pairs from the cv folder
app.get('/api/cv-pairs', (req, res) => {
    const cvFolderPath = path.join(__dirname, 'cv');
    
    try {
        // Check if cv folder exists
        if (!fs.existsSync(cvFolderPath)) {
            return res.json({ error: 'CV folder not found. Please create a "cv" folder and add your PDF files.' });
        }

        // Read all files from cv folder
        const files = fs.readdirSync(cvFolderPath)
            .filter(file => file.toLowerCase().endsWith('.pdf'))
            .map(file => ({
                name: file,
                path: `/cv/${file}`
            }));

        // Group files into pairs
        const pairs = groupFilesIntoPairs(files);
        
        res.json({ pairs });
    } catch (error) {
        res.json({ error: 'Error reading CV folder: ' + error.message });
    }
});

function groupFilesIntoPairs(files) {
    const pairs = [];
    const originalFiles = files.filter(f => f.name.toLowerCase().includes('original'));
    const transformedFiles = files.filter(f => f.name.toLowerCase().includes('transformed'));

    // Enhanced pairing logic
    originalFiles.forEach(originalFile => {
        const baseName = originalFile.name.toLowerCase()
            .replace('original', '')
            .replace('.pdf', '')
            .replace(/[_-]/g, '');
        
        const matchingTransformed = transformedFiles.find(tf => {
            const transformedBase = tf.name.toLowerCase()
                .replace('transformed', '')
                .replace('.pdf', '')
                .replace(/[_-]/g, '');
            return transformedBase === baseName;
        });

        if (matchingTransformed) {
            pairs.push({
                version1: originalFile,
                version2: matchingTransformed,
                name: baseName.replace(/[^a-zA-Z0-9]/g, ' ').trim() || `CV Pair ${pairs.length + 1}`
            });
        }
    });

    // If no perfect matches, pair sequentially
    if (pairs.length === 0 && originalFiles.length > 0 && transformedFiles.length > 0) {
        for (let i = 0; i < Math.min(originalFiles.length, transformedFiles.length); i++) {
            pairs.push({
                version1: originalFiles[i],
                version2: transformedFiles[i],
                name: `CV Pair ${i + 1}`
            });
        }
    }

    return pairs;
}

app.listen(PORT, () => {
    console.log(`CV Comparison Tool running at http://localhost:${PORT}`);
    console.log('Make sure to create a "cv" folder and add your PDF files!');
});