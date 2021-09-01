document.getElementById("button").addEventListener("click", function () {
  const inputfil = document.getElementById("inputfild");
  const inputvalue = inputfil.value;
  const parent = document.getElementById("parent");

  inputfil.value = "";
  if (inputvalue === "") {
    parent.textContent = "";
    const error1 = (document.getElementById("error1").innerHTML = `
    <h2 style=" color: midnightblue;" id="error1" class="text-center ">"Please type something" </h2>
    `);
    error1.textContent = "";
  } else {
    document.getElementById("error1").textContent = "";
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputvalue}`
    )
      .then((res) => res.json())
      .then((data) => lodedata(data.drinks));
  }
});

const lodedata = (arr) => {
  // console.log(arr);
  if (arr === null) {
    const error2 = document.getElementById("error2");

    error2.innerHTML = `
    <h2  style=" color: maroon; " class="text-center ">Can not found !!!</h2>
    `;
    document.getElementById("parent").textContent = "";
  } else {
    document.getElementById("error2").textContent = "";
    const parent = document.getElementById("parent");
    parent.textContent = "";
    arr.forEach((drink) => {
      const newele = document.createElement("div");
      newele.classList.add("col");
      newele.innerHTML = `
      <div data-bs-toggle="modal" data-bs-target="#exampleModal"  onclick="detail(${drink.idDrink})" class="card h-100 shadow">
      <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title text-center">${drink.strDrink}</h5>
      
      </div>
      </div>
      `;
      parent.appendChild(newele);
    });
  }
};

const detail = async (id) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const res = await fetch(url);
  const data = await res.json();
  modalup(data.drinks[0]);
};

const modalup = (dri) => {
  // console.log(dri.strCategory);
  const modal = document.getElementById("modal");

  const newlel = document.createElement("div");
  // newlel.innerHTML = "";
  newlel.innerHTML = `
<div  class=" modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog ">
  <div class="modal-content ">
    <div class="modal-header border-0 ">
     <div class="mx-auto">
        <h5 class="modal-title " id="exampleModalLabel">${dri.strCategory}</h5>
     </div>
      
    </div>
    <div id="modal-par" class="modal-body ">
    <img class="img-fluid" src="${dri.strDrinkThumb}" alt="">
   <h6 class="mt-3 text-center">${dri.strInstructionsIT}</h6>
    </div>
    <div class="modal-footer border-0">
      <button type="button" class="btn btn-secondary mx-auto" data-bs-dismiss="modal">Close</button>
     
    </div>
  </div>
</div>


</div>  
`;

  modal.appendChild(newlel);
};

// modal class
// modal-dialog modal-dialog-centered modal-dialog-scrollable
