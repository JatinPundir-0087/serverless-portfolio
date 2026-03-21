console.log("Portfolio Loaded!");

document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Get the data from the form inputs
    // (Make sure these IDs match the 'id' attributes in your index.html)
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        // 2. Send the data to your Netlify function
        const response = await fetch('/.netlify/functions/submit-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        });

        // 3. Handle the response
        if (response.ok) {
            //Redirect to thank you page
            window.location.href='thank-you.html';
        } else {
            const errorData = await response.json();
            alert("Error: " + errorData.error);
        }
    } catch (err) {
        console.error("Fetch error:", err);
        alert("Failed to connect to the server.");
    }
});