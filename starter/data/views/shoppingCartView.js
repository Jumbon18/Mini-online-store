/*const elements ={
    shoppingList: document.querySelector('.shopping__list')
};*/

module.exports.renderProduct = item =>{
const markup = `
 <li  class="shopping__item" data-itemid="${item.id}">
                            <a class="shopping__link" href="#${item.id}">
                                <figure class="shopping__fig">
                                    <img src="${item.img}" alt="Test">
                                </figure>
                                <div class="shopping__data">
                                    <h4 class="shopping__name">${item.title}</h4>
                                    <p class="shopping__price">${item.price}</p>
                                </div>
                                   <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                            </a>
                        </li>
`;
//insert into HTML
    document.querySelector('.shopping__list').insertAdjacentHTML("beforeend",markup );
};
module.exports.deleteProduct = id =>{
const el =document.querySelector(`.shopping__link[href*="${id}"]`).parentElement;
if (el){
    el.parentElement.removeChild(el);
}
};