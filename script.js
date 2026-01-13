document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const FormData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch('http://localhost:4000/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(FormData)
        });

        const result = await response.json();

       
        document.getElementById('message').innerText = result.message || "Form submitted successfully!";
    } catch (error) {
        console.error("Error submitting form:", error);
        document.getElementById('message').innerText = "Something went wrong.";
    }
});
