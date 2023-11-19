const productsContainer = document.getElementById("products");

function showData(array){

    for (const product of array) {

        const div = document.createElement("div");
        div.classList.add("w-50");

        div.innerHTML +=
        `<div class="card m-2" id="product">
            <img src="${product.image}" class="mx-auto card-img-top w-25 mt-2">
            <div class="card-body">
                <h5 class="card-title">${cutText(product.title, true)}</h5>
                <p class="card-text">${cutText(product.description, false)}</p>
            </div>
        </div>`;

        div.addEventListener("click", function(){

            document.getElementById("alert").classList.remove("show");

            setTimeout(() => {
                document.getElementById("alert").classList.add("show");
            }, "2000");

        });

        productsContainer.appendChild(div);

    }

}


// Traemos los items de la API mediante un fetch

async function getData(url){

    try {
        let response = await fetch(url);
        let responseContents = await response.json();
        showData(responseContents);
    } catch (error) {
        console.log(error.message);
    }

}

function cutText(text, bool_title){

    let newText = text;
    let limit;
    
    if (bool_title){
        limit = 15;
    } else {
        limit = 30;
    }

    if (text.length > limit){
        newText = "";
        for (let i = 0; i < limit; i++){
            newText += text[i];
        }
        newText += "...";
    }

    return newText;

}

getData(API);

