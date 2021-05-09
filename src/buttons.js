

//document.getElementById("sign").addEventListener("click", httpReq)
function httpReq(id){
    console.log(id)
    let Url = 'http://localhost:3000/api/'
    const Data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value
    }
    const otherParam ={
        headers: {
            "content-type":"application/json; charset=UTF-8"
        },
        method: "GET"
    }
    if(id != "sign"){
        otherParam.body = JSON.stringify(Data)
        if(id == "delete"){
            otherParam.method = "DELETE"
            
        }else if(id == "post"){
            otherParam.method = "POST"
            
        }
    }
    Url = Url + '' + Data.name
    

    var list = document.getElementById('list')
    var li = document.createElement('li')

    fetch(Url,otherParam)
    .then(data =>  {return data.json()})
    .then(text => {

        li.appendChild(document.createTextNode(Data.name))
        list.appendChild(li)

        if(id == 'sign'){
            let y = document.getElementById('stage-select')
            y.style.display = 'block'
            let m = document.getElementById('currStageList')
            m.style.display = 'block'
            document.getElementById('cid').innerHTML = text.uid
            toStages()
        }else{
            let y = document.getElementById('stage-select')
            y.display = 'none'
            let m = document.getElementById('currStageList')
            m.style.display = 'none'
        }
        console.log(text)
    })
    .catch(error => console.log(error))
}

function toStages(){
    let Url = 'http://127.0.0.1:9000/api/v1/process'
    //'http://stages-service/api/v1/process'
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin','http://localhost:3000');
    const otherParam ={
        /* headers: {
            "content-type":"application/json; charset=UTF-8",
            "Access-Control-Allow-Origin" : "*",
            //"Access-Control-Allow-Origin":  "http://127.0.0.1:3000",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "content-type; Authorization"
        } */
        headers: headers,
        //mode: 'cors',
        method: "GET"
    }
    var list = document.getElementById('stages')
    list.innerHTML = '<option>choose a request</option>'

    fetch(Url,otherParam)
    .then(data => {return data.json();})
    .then(text => {
        //text.result

        for (let i = 0; i < text.count; i++) {
            var li = document.createElement('option')
            li.appendChild(document.createTextNode(text.results[i].name))
            li.id = text.results[i].id
            li.value = text.results[i].id
            //li.onclick = requestChosen(li.id)
            list.appendChild(li)
            console.log(text.results[i])
        }
        
    }).catch(error => console.log(error))

}
function requestChosen(){
    let Url = 'http://127.0.0.1:9000/api/v1/request'
    id = document.getElementById("stages").value
    if(id == null){
        return;
    }
    const Data ={
        process: {
            id: id
        },
        customerId: parseInt(document.getElementById("cid").innerText)
    }
    const otherParam ={
        headers:{
            "content-type":"application/json; charset=UTF-8"
        },
        method: "POST",
        body: JSON.stringify(Data)
    }
    console.log(Data)
    fetch(Url,otherParam)
    .then(data =>  {return data.json()})
    .then(text => { console.log(text) 
    }).catch(error => console.log(error))
}
function currentStageInfo(){
    let Url = 'http://127.0.0.1:9000/api/v1/request/customer/' + document.getElementById('cid').innerText
     const otherParam ={
        headers: {
            "content-type":"application/json; charset=UTF-8"
        },
        method: "GET"
    }
    var stages = document.getElementById('currentStage')
    stages.innerText = ''
    fetch(Url,otherParam)
    .then(data =>  {return data.json()})
    .then(text => {
        for (let i = 0; i < text.count; i++) {
            var li = document.createElement('p')
            
            let b = text.results[i].id
            let nameRequest = text.results[i].process.name
            let reqDescription = text.results[i].process.description
            let currStage = text.results[i].currentStage
            let currAct = currStage.action
            let partNum = currStage.ordering+1 //adjusted for reasons
            let msg = 'Your Request ID: '+ b + '<br /> For \" ' + nameRequest + ' \" is on stage #' + partNum + '<br> Which is: \" ' + currAct + " \" <br>"
            //li.appendChild(document.createTextNode(msg))
            li.innerHTML = msg 
            stages.append(li)
        }
         
    }).catch(error => console.log(error))

}

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

/* document.getElementById("put").addEventListener("click", putData) */
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
// document.getElementById("delete").addEventListener("click", deleteData)
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
    const Url = 'http://localhost:3000/api/all'
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
        let g = document.getElementById('database')
        g.style.display = 'block'
        for (let i = 0; i < text.length; i++) {
            var li = document.createElement('li')
            li.appendChild(document.createTextNode(text[i].Name))
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