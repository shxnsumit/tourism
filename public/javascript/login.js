const loginForm = document.getElementById("login-form");

loginForm.addEventListener('submit', async(event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const formDataJSON = Object.fromEntries(formData.entries());

    try{
        const response = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formDataJSON)
        });

        if(!response.ok){
            throw new Error("failed to login");
        }

        alert("login successfully");
        window.location.href = '/main';
    }catch(error){
        console.log("Error", error);
        alert("Failed to login. Please check your email and password.");
    }
})
