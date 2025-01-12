/*!
* Start Bootstrap - Scrolling Nav v5.0.6 (https://startbootstrap.com/template/scrolling-nav)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-scrolling-nav/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };


    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

function readMore() {
    var readExpand = document.querySelectorAll("#readButton");
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("readButton");

    for (let button of readExpand) {
        button.addEventListener("click", function() {
            if (dots.style.display === "none") {
            dots.style.display = "inline";
            btnText.innerHTML = "Read more";
            moreText.style.display = "none";
            } else {
            dots.style.display = "none";
            btnText.innerHTML = "Read less";
            moreText.style.display = "inline";
            }
        });
    }
}
readMore();

const url = `https://api.thedogapi.com/v1/breeds`;
const api_key = "live_tmef6uMwxexLf5zPF4ZXBUOW7hQPpmQYfQo06lIiAYeQ0ki5R21G9KgfUKxIpu0r"
let storedBreeds = []

fetch(url,{headers: {
    'x-api-key': api_key
  }})
.then((response) => {
 return response.json();
})
.then((data) => {
 
 //filter to only include those with an `image` object
 data = data.filter(img=> img.image?.url!=null)
 
 storedBreeds = data;
 
 for (let i = 0; i < storedBreeds.length; i++) {
  const breed = storedBreeds[i];
  let option = document.createElement('option');
   
   //skip any breeds that don't have an image
   if(!breed.image)continue
   
  //use the current array index
  option.value = i;
  option.innerHTML = `${breed.name}`;
    document.getElementById('breed_selector').appendChild(option);
  
  }
 //show the first breed by default
 showBreedImage(0)
})
.catch(function(error) {
 console.log(error);
});

function showBreedImage(index) { 
    document.getElementById("breed_image").src= storedBreeds[index].image.url;
    document.getElementById("breed_json").innerHTML = storedBreeds[index].temperament;
    document.getElementById("height_json").innerHTML = JSON.stringify(storedBreeds[index].height.metric);
    document.getElementById("weight_json").innerHTML = JSON.stringify(storedBreeds[index].weight.metric);
    document.getElementById("origin_json").innerHTML = storedBreeds[index].origin;
    document.getElementById("life_span_json").innerHTML = storedBreeds[index].life_span;
}

