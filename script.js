

const form = document.getElementById('form');
const ul = document.getElementById('ul');
const myGifs = document.getElementById('myGifs');
const input = document.querySelector('.input');

const favList = [];

myGifs.addEventListener("click", () => {
    favList.map(item => {
        ul.insertAdjacentHTML("beforeend", `<li class="list-group-item">${item}</li>`)
    });
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let select = document.querySelector('select')
    if (!input.value) {
        input.placeholder = "No Value was entered"
        input.style.backgroundColor = "red";
        setTimeout(() => {
            input.style.backgroundColor = "white";
            input.placeholder = ""
        }, 3000)
        return
    }
    getGiphy(input.value, select.value)
    input.value = "";
})

ul.addEventListener("click", (e) => {
    if (e.target.innerHTML === "Delete") {
        e.target.parentElement.remove()
    } else if (e.target.className === "btn add") {
        favList.push(e.target.parentElement.innerHTML.replace('<button class="btn add">Like</button>', ''))
        swal("Done", "Item added successfully!", "success");
        e.target.className = "btn add btn-success"
        e.target.innerHTML = "Liked"
    }
})

const API_KEY = "AuAQ1e2nDNdvO0rsfkTPoYVTv7gAF18q"
function getGiphy(inputVal, selectVal) {
    for (let i = 0; i < 20; i++)
        fetch(`https://api.giphy.com/v1/gifs/search?&q=${inputVal}&limit=${selectVal}&api_key=${API_KEY}`)
            .then(response => response.json())
            .then((data) => {
                let li = document.createElement("li")
                li.className = "list-group-item"
                li.innerHTML = `<img src="${data.data[i].images.fixed_width.url}"class="rounded mx-auto d-block">
                <button class="btn btn-warning">Delete</><button class="btn add">Like</button>`
                ul.appendChild(li)
            })
}
