let display = $('#display');
let columns = $('<div class = "columns is-multiline justify-center"></div>');

let createRoom = (name) => {
    let box = $(`<div class = "box"></box>`);
    box.css('height', '250px');
    box.css('margin-top', '40px');
    let roomName = $(`<h1 class= "hero is-centered">${name}</name>`);
    box.append(roomName);
    return box;
}

let createColumn = (name1, name2) =>{
    let column = $(`<div class = "column content"></div>`);
    column.append(createRoom(name1));
    column.append(createRoom(name2));
    return column;
}

columns.append(createColumn('Room1','Room2'));
columns.append(createColumn('Room3', 'Room4'));
columns.append(createColumn('Room5','Room6'));
display.append(columns);