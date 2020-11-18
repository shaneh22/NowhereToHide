
let voteButtonsActive = false;

let createPeopleBox = (x) =>{
    let box = $(`<div class = "box" id= "${x}"></div>`);
    let field = $(`<div class = "field level"></div>`);
    let p = $(`<p class = "level-item pr-0 mr-0" id = "#p${x}">Player ${x}</p>`);
    let btns = $('<div class = "buttons level-right pl-0 ml-0"></div>');
    field.append(p);
    box.append(field);
    field.append(btns);
    box.on('click', ()=>{
        if(!voteButtonsActive){
            let voteBtn = $('<button class="button is-success is-inline is-small level-item">✔</button>');
            let cancelBtn = $('<button class="button is-danger is-inline is-small level-item">✘</button>');
            voteBtn.on('click',()=>{
                //send vote to backend
                btns.empty();
            })
            cancelBtn.on('click',()=>{
                btns.empty();
                setTimeout(()=> voteButtonsActive = false, 10);
            })
            btns.append(voteBtn);
            btns.append(cancelBtn);
            voteButtonsActive = true;
        }
    })
    return box;
}

let createPeopleBoxes = (x) =>{
    let column = $('<div class = "column">');
    column.append(createPeopleBox(1+x));
    column.append(createPeopleBox(3+x));
    column.append(createPeopleBox(5+x));
    return column;
}

$('.columns').append(createPeopleBoxes(0));
$('.columns').append(createPeopleBoxes(1));