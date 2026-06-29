import json
import os
import sqlite3
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse

# Root folder of the website project
ROOT = Path(__file__).resolve().parent
# SQLite database file used to store all project records
DB_PATH = ROOT / 'portfolio.db'


def init_db():
    # Connect to the SQLite database
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    # Create the projects table if it does not already exist
    cur.execute('''
        CREATE TABLE IF NOT EXISTS projects (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            date TEXT NOT NULL,
            dateSort TEXT NOT NULL,
            type TEXT NOT NULL,
            categoryFilter TEXT NOT NULL,
            category TEXT NOT NULL,
            description TEXT NOT NULL,
            tags TEXT NOT NULL,
            repoUrl TEXT,
            websiteUrl TEXT,
            media TEXT NOT NULL
        )
    ''')
    # Check whether the database already contains any projects
    cur.execute('SELECT COUNT(*) FROM projects')
    if cur.fetchone()[0] == 0:
        # Seed the database with initial portfolio project data
        seed_projects = [
            {
                'id': 'project1',
                'title': 'Promotional Website',
                'date': 'Oct 2025',
                'dateSort': '2025-10-01',
                'type': 'college',
                'categoryFilter': 'web',
                'category': 'Web Experience',
                'description': 'A polished promotional website designed for a public figure, featuring a product catalogue, contact form, and responsive pages built around a clean user experience.',
                'tags': ['HTML', 'CSS', 'JavaScript', 'UI Design'],
                'repoUrl': 'https://github.com/Ahmed8923/TK-Max-site',
                'websiteUrl': 'https://ahmed8923.github.io/TK-Max-site/',
                'media': [
                    {'type': 'image', 'src': 'img/project-images/pr1.png', 'alt': 'Promotional website landing page'},
                    {'type': 'image', 'src': 'img/project-images/pr1.2.png', 'alt': 'Promotional website product section'},
                    {'type': 'image', 'src': 'img/project-images/pr1.3.png', 'alt': 'Promotional website contact section'}
                ]
            },
            {
                'id': 'project2',
                'title': 'Digital Skills Roadmap',
                'date': 'Nov 2025',
                'dateSort': '2025-11-01',
                'type': 'college',
                'categoryFilter': 'research',
                'category': 'Research Project',
                'description': 'A research-led project exploring digital skills in modern careers, including job roles, employer expectations, and a personal development plan.',
                'tags': ['Research', 'Career Planning', 'Digital Skills', 'Analysis'],
                'repoUrl': '',
                'websiteUrl': '',
                'media': []
            },
            {
                'id': 'project3',
                'title': 'Unity Game',
                'date': 'Oct 2025',
                'dateSort': '2026-01-01',
                'type': 'college',
                'categoryFilter': 'game',
                'category': 'Game Development',
                'description': 'A prototype 2D game inspired by classic arcade action, built with Unity and focused on fast gameplay and simple controls.',
                'tags': ['Unity', 'Game Dev', '2D Graphics', 'Gameplay'],
                'repoUrl': 'https://github.com/',
                'websiteUrl': '',
                'media': [
                    {'type': 'video', 'src': 'img/project-images/game.mkv', 'caption': 'Gameplay preview of the Unity prototype'}
                ]
            },
            {
                'id': 'project4',
                'title': 'Database System',
                'date': 'Jan 2026',
                'dateSort': '2026-02-01',
                'type': 'college',
                'categoryFilter': 'database',
                'category': 'Database Project',
                'description': 'A SQLite-based database system designed to manage users, products, and sales data with CRUD functionality and business-focused reporting.',
                'tags': ['SQLite', 'SQL', 'Database', 'CRUD', 'Data Analysis'],
                'repoUrl': 'https://github.com/',
                'websiteUrl': '',
                'media': [
                    {'type': 'image', 'src': 'img/project-images/pr-data.png', 'alt': 'Database system dashboard'}
                ]
            },
            {
                'id': 'project5',
                'title': 'Escape Room Game',
                'date': 'May 2026',
                'dateSort': '2026-05-01',
                'type': 'college',
                'categoryFilter': 'game',
                'category': 'Interactive Game',
                'description': 'An interactive text-based escape room built as a console application, featuring puzzles, item collection, and exploration.',
                'tags': ['Python', 'Game Logic', 'Problem Solving'],
                'repoUrl': 'https://github.com/',
                'websiteUrl': '',
                'media': [
                    {'type': 'image', 'src': 'img/project-images/pr5.png', 'alt': 'Escape room game overview'}
                ]
            },
            {
                'id': 'project6',
                'title': 'Digital Wellbeing Project',
                'date': 'Jun 2026',
                'dateSort': '2026-06-01',
                'type': 'college',
                'categoryFilter': 'web',
                'category': 'Web Design',
                'description': 'A digital wellbeing website created for InternetMatters.org to encourage healthy technology habits among college students through a friendly and engaging experience.',
                'tags': ['UI/UX', 'HTML', 'CSS', 'JavaScript', 'Bootstrap'],
                'repoUrl': 'https://github.com/Ahmed8923/CalmDG',
                'websiteUrl': 'https://ahmed8923.github.io/CalmDG/',
                'media': [
                    {'type': 'image', 'src': 'img/project-images/pr6.1.png', 'alt': 'Digital wellbeing landing section'},
                    {'type': 'image', 'src': 'img/project-images/pr6.2.png', 'alt': 'Digital wellbeing content section'},
                    {'type': 'image', 'src': 'img/project-images/pr6.3.png', 'alt': 'Digital wellbeing final design'}
                ]
            }
        ]
        for project in seed_projects:
            cur.execute(
                '''
                INSERT INTO projects (id, title, date, dateSort, type, categoryFilter, category, description, tags, repoUrl, websiteUrl, media)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''',
                (
                    project['id'],
                    project['title'],
                    project['date'],
                    project['dateSort'],
                    project['type'],
                    project['categoryFilter'],
                    project['category'],
                    project['description'],
                    json.dumps(project['tags']),
                    project['repoUrl'],
                    project['websiteUrl'],
                    json.dumps(project['media'])
                ),
            )
    conn.commit()
    conn.close()


# Initialize the database when the server starts
init_db()


class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)
        # Serve project data from the database for the frontend
        if parsed.path == '/api/projects':
            conn = sqlite3.connect(DB_PATH)
            cur = conn.cursor()
            cur.execute('SELECT * FROM projects ORDER BY dateSort DESC')
            rows = cur.fetchall()
            conn.close()

            # Convert database rows into JSON-friendly objects for the browser
            projects = []
            for row in rows:
                projects.append({
                    'id': row[0],
                    'title': row[1],
                    'date': row[2],
                    'dateSort': row[3],
                    'type': row[4],
                    'categoryFilter': row[5],
                    'category': row[6],
                    'description': row[7],
                    'tags': json.loads(row[8]),
                    'repoUrl': row[9],
                    'websiteUrl': row[10],
                    'media': json.loads(row[11])
                })

            body = json.dumps(projects).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        super().do_GET()

    def log_message(self, format, *args):
        return


if __name__ == '__main__':
    # Make sure the server serves files from the website root folder
    os.chdir(ROOT)
    # Start the local web server on port 8000
    server = ThreadingHTTPServer(('0.0.0.0', 8000), Handler)
    print('SQLite-backed server running at http://localhost:8000')
    server.serve_forever()
