import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// Static Bearer token
const STATIC_TOKEN = 'backend_static_token';

// Middleware
app.use(cors());
app.use(express.json());

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.replace('Bearer ', '');
    if (token !== STATIC_TOKEN) {
        return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }
    next();
};

// POST request
app.post('/api/projects', authenticateToken, async (req, res) => {
    try {
        // Read existing projects
        const projectsData = await fs.readFile(join(__dirname, 'projects.json'), 'utf8');
        const projects = JSON.parse(projectsData);

        // If ID is provided in body, filter by ID
        if (req.body.id) {
            const filteredProjects = projects.filter(project => project.id == req.body.id);
            if (filteredProjects.length > 0) {
                res.json(filteredProjects);
            } else {
                res.json({ error: 'Project not found' });
            }
        } else {
            res.json(projects);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get team data
app.get('/api/team', async (req, res) => {
    try {
        // Read team data
        const teamData = await fs.readFile(join(__dirname, 'team.json'), 'utf8');
        res.json(JSON.parse(teamData));
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});