//* Koristenje na axios
const login = async (email, password) => {
    try {
        await axios({
            method: "POST",
            url: "/api/v1/login",
            data: {
                email, 
                password,
            }
        })
        window.location.href = "/viewOglasi";
    }
    catch(err) {
        console.log(err);
    }
};

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault(); //da ne se refresh koga ke imame submit
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    login(email, password);
})