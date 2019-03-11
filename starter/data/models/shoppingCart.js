
 class Shopping {
    constructor(){
        this.cart = [];
    }
    addProduct(id,title,price,img){
        const product = {
            id,
            title,
            price,
            img
        };
        this.cart.push(product);
        //Persist data in LocalStorage
       // this.persistData();
        return product;
    }

    deleteProduct(id){
        const index= this.cart.findIndex(el=>el.id === id);
        this.cart.splice(index,1);
        //Persist data in LocalStorage
  //      this.persistData();
    }
   /* isLiked(id){
        return this.like.findIndex(el =>el.id === id) !== -1;
    }*/
    getNumProducts(){
        return this.cart.length;
    }
  /*  persistData(){
        localStorage.setItem('likes',JSON.stringify(this.like));
    }
    readStorage(){
        const storage = JSON.parse(localStorage.getItem('likes'));
        //Restoring likes from the local storage
        if(storage){
            this.like = storage;
        }
    }*/
}
module.exports = Shopping;