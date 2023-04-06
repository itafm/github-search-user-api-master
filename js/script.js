// JS Vanilla

let form = document.querySelector('form')
let input = document.querySelector("#search")
let error = document.querySelector("#error");
let results = document.querySelector("#results")

form.addEventListener('submit', (event) => {
    event.preventDefault();
    results.innerHTML = ""

    if (input.value.length === 0) {
        error.innerText = "Uername invalid !!";
        setTimeout(() => {
            error.innerText = ""
        }, 3000);
    } else {
        fetch(`https://api.github.com/users/${input.value}`)
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                let card = document.createElement('div');
                card.classList.add('card')
                let cardBody = document.createElement('div')
                cardBody.classList.add('card-body')
                let img = document.createElement('img')

                if (data.message == "Not Found") {
                    img.src = "../images/found.webp"
                    img.classList.add('w-50')
                    cardBody.classList.add('text-center')
                    cardBody.appendChild(img)
                } else {
                    img.src = data.avatar_url
                    img.classList.add('w-50', 'rounded-circle', 'shadow', 'd-block', 'm-auto')

                    let h5 = document.createElement('h5')
                    h5.innerText = data.name;
                    h5.classList.add('mt-3')

                    let p = document.createElement('p')
                    p.innerText = data.login
                    p.classList.add('fw-lighter', 'mt-2')

                    let flex = document.createElement('div')
                    flex.classList.add('d-flex', 'justify-content-between')
                    flex.innerHTML = `<div>💼 ${data.company}</div>
                    <div>🎯 ${data.location}</div>`

                    let link = document.createElement('a')
                    link.classList.add('btn', 'btn-dark', 'w-100', 'mt-3')
                    link.href = data.html_url
                    link.innerText = "Show profile"
                    cardBody.append(img)
                    cardBody.append(h5)
                    cardBody.append(p)
                    cardBody.append(flex)
                    cardBody.append(link)
                }


                card.appendChild(cardBody)
                results.appendChild(card)

                input.value = ""
            }).catch((error) => {
                results.innerHTML = `<div class="alert alert-warning">
                <strong>Nous avons rencontré une erreur. Vérifez votre connexion internet !</strong>
            </div>`
            })
    }
})