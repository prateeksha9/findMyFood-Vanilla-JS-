// event to remove the dish from localstorage when "Unfavourite" button is clicked
remove = (value) => {
    let favouriteList  = localStorage.getItem("meals");
        // Parse it to something usable in js
        favouriteList = JSON.parse(favouriteList);

        favouriteList.forEach(element => {
            if(element.dish === value){
                let index = favouriteList.indexOf(element);
                console.log(index)
                // let newList = favouriteList.filter((element ) => element  != value);
                // favouriteList.length = 0;                  
                // favouriteList.push.apply(favouriteList, newList);
                favouriteList.splice(index, 1);
                
            }
        })
        window.localStorage.setItem("meals", JSON.stringify(favouriteList));
}

// event to remove the dish from UI when "Unfavourite" button is clicked
displayFavDishes.addEventListener("click", e => {
    if(e.target.classList.contains("unfav")){
        e.target.parentElement.parentElement.remove();
    }  
})



// reder the list of all the favourite dishes to the webpage after recieving it from the local storage
function returnFavDishes(){
   
        // get the favouriteList array from localstorage 
        let favouriteList  = localStorage.getItem("meals");
        // Parse it to something usable in js
        favouriteList = JSON.parse(favouriteList);


        if(favouriteList.length === 0){
            const htmlFav = `No dish is added to favourites`
        // console.log(favouriteList.length)
        document.getElementById('displayFavDishes').innerHTML += htmlFav;
        }

        // iterate through the array
        favouriteList.forEach(element => {

            // render the details to webpage
        const htmlFav = 
        `<div id = "dish-card">
            <div id="left">
                <!-- contains image -->
                <img src = "${element.pic}" alt="${element.dish} Pic" id="dish-image"/>
                <button id="favourite-btn" class="btn unfav" onclick="remove(this.value)" value = "${element.dish}">Unfavourite</button>
            </div>
            
            <div id="right">
                <!-- contains details -->
                <div id = "dish-name">
                    <!-- Contains name -->
                    <h2>${element.dish}</h2>
                </div>
                <div id="dish-abt">
                    <span> This ${element.area} ${element.dishcategory} delicacy has an amazing taste which has the power to give you an out of the world experience.</span>
                </div>
            </div>
        </div>`

        document.getElementById('displayFavDishes').innerHTML += htmlFav;
        console.log(favouriteList.length)
    })
    window.localStorage.setItem("meals", JSON.stringify(favouriteList));
}


// call returnFavDishes() as soon as the window is loaded
window.onload = returnFavDishes();