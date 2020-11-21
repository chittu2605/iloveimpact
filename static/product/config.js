if (window.location.origin === "http://localhost:3001" || window.location.origin === "http://localhost:3000" || window.location.origin === "http://localhost:4000") {
    window.API_URL = "http://localhost:4000"
} else if (window.location.origin === "https://impact-node-app.herokuapp.com" || window.location.origin === "http://impact-node-app.herokuapp.com") {
    window.API_URL = "https://impact-node-app.herokuapp.com"
}
 