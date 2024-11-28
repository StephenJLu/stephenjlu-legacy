document.getElementById("contactForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Prepare payload
    const payload = {
        to: "stephen@stephenjlu.com", // Set this to the recipient email (SendLayer email account for testing)
        from: "hello@stephenjlu.com", // Replace with a verified sender address
        subject: subject,
        ContentType: "HTML",
        HTMLContent: `<html><body><p>Message from <strong>${name}</strong> (${email}):<br>${message}</p></body></html>`
    };

    const apiKey = "851DD907-2337DB62-B25FFC5C-CCAC2DC6"; // Replace with your actual SendLayer API key

    try {
        // Send data to SendLayer API
        const response = await fetch("https://api.sendlayer.com/v1/email/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        // Handle success or error
        if (response.ok) {
            document.getElementById("responseMessage").textContent = "Email sent successfully!";
        } else {
            document.getElementById("responseMessage").textContent = `Error: ${data.message}`;
        }
    } catch (error) {
        console.error("Error sending email:", error);
        document.getElementById("responseMessage").textContent = "An error occurred. Please try again.";
    }
});
