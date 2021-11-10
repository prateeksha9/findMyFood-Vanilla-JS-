const favList = document.getElementById('displayFavDishes');


// array which contains all the favourite dishes
const favouriteList = [];
// set favouriteList to the local storage.
window.localStorage.setItem("meals", JSON.stringify(favouriteList));



// adds meals to favouriteList array and sets it to the local storage
function addToFav(value){
    if(localStorage.getItem("meals") === null){
        window.localStorage.setItem("meals", JSON.stringify(favouriteList));
    } else{

        // get item from localstorage
        let favouriteList  = localStorage.getItem("meals");
        // Parse it to something usable in js
        favouriteList = JSON.parse(favouriteList);


        let start;
        let end;
        let dish="" , area="", category="", pic="", id="";
        for (let i = 0; i < value.length; i++) {
            if(i === 0){
                start = 0;
                end = 0;
            }         
            if(value.charAt(i) === '-' && end === start){
                end = i;
            }
            if(i === value.length-1){
                end = value.length-1;
            }

            if(id.length === 0 && end !== start){
                id = value.substring(start, end);
                console.log(`id: ${id} ${start} ${end}`);  
                start = end+1;
                end = end +1;  
                console.log(`${start} ${end}`);  
            }
            
            else if(dish.length === 0 && end !== start){
                dish = value.substring(start, end);
                console.log(`dish: ${dish} ${start} ${end}`);  
                start = end+1;
                end = end +1;  
                console.log(`${start} ${end}`);
            } 
            
            else if(area.length === 0 && end !== start){
                area = value.substring(start, end);
                console.log(`area: ${area} ${start} ${end}`);  
                start = end+1;
                end = end +1;  
                console.log(`${start} ${end}`);
            } 
            else if(category.length === 0 && end !== start){
                category = value.substring(start, end);
                console.log(`category: ${category} ${start} ${end}`);  
                start = end+1;
                end = end +1;  
                console.log(`${start} ${end}`);
            } 
            else if(pic.length === 0 && end !== start){
                console.log("set ID")
                pic = value.substring(start, end+2);
                console.log(`pic: ${pic} ${start} ${end}`); 
            }
        }

        let isPresent = false
        favouriteList.forEach(element => {
            if(element.id === id){
                alert("Already Added");
                isPresent = true;
            }
        })
        if(!isPresent){

            // pushes the object containing all the dish details to the favouriteList array 
            favouriteList.push({  
                dish: dish,
                area: area, 
                category:category,
                pic:pic,
                id:id
            });
            console.log(favouriteList);
            alert("Added to favourties")
            
            
        }

        // sets it back to the local storage
        window.localStorage.setItem("meals", JSON.stringify(favouriteList));
    }
    // window.localStorage.setItem("meals", JSON.stringify(array));
    
}



// sets the dish name in local storage so that it can be used in dishOnly.js to render dish specific page
function testing(number){
    window.localStorage.setItem("dishOnly", number);
}



// creates a div which will contain all the dish details fetched from the api to be displayed on UI
function returnDishes(DishArray){
    DishArray.forEach(element => {
        console.log(element.strMeal);
        const number = `${element.idMeal}`; const dish = `${element.strMeal}`; const pic = `${element.strMealThumb}`; const area = `${element.strArea}`;
        const category = `${element.strCategory}`
        const html = 
        `<div id = "dish-card">
            <div id="left">
                <!-- contains image -->
                <img src = "${element.strMealThumb}" alt="${element.strMeal} Pic" id="dish-image"/>
                <div id="favourite-btn"> 
                    <button type="click" id="favourite-btn-click" onclick="addToFav(this.value)" value = "${number}-${dish}-${area}-${category}-${pic}" class="btn"> Favourite </button>
                </div>
            </div>
            <div id="right">
                <div id = "dish-name">
                    <h2 id="this-dish">${element.strMeal}</h2>
                </div>
                <div id="dish-abt">
                    <span> This ${element.strArea} ${element.strCategory} delicacy has an amazing taste which has the power to give you an out of the world experience.</span>
                </div>
                <div>
                    <a href = "dishOnly.html"> <button  id="knowMore" class="btn" onclick="javascript:testing(this.value)" value= "${number}" >Know More</button></a>
                </div>
            </div>
        </div>`
        
        display_dishes.innerHTML += html
        
    });
}


// fetch dish details from the api
function fetchDishDetails(e){
    e.preventDefault();
    let dish = document.getElementById('search_dish').value;
    
    console.log("fetchDishDetails called")
    if(dish.length < 2){
        alert("Enter a valid dish");
    } else{
            var xhrRequest = new XMLHttpRequest();
            xhrRequest.onload= function(){
                var data = JSON.parse(xhrRequest.response)
                var dish=data.meals;
                // console.log(dish)
                if(dish === null){
                    console.log("Dish not found")
                } else{
                    returnDishes(dish);
                }
            }
            xhrRequest.open('get', `https://www.themealdb.com/api/json/v1/1/search.php?s=${dish}`)
            xhrRequest.send();
    }  
}
document.querySelector('#search-btn').addEventListener('click', fetchDishDetails);