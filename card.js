export {TrumpCard}

class TrumpCard {
    constructor(data){
      Object.assign(this,data) 
    }
    getCardHtml(){
      const {name, img, magic, cunning, courage, wisdom, temper} = this
      return ` <div class="card">
        <div class="card-inner">
      <h3 class="card-name">${name}</h3>
      <div class="card-image-container">
        <img src=${img} class="card-image">
      </div>
      <ul class="card-attribute-container">
      <li id="magic" class="magic">Magic <span>&#10148;</span> ${magic} </li>
      <li id="cunning" class="cunning">Cunning <span>&#10148;</span> ${cunning} </li>
      <li id="courage" class="courage">Courage <span>&#10148;</span> ${courage} </li>
      <li id="wisdom" class="wisdom">Wisdom <span>&#10148;</span> ${wisdom} </li>
      <li id="temper" class="temper">Temper <span>&#10148;</span> ${temper} </li>
   </ul>
  </div>
   </div>`
    }
  }