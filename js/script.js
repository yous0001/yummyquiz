//slide bar
$(".bars").click(function () {
  let icon = $(".bars i").attr("class");

  if (icon.includes("fa-bars")) {
    $(".bars i").attr("class", "fa-solid fa-xmark fs-2");
    $(".slidebarcontainer").animate({ left: "0px" }, 500, function () {
      $(".l1").show(100, function () {
        $(".l2").show(100, function () {
          $(".l3").show(100, function () {
            $(".l4").show(100, function () {
              $(".l5").show(100);
            });
          });
        });
      });
    });
  } else {
    $(".bars i").attr("class", "fa-solid fa-bars fs-2");
    $(".l5").hide(100, function () {
      $(".l4").hide(100, function () {
        $(".l3").hide(100, function () {
          $(".l2").hide(100, function () {
            $(".l1").hide(100, function () {
              $(".slidebarcontainer").animate({ left: "-250px" }, 500);
            });
          });
        });
      });
    });
  }
});

//check loading
$(window).ready(function () {
  $(".loadingscreen").fadeOut(1000);
});

//get data from api
$(".l2").click(getcat)
$(".l3").click(function(){
  getlist('a')
})
$(".l4").click(function(){
  getlist('i')
})
$(".l5").click(contactus)
let catigores;
async function getcat() {
  let data = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
  let dataobj = await data.json();
  catigores =dataobj.categories;
  console.log(catigores);
  displaycat();
}

let list;
async function getlist(charlist='a'){
  let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?${charlist}=list`);
  let dataobj = await data.json();
  list=dataobj.meals;
  console.log(list);
  displaylist(charlist)
}

function displaycat() {
  let cartona = ``;
  for (let i = 0; i < catigores.length; i++) {
    cartona += `<div class="catigoryitem rounded-2 col-md-3 p-2 position-relative">
                    <div class="item">
                        <img src="${catigores[i].strCategoryThumb}" class="w-100">
                        </div>
                    <div class="imgcaption">
                    <h3 class="text-center">${catigores[i].strCategory}</h3>
                    <p class="text-center">${catigores[i].strCategoryDescription}</p>
                    </div>
                </div>`;
  
  }
  document.getElementById("row").innerHTML=cartona;
}
function displaylist(charlist){
  let cartona=``;
  let iconclassname;
  if (charlist=='a'){
    iconclassname="fa-solid fa-house-laptop fa-4x"
    for (let i = 0; i < list.length; i++) {
      cartona+=`<div class="rounded-2 col-md-3 p-2 text-center text-light">
                      <div class="item">
                      <i class="${iconclassname}"></i>
                      <h3>${list[i].strArea}</h3>
                      </div>
                  </div>
      `
    }
  }else{
    iconclassname="fa-solid fa-drumstick-bite fa-4x"
    for (let i = 0; i < list.length; i++) {
      
      cartona+=`<div class="rounded-2 col-md-3 p-2 text-center text-light">
                      <div class="item">
                      <i class="${iconclassname}"></i>
                      <h3>${list[i].strIngredient}</h3>
                      <p>${String(list[i].strDescription).slice(0,100)}</p>
                      </div>
                  </div>
      `
    }
  }
  
  document.getElementById("row").innerHTML=cartona;
}
let searchresult
async function getsearch(searchword) {

  let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchword}`);
  let dataobj = await data.json();
  searchresult =dataobj.meals;
  console.log(searchresult);
  displaymeals()
}
function selectmeal(selectedmeal){
  console.log("done")
  getsearch(`${selectedmeal}`)

}

function displaymeals()
{
  let cartona=``;
  for(let i=0;i<searchresult.length;i++){
    cartona+=`<div class="catigoryitem rounded-2 col-md-3 p-2 position-relative">
                  <div class="item" onclick="getsearch('${searchresult[i].strMeal}')">
                      <img src="${searchresult[i].strMealThumb}" class="w-100">
                      </div>
                  <div class="imgcaption d-flex align-items-center">
                  <h3 class="">${searchresult[i].strMeal}</h3>
                  </div>
              </div>`;
  }
  document.getElementById("row").innerHTML=cartona;
}
function contactus(){
  let cartona=`<div class="catigoryitem rounded-2 col-md-6 p-2 position-relative">
                  <div class="item">
                      <input type="text" class="form-control" placeholder="Enter Your Name">
                  </div>
                </div>
                <div class="catigoryitem rounded-2 col-md-6 p-2 position-relative">
                  <div class="item">
                      <input type="email" class="form-control" placeholder="Enter Your Email">
                  </div>
                </div>
                <div class="catigoryitem rounded-2 col-md-6 p-2 position-relative">
                  <div class="item">
                      <input type="number" class="form-control" placeholder="Enter Your phone">
                  </div>
                </div>
                <div class="catigoryitem rounded-2 col-md-6 p-2 position-relative">
                  <div class="item">
                      <input type="number" class="form-control" placeholder="Enter Your age">
                  </div>
                </div>
                <div class="catigoryitem rounded-2 col-md-6 p-2 position-relative">
                  <div class="item">
                      <input type="password" class="form-control" placeholder="Enter Your password">
                  </div>
                </div>
                <div class="catigoryitem rounded-2 col-md-6 p-2 position-relative">
                  <div class="item">
                      <input type="password" class="form-control" placeholder="Repassword">
                  </div>
                </div>

                <button type="submit" class="btn btn-outline-danger w-auto m-auto">Submit</button>`
document.getElementById("row").innerHTML=cartona;
}
getsearch('');


