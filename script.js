document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('domainForm');
    const domainInput = document.getElementById('domainInput');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const domain = domainInput.value.trim();
        
        if (!domain) {
            showError('Please enter a domain name');
            return;
        }

        await checkDomain(domain);
    });

    async function checkDomain(domain) {
        // Show loading, hide results
        showLoading(true);
        hideError();
        hideResult();

        try {
            const response = await fetch('https://domain-age-checker-6op1.onrender.com/api/check-domain', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ domain })
            });

            const data = await response.json();

            if (!response.ok) {
                showError(data.error || 'An error occurred');
                showLoading(false);
                return;
            }

            displayResult(data);
            showLoading(false);

        } catch (error) {
            console.error('Error:', error);
            showError('Unable to connect to the server. Please try again.');
            showLoading(false);
        }
    }

    function displayResult(data) {
        const creationDate = new Date(data.creation_date);
        const formattedDate = creationDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        document.getElementById('resultDomain').textContent = data.domain;
        document.getElementById('creationDate').textContent = formattedDate;
        document.getElementById('ageDays').textContent = Number(data.age_days).toLocaleString('en-US');
        document.getElementById('ageYears').textContent = data.age_years + ' yrs';

        showResult();
    }

    function showError(message) {
        document.getElementById('errorMessage').textContent = message;
        errorDiv.classList.remove('hidden');
    }

    function hideError() {
        errorDiv.classList.add('hidden');
    }

    function showResult() {
        resultDiv.classList.remove('hidden');
    }

    function hideResult() {
        resultDiv.classList.add('hidden');
    }

    function showLoading(show) {
        if (show) {
            loadingSpinner.classList.remove('hidden');
        } else {
            loadingSpinner.classList.add('hidden');
        }
    }
});
