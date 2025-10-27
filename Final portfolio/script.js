// Ensure the script runs after the entire document is loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Contact Form Validation (for contact.html) ---

    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            
            // Prevent the default form submission (stops it from immediately opening mail client)
            event.preventDefault(); 
            
            const name = form.elements['name'].value.trim();
            const email = form.elements['email'].value.trim();
            const message = form.elements['message'].value.trim();
            
            let isValid = true;
            
            // Basic check for empty fields
            if (name === "" || email === "" || message === "") {
                alert('ERROR: All fields must be filled out.');
                isValid = false;
            }
            
            // Basic email format check using a regular expression
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (isValid && !emailPattern.test(email)) {
                alert('ERROR: Please enter a valid email address.');
                isValid = false;
            }
            
            if (isValid) {
                // If validation passes, allow the form to submit (which triggers the mailto action)
                form.submit(); 
                alert('Validation Successful! Your message is being sent.');
            }
        });
    }

}); // End of DOMContentLoaded

// --- 2. Project Filtering (for project.html) ---

// This function is called by the filter buttons in project.html
function filterProjects(category) {
    // Select all divs with the class 'project'
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => {
        // 'all' category or if the project has the matching technology class
        if (category === 'all' || project.classList.contains(category)) {
            project.style.display = 'block'; // Show the project
        } else {
            project.style.display = 'none'; // Hide the project
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const statusMessage = document.getElementById('statusMessage');

    contactForm.addEventListener('submit', function(event) {
        // Prevent the default form submission (which would navigate away)
        event.preventDefault();

        // Basic check for form validity (all 'required' fields are filled)
        if (contactForm.checkValidity()) {
            // Get form data
            const name = contactForm.elements['name'].value;
            const email = contactForm.elements['email'].value;
            const message = contactForm.elements['message'].value;

            // Construct the mailto link content
            const subject = 'New message from your portfolio website';
            const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
            
            // Encode the subject and body for the URL
            const mailtoLink = `mailto:kirubelmelaku454@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Open the user's email client
            window.open(mailtoLink, '_self');

            // Display success message
            statusMessage.textContent = 'Message sent successfully! Your email client should have opened to finish sending.';
            
            // Clear the form after a successful attempt
            contactForm.reset();

            // Clear the message after a few seconds (optional)
            setTimeout(() => {
                statusMessage.textContent = '';
            }, 8000); // Clears after 8 seconds

        } else {
            // If the browser thinks the form is invalid, let the browser's default validation message show.
            // This 'else' block is mostly a fallback.
            statusMessage.textContent = 'Please fill out all required fields correctly.';
            statusMessage.style.color = 'red';
        }
    });
});