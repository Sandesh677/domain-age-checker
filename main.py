#!/usr/bin/env python3
"""
Domain Age Checker Tool

This tool checks the age of a domain by querying WHOIS data.
Serves a web interface for domain age checking.
"""

from flask import Flask, render_template, jsonify, request
from datetime import datetime, timezone
import whois
import os

app = Flask(__name__)

def get_domain_age(domain):
    """
    Get the creation date of the domain and calculate its age.
    """
    try:
        w = whois.whois(domain)
        creation_date = w.creation_date
        if isinstance(creation_date, list):
            creation_date = creation_date[0]
        if creation_date:
            # Ensure creation_date is timezone aware
            if creation_date.tzinfo is None:
                creation_date = creation_date.replace(tzinfo=timezone.utc)

            now = datetime.now(timezone.utc)
            age = now - creation_date

            return creation_date, age.days
        else:
            return None, None
    except Exception as e:
        return None, str(e)

@app.route('/')
def index():
    """Serve the main index page."""
    return render_template('index.html')

@app.route('/api/check-domain', methods=['POST'])
def check_domain():
    """API endpoint to check domain age."""
    data = request.get_json()
    domain = data.get('domain', '').strip()
    
    if not domain:
        return jsonify({'error': 'Domain name is required'}), 400
    
    creation_date, age_days = get_domain_age(domain)
    
    if creation_date is None:
        return jsonify({'error': f'Could not retrieve information for {domain}'}), 404
    
    return jsonify({
        'domain': domain,
        'creation_date': creation_date.isoformat(),
        'age_days': age_days,
        'age_years': round(age_days / 365.25, 2)
    })

if __name__ == "__main__":
    # Create templates directory if it doesn't exist
    os.makedirs('templates', exist_ok=True)
    os.makedirs('static', exist_ok=True)
    app.run(debug=True, host='0.0.0.0', port=5000)