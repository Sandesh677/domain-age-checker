# Domain Age Checker

A web-based tool to check the age of a domain by querying WHOIS data. Features a modern, responsive web interface built with HTML, CSS, and JavaScript.

## Features

- 🌐 Web-based interface with real-time domain age checking
- 📱 Fully responsive design that works on desktop and mobile
- ⚡ Fast WHOIS lookup using the `python-whois` library
- 📊 Displays creation date, age in days, and age in years
- 🎨 Modern UI with gradient design and smooth animations
- 🔍 Easy-to-use search interface

## Installation

1. Clone or download this project
2. Install the required packages:

```bash
pip install -r requirements.txt
```

## Usage

Start the web server:

```bash
python main.py
```

Then open your browser and navigate to:

```
http://localhost:5000
```

Enter a domain name (e.g., `google.com`, `github.com`) and click "Check Age" to see the domain's creation date and age.

## Requirements

- Python 3.6+
- Flask - Web framework
- python-whois - WHOIS data retrieval

## Project Structure

```
.
├── main.py              # Flask application and backend logic
├── requirements.txt     # Python dependencies
├── templates/
│   └── index.html       # Web interface
└── static/
    ├── style.css        # Styling
    └── script.js        # Client-side functionality
```

## API Endpoint

The application exposes an API endpoint for domain checking:

**POST** `/api/check-domain`

Request body:
```json
{
  "domain": "example.com"
}
```

Response:
```json
{
  "domain": "example.com",
  "creation_date": "1995-08-15T00:00:00+00:00",
  "age_days": 10932,
  "age_years": 29.94
}
```

## Notes

- ⚠️ WHOIS data may not be available for all domains
- Some domains may return partial or limited information
- Results are based on WHOIS registry data accuracy