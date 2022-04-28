import {Redirect} from "../Router/Router";

import itemImg from '../../img/image_not_available.png';
import {getSessionObject, VerifyUser} from "../../utils/session";

const data = [{type: "meuble", description: "une table tres belle"},
  {type: "meuble", description: "une table tres belle"},
  {type: "meuble", description: "une table tres belle"}]
/**
 * Render the LoginPage
 */
const myItems = `
<section id="my-items-page">
    <h2 id="my-items-page-title"> Dernières offres</h2>
    <div id="">
        
    </div>
    <div id="my-items-page-content">
        <div id="my-item-menu">
            <div class="my-item-link"> <a href="#"  id="get-items-offered" data-uri="/"> Mes offres</a></div>
            <div class="my-item-link"> <a  href="#" id="get-items-cancelled" data-uri="/mesOffres"> Mes offres annulées </a></div>
            <div class="my-item-link" > <a href="#" id="get-items-assigned"  data-uri="/userhandeler"> Mes offres attribuées </a></div>
            <div class="my-item-link" > <a href="#" id="get-items-gifted-by-me"  data-uri="/userhandeler"> Mes offres données </a></div>
            <div class="my-item-link"> <a  href="#" id="get-items-gifted" data-uri="/additem"> Mes offres reçus  </a></div>     
        </div>
        <div id="all-recent-item">
            
        </div>
    </div>
    <div id="my-items-pop-up">
    
        <div id="cancell-item" class="pop-up-option"> Annuler l'offre </div>

        <div id="offer-again" style="color:green; font-weight: bold" class="pop-up-option"> Offir à nouveau </div>

        <div id="item-gived" style="color:green" class="pop-up-option"> Indiquer objet donné </div>

        <div id="item-not-gived" style="color:red" class="pop-up-option"> Indiquer objet non pris </div>

        <div id="rate-item" class="pop-up-option"> Noter l'offre </div>   
        
        <div id="update-item" class="pop-up-option"> Mettre à jour les informations  </div>
        
        <div id="show-item" class="pop-up-option"> Accéder à la publication </div>
        
        <div id="pick-recipient" class="pop-up-option"> Indiquer un membre receveur</div>
      
    </div>

    <div id="rating-box">
      <div id="error"> </div>
        <form class="rating">
        <label>
          <input type="radio" name="stars" value="1" />
          <span class="icon">★</span>
        </label>
        <label>
          <input type="radio" name="stars" value="2" />
          <span class="icon">★</span>
          <span class="icon">★</span>
        </label>
        <label>
          <input type="radio" name="stars" value="3" />
          <span class="icon">★</span>
          <span class="icon">★</span>
          <span class="icon">★</span>   
        </label>
        <label>
          <input type="radio" name="stars" value="4" />
          <span class="icon">★</span>
          <span class="icon">★</span>
          <span class="icon">★</span>
          <span class="icon">★</span>
        </label>
        <label>
          <input type="radio" name="stars" value="5" />
          <span class="icon">★</span>
          <span class="icon">★</span>
          <span class="icon">★</span>
          <span class="icon">★</span>
          <span class="icon">★</span>
        </label>
     
      </form>
      <textarea placeholder="commentaire" id="rate-comment" required></textarea>
      <input type="submit" name="envoyer" id="submit-rate-button" value="envoyer" />
    </div>
</section>

`;
let currentItemId;
let currentState = "offered";
const MyItems = async (id) => {

    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML = myItems;

    changeOptions(currentState);

    document.getElementById("my-items-page").addEventListener("click",function(e){
        console.log(e.target.id);
        if(e.target.id=="my-items-page" || e.target.id=="all-recent-item"
        || e.target.id=="my-items-page-content" || e.target.id=="my-item-menu"){

           let  popup = document.getElementById("my-items-pop-up");
            popup.style.display="none";
            document.getElementById("rating-box").style.display="none";

        }
    })

    document.getElementById("get-items-cancelled").addEventListener("click",function(e){
        e.preventDefault();
        currentState = "cancelled";
        document.getElementById("all-recent-item").innerText="";
        getMyItems(currentState,true);
        changeOptions(currentState);
    })
    document.getElementById("get-items-assigned").addEventListener("click",function(e){
        e.preventDefault();
        currentState = "Assigned";
        document.getElementById("all-recent-item").innerText="";
        getMyItems(currentState,true);
        changeOptions(currentState);

    })

    document.getElementById("get-items-offered").addEventListener("click",function(e){
        e.preventDefault();
        currentState = "offered";
        document.getElementById("all-recent-item").innerText="";
        getMyItems(currentState,true);
        changeOptions(currentState);
    })
    document.getElementById("get-items-gifted").addEventListener("click",function(e){
        e.preventDefault();
        currentState = "gifted";
        document.getElementById("all-recent-item").innerText="";
        getMyItems(currentState,false);
        changeOptions(currentState);
    })

    document.getElementById("get-items-gifted-by-me").addEventListener("click",function(e){
      e.preventDefault();
      currentState = "gifted-by-me";
      document.getElementById("all-recent-item").innerText="";
      getMyItems(currentState,true);
      changeOptions(currentState);
  })
    
    document.getElementById("cancell-item").addEventListener("click",function(e){
        let itemR = document.getElementById(currentItemId);
        if(cancelItem(currentItemId)){
            document.getElementById("all-recent-item").removeChild(itemR);
        }
        document.getElementById("my-items-pop-up").style.display="none";
    })

    document.getElementById("item-gived").addEventListener("click",function(e){
      let itemR = document.getElementById(currentItemId);

      if(itemGived(currentItemId,true)){
        document.getElementById("all-recent-item").removeChild(itemR);
      }
      document.getElementById("my-items-pop-up").style.display="none";
    })

    document.getElementById("item-not-gived").addEventListener("click",function(e){
      let itemR = document.getElementById(currentItemId);

      if(itemGived(currentItemId,false)){
        document.getElementById("all-recent-item").removeChild(itemR);
      }
      document.getElementById("my-items-pop-up").style.display="none";
    })

    document.getElementById("offer-again").addEventListener("click",function(e){
        let itemR = document.getElementById(currentItemId);

        if(offerAgain(currentItemId)){
            document.getElementById("all-recent-item").removeChild(itemR);
        }
        document.getElementById("my-items-pop-up").style.display="none";
    })

    document.getElementById("update-item").addEventListener("click",function(e){
        let params = [{key: "id", value: currentItemId}];
        Redirect("/updateitem", params);
    });

    document.getElementById("pick-recipient").addEventListener("click",function(e){
        let params = [{key: "id", value: currentItemId}];
        Redirect("/pickrecipient", params);
    })

    document.getElementById("show-item").addEventListener("click",function(e){
        let params = [{key: "id", value: currentItemId}];
        Redirect("/item", params);
    })

    document.getElementById("rate-item").addEventListener("click",function(e){
      document.getElementById("my-items-pop-up").style.display="none";
      document.getElementById("rating-box").style.display="flex";
    })

    document.getElementById("submit-rate-button").addEventListener("click",async function(e){
      var radios = document.getElementsByName("stars");
      var found = 1;
      for (var i = 0; i < radios.length; i++) {       
          if (radios[i].checked) {
              let nbStart = radios[i].value;
              let comment = document.getElementById("rate-comment").value;
              if(comment!=""){
                if( await rateItem(currentItemId,comment)){
                  document.getElementById("rating-box").style.display="none";
                };
                
              }else{
                document.getElementById("error").innerText="un commentaire est obligatoire";
              }
             
              found = 0;
              break;
          }
      }
        if(found == 1)
        {
          alert("Please Select Radio");
        } 
    })

    await getMyItems(currentState,true);

};

async function getMyItems(state,mine){
    await VerifyUser()
    if(state=="gifted-by-me"){
      state="gifted";
    }
    let allRecentItem = document.getElementById("all-recent-item");
    try {
        var options = {
                method: 'GET',
                headers: {"token" : getSessionObject("accessToken")},
                };
        let response;
        if(mine){
          response = await fetch("/api/items/myItems/"+state+"/1",options);
        } else{
          response = await fetch("/api/items/myItems/"+state+"/0",options);
        }       
         // fetch return a promise => we wait for the response
        if (!response.ok) {
          throw new Error(
              "fetch error : " + response.status + " : " + response.statusText
          )
        }


        const items = await response.json();

        console.log("here", items);

        items.forEach((item) => {
          let itemBox = document.createElement("div");
          let homePageImageBox = document.createElement("div");
          let itemImgDiv = document.createElement("img");
          let descriptionBox = document.createElement("div");
          let itemType = document.createElement("p")
          let itemDescription = document.createElement("p");

          itemBox.classList.add("item-box");
          itemBox.id=item.id;
          homePageImageBox.classList.add("home-page-item-image");
          descriptionBox.classList.add("home-page-item-description")

          itemType.classList.add("item-title");
          itemDescription.classList.add("item-description");

          //itemImgDiv.src = itemImg;
          getPicture(item.id,itemImgDiv);
          itemType.innerText = item.itemtype;
          itemDescription.innerText =  item.description.substring(0,40)+"...";

          descriptionBox.appendChild(itemType);
          descriptionBox.appendChild(itemDescription);
          homePageImageBox.appendChild(itemImgDiv);
          itemBox.appendChild(homePageImageBox);
          itemBox.appendChild(descriptionBox);

          itemBox.addEventListener("click", function () {

           document.getElementById("my-items-pop-up").style.display="flex";



           currentItemId = item.id;

          })
          allRecentItem.appendChild(itemBox);
        })

      } catch (error) {
        console.log(error);
      }
}
function changeOptions(state){

    let cancel  = document.getElementById("cancell-item");
    let offerAgain = document.getElementById("offer-again");
    let itemGived = document.getElementById("item-gived");
    let itemNotGived = document.getElementById("item-not-gived");

    let update  = document.getElementById("update-item");
    let show    = document.getElementById("show-item");
    let pickRecipient = document.getElementById("pick-recipient");

    let rating = document.getElementById("rate-item");

    let divs =  document.querySelectorAll("#my-items-pop-up div");

    for(let i=0;i<divs.length;i++){
        divs[i].style.display="none";
    }
    let links = document.querySelectorAll("#my-item-menu div a");
    console.log(links);
    for(let i=0;i<links.length;i++){
        links[i].style.fontWeight="normal";
    }

    document.getElementById("my-items-pop-up").style.display="none"
    document.getElementById("rating-box").style.display="none"
    if(state=="offered"){
        cancel.style.display="flex";
        update.style.display="flex";
        show.style.display="flex";
        pickRecipient.style="flex";
        document.getElementById("get-items-offered").style.fontWeight="bold";
    }else if(state=="cancelled"){
        offerAgain.style.display="flex";
        show.style.display="flex";
        document.getElementById("get-items-cancelled").style.fontWeight="bold";
    }else if(state=="Assigned"){
        itemGived.style.display="flex";
        itemNotGived.style.display="flex";

        itemGived.style.display="flex";
        show.style.display="flex";
        document.getElementById("get-items-assigned").style.fontWeight="bold"
    }else if(state=="gifted-by-me"){
      show.style.display="flex";
      document.getElementById("get-items-gifted-by-me").style.fontWeight="bold"

    }else{
      rating.style.display="flex";
      show.style.display="flex";
      document.getElementById("get-items-gifted").style.fontWeight="bold"
    }
}
async function cancelItem(idItem){
    await VerifyUser();
   try {
        var options = { method: 'POST',
        headers: {"token" : getSessionObject("accessToken")},
        mode: 'cors',
        cache: 'default',
        };
        const response = await fetch("/api/items/changeCondition/" + idItem+"/cancelled", options); // fetch return a promise => we wait for the response   changeCondition/{id}/{condition}

        if (response.ok) {
            return true;
        }
    }catch(error){
        console.log(error);
        return false;
    }
}
async function offerAgain(idItem){
    await VerifyUser()
    try {
         var options = { method: 'POST',
         headers: {"token" : getSessionObject("accessToken")},
         mode: 'cors',
         cache: 'default',
         };
         const response = await fetch("/api/items/offer/again/" + idItem, options); // fetch return a promise => we wait for the response

         if (response.ok) {
             return true;
         }
     }catch(error){
         console.log(error);
         return false;
     }
 }

async function itemGived(itemId,collected){
  try {
    var options = {
      method: 'POST',
      body: JSON.stringify({
        itemId: itemId,
        itemCollected: collected,
      }),
      headers: {
        "Content-Type": "application/json",
        "token" : getSessionObject("accessToken")
      },
      mode: 'cors',
      cache: 'default',
    };
    const response = await fetch("/api/items/itemCollected", options); // fetch return a promise => we wait for the response

    if (response.ok) {
      return true;
    }
  }catch(error){
    console.log(error);
    return false;
  }
}



 async function getPicture(itemId,imgDiv){
    try{
    const response = await fetch("/api/items/picture/"+itemId); // fetch return a promise => we wait for the response

    if (!response.ok) {
      imgDiv.src=itemImg;
      throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
      )
    }
    if(response.ok){

      const imageBlob = await response.blob();
          const imageObjectURL = URL.createObjectURL(imageBlob);
          console.log(imageObjectURL);
          imgDiv.src=imageObjectURL

    }

    }catch(error){
      console.log(error)
    }
  }
async function rateItem(itemId,comment){
  try {
    var options = {
      method: 'POST',
      body: JSON.stringify({
        itemId: itemId,
        comment: comment,
      }),
      headers: {
        "Content-Type": "application/json",
        "token" : getSessionObject("accessToken")
      },
      mode: 'cors',
      cache: 'default',
    };
    const response = await fetch("/api/items/rate", options); // fetch return a promise => we wait for the response

    if (response.ok) {
      return true;
    }
  }catch(error){
    console.log(error);
    return false;
  }
}
export default MyItems;