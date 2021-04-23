/* const { data } = require("jquery") */


function myData() {
    const Url = 'http://localhost:3000/api/' + document.getElementById("name").value
    const Data = {
        name: document.getElementById("name").value,
        replace: document.getElementById("replace").value
    }
    const otherParam ={
        headers: {
            "content-type":"application/json; charset=UTF-8"
        },
        method: "GET"
    }
    fetch(Url,otherParam)
    .then(data => {return data.json()})
    .then(res => {
        var list = document.getElementById('dblist')
        list.innerHTML = ' '
        var li = document.createElement('li')
        li.appendChild(document.createTextNode(res.info))
        list.appendChild(li)
    })
}
document.getElementById("post").addEventListener("click", postData)
function postData() {
    const Url = 'http://localhost:3000/post'
    const Data = {
        name: document.getElementById("name").value,
        replace: document.getElementById("replace").value
    }
    console.log(Data)
    const otherParam ={
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(Data),
        method: "POST"
    }
    var list = document.getElementById('list')
    var li = document.createElement('li')
    fetch(Url,otherParam)
    .then(data =>  {return data.json()})
    .then(text => {
        li.appendChild(document.createTextNode(Data.name))
        list.appendChild(li)
        console.log(text)
    })
    .catch(error => console.log(error))
}
document.getElementById("put").addEventListener("click", putData)
function putData() {
    const Url = 'http://localhost:3000/put'
    const Data = {
        name: document.getElementById("name").value,
        replace: document.getElementById("replace").value
    }
    console.log(Data)
    const otherParam ={
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(Data),
        method: "PUT"
    }
    fetch(Url,otherParam)
    .then(data =>  {return data.json()})
    .then(text => {
        var arr = list.childNodes
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].innerText == Data.name){
                arr[i].innerHTML = Data.replace
                break;
            }
            
        }

        console.log(text)
    })
    .catch(error => console.log(error))
}
document.getElementById("delete").addEventListener("click", deleteData)
function deleteData() {
    const Url = 'http://localhost:3000/delete'
    const Data = {
        name: document.getElementById("name").value,
        replace: document.getElementById("replace").value
    }
    console.log(Data)
    const otherParam ={
        headers: {
            //'Content-Type':'text/plain'
            'Content-Type':'application/json'
        },
        body: JSON.stringify(Data),
        method: "DELETE"
    }
    var list = document.getElementById('list')
    var li = document.createElement('li')
    fetch(Url,otherParam)
    .then(data =>  {return data.json()})
    .then(text => {
        var arr = list.childNodes
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].innerText == Data.name){
                list.removeChild(arr[i])
                break;
            }
        }
        console.log(text)
    })
    .catch(error => console.log(error))
}
document.getElementById("all").addEventListener("click", dbData)
function dbData() {
    const Url = 'http://localhost:3000/all'
    const otherParam ={
        headers: {
            'Content-Type':'application/json'
        },
        method: "GET"
    }
    var list = document.getElementById('dblist')
    list.innerHTML = ' '
    fetch(Url,otherParam)
    .then(data =>  {return data.json()} )
    .then(text => {
        for (let i = 0; i < text.length; i++) {
            var li = document.createElement('li')
            li.appendChild(document.createTextNode(text[i].info))
            list.appendChild(li)
        }
        console.log(text)
    })
    .catch(error => console.log(error))
}
/* let found = false;
  
            $("#list li").each((id, elem) => {
                if (elem.innerText == requiredText) {
                    found = true;
                }
            });
   *        });*/
          /* arr.forEach(element => {
            if(element.innerText == Data.name){
                list.removeChild(element)
                break;
            }
        }); */
/*         li.appendChild(document.createTextNode(Data.name))

        list.appendChild(li) */
//'Content-Type':'text/plain'
//body: JSON.stringify(Data),
//.then(res => console.log(res))
    //.then(res => res.text())