const Shopping = require('./data/models/shoppingCart');
//const shoppingView = require('./data/views/shoppingCartView');

const fs = require('fs');
const http = require('http');
const url = require('url');
//Laptop data
const json = fs.readFileSync(`${__dirname}/data/data.json`,'utf-8');
const laptopData = JSON.parse(json);
//Smartphones data
const jsonSmartPhone = fs.readFileSync(`${__dirname}/data/dataSmartpones.json`,'utf-8');
const smartPhoneData = JSON.parse(jsonSmartPhone);

const server  = http.createServer((req,res)=>{
const pathName = url.parse(req.url, true).pathname;
const id =  url.parse(req.url, true).query.id;


if(pathName === '/laptops' || pathName === '/'){
    res.writeHead(200,{'Content-type': 'text/html'});
    fs.readFile(`${__dirname}/templates/template-overview.html`,'utf-8',(err,data)=> {
let overviewOutput = data;
        fs.readFile(`${__dirname}/templates/template-card.html`,'utf-8',(err,data)=> {
const cardsOutput = laptopData.map(el=>replaceTemplate(data,el)).join('');
  overviewOutput = overviewOutput.replace('{%CARDS%}',cardsOutput);

            res.end(overviewOutput);
        });

    });

}

else if(pathName ==='/smartphones' ){
    res.writeHead(200,{'Content-type': 'text/html'});
    fs.readFile(`${__dirname}/templates/template-overview.html`,'utf-8',(err,data)=> {
        let overviewOutput = data;
        fs.readFile(`${__dirname}/templates/template-card-smartPhones.html`,'utf-8',(err,data)=> {
            const cardsOutput = smartPhoneData.map(el=>replaceTemplate(data,el)).join('');
            overviewOutput = overviewOutput.replace('{%CARDS%}',cardsOutput);

            res.end(overviewOutput);
        });

    });

}

else if (pathName === '/laptop' && id <laptopData.length){

    res.writeHead(200,{'Content-type': 'text/html'});
    fs.readFile(`${__dirname}/templates/template-laptop.html`,'utf-8',(err,data)=>{
     const laptop = laptopData[id];
     const output = replaceTemplate(data,laptop);
     res.end(output);

    });
}
else if (pathName === '/smartphone' && id <smartPhoneData.length){

    res.writeHead(200,{'Content-type': 'text/html'});
    fs.readFile(`${__dirname}/templates/template-smartPhone.html`,'utf-8',(err,data)=>{
        const smartPhone = smartPhoneData[id];
        const output = replaceTemplate(data,smartPhone);
        res.end(output);

    });
}

else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)) {
    fs.readFile(`${__dirname}/data/img${pathName}`,(err,data)=>{
        res.writeHead(200,{'Content-type': 'image/jpg'});
        res.end(data);
    });
}
else {
    res.writeHead(404,{'Content-type': 'text/html'});
    res.end('URL was not found on the server');

}
});
server.listen(1337,'127.0.0.1',()=>{
    console.log('Listening for request now');
});

function replaceTemplate(originalHtml,laptop) {
    let output = originalHtml.replace(/{%PRODUCTNAME%}/g,laptop.productName);
    output = output.replace(/{%PRICE%}/g,laptop.price);
    output = output.replace(/{%CPU%}/g,laptop.cpu);
    output = output.replace(/{%RAM%}/g,laptop.ram);
    output = output.replace(/{%STORAGE%}/g,laptop.storage);
    output = output.replace(/{%DESCRIPTION%}/g,laptop.description);
    output = output.replace(/{%SCREEN%}/g,laptop.screen);
    output = output.replace(/{%IMAGE%}/g,laptop.image);
    output = output.replace(/{%ID%}/g,laptop.id);
    output = output.replace(/{%MAINCAMERA%}/,laptop.mainCamera);
    output = output.replace(/{%FRONTCAMERA%}/,laptop.frontCamera);
    output = output.replace(/{%SYSTEM%}/,laptop.system);
    output = output.replace(/{%SIM%}/,laptop.sim);


    return output;
}/*
fs.readFile(`${__dirname}/templates/template-overview.html`,'utf-8',(err,data)=>{
   data.docquerySelector('.shopping__list').addEventListener('click',(e)=>{
       if(e.target.closest('.shopping__list')){
           const id =e.target.closest('.shopping__link');
           console.log('Yes');
       }
   });

    res.end(data);

});*/
/*document.querySelector('.shopping__list').addEventListener('click',(e)=>{

    if(e.target.closest('.shopping__list')){
        const id =e.target.closest('.shopping__link');
        console.log('Yes');
    }
});*/
/*
elements.shoppingList.addEventListener("click",(e)=>{
    if(e.target.closest('.shopping__list')){
        const id =e.target.closest('.shopping__link')
    }
});*/
