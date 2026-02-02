const loginBtn = document.getElementById("login");

loginBtn.addEventListener("click", async () => {
    // 1. Grab the values from the inputs
    // We use querySelector to find the inputs by their placeholder text
    const key = document.querySelector('input[placeholder="XXXX-XXXX-XXXXXX"]').value;
    const passphrase = document.querySelector('input[placeholder="Passphrase"]').value;

    try {
        // 2. Send the data to your Nginx /login endpoint
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key: key,
                passphrase: passphrase
            })
        });

            const text = await response.text(); 
console.log("Raw response from server:", text); 
const result = JSON.parse(text);

        // 3. Handle the response from Python
        if (response.ok) {
            alert("Success: " + result.message);
            // Redirect to a dashboard or secret page
            // window.location.href = "/dashboard.html"; 
        } else {
            alert("Login Failed: " + result.message);
        }
    } catch (error) {
        console.error("Error connecting to backend:", error);
        alert("Could not connect to the authentication server.");
    }
});