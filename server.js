import express from 'express';
import path from 'path';
import helmet from 'helmet';
import compression from 'compression';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('trust proxy', true); // required on Replit/hosted proxies

const CANON_HOST = 'fripse.com';

app.use((req, res, next) => {
  const isHttps = req.secure || req.headers['x-forwarded-proto'] === 'https';
  const host = (req.headers.host || '').toLowerCase();

  // Force HTTPS or wrong host
  if (!isHttps || host !== CANON_HOST) {
    // Always send clean domain without port
    const location = `https://${CANON_HOST}${req.originalUrl || '/'}`;
    return res.redirect(301, location);
  }

  next();
});


// Security and performance middleware
app.use(helmet());
app.use(
  helmet.hsts({
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  })
);
app.use(compression());

// Find static directory
const staticDir = ['dist', 'build'].map(p => path.join(__dirname, p)).find(p => {
  try { 
    return fs.existsSync(p); 
  } catch { 
    return false; 
  }
});

if (!staticDir) {
  console.warn('No dist/build directory found. Serving from current directory.');
}

// Serve static files with appropriate caching
app.use(express.static(staticDir || '.', {
  setHeaders: (res, filePath) => {
    if (/\.(js|css|png|jpg|jpeg|gif|svg|webp|ico|woff2?)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=300');
    }
  }
}));

// Special routes for files directory
app.use('/files', express.static(path.join(__dirname, 'public', 'files')));

// SPA fallback - serve index.html for all other routes
app.get('*', (req, res) => {
  const indexPath = path.join(staticDir || '.', 'index.html');
  try {
    res.sendFile(indexPath);
  } catch (err) {
    res.status(404).send('Page not found');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Serving static files from: ${staticDir || '.'}`);
});