//* Koristenje na axios
const login = async (email, password) => {
    try {
        const res = await axios({
            method: "POST",
            url: "/api/v1/login",
            data: {
                email, 
                password,
            }
        })
        console.log(res);
        window.location.href = "/siteoglasi";
        
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