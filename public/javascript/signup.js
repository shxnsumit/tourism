const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(signupForm);
    const formDataJSON = Object.fromEntries(formData.entries());

    try{
        const response = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formDataJSON)
        });

        if(!response.ok){
            throw new Error("Failed to signup");
        }

        alert("singup successfully!");
        window.location.href = '/login';
    }catch(error){
        console.log("Error", err);
        alert("Failed to sign up. Please try again.")
    }
})