import http.server
import socketserver
import os

PORT = 9091

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Normalize the requested path
        path = self.path

        # Serve static assets (e.g., /Img/output.json, /Img/*, /static/*, etc.)
        if path.startswith('/Img/') or path.endswith(('.js', '.css', '.json', '.png', '.jpg', '.jpeg', '.gif', '.ico')):
            # Serve the requested file directly
            super().do_GET()
        else:
            # For all other routes, serve index.html
            self.path = '/index.html'
            super().do_GET()

# Change to the directory containing this script
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Start the server
with socketserver.TCPServer(("127.0.0.1", PORT), SPAHandler) as httpd:
    print(f"Serving at http://127.0.0.1:{PORT}")
    httpd.serve_forever()
