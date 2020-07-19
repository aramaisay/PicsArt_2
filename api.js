
const getInfoAboutTheCountry = async (code) => {
    try {
        const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${code}`);
        const data = await response.json();
        return { 
            name: data.name,
            capital: data.capital,
            altSpellings: data.altSpellings,
            continent: data.subregion,
            population: data.population,
            x: data.latlng[0],
            y: data.latlng[1],
            area: data.area,
            currencies: data.currencies[0].name,
            lang: data.languages[0].nativeName,
            flag: data.flag
        }
    }
    catch (err) {
        console.log(err);
    }
}
// ***********************
// Deleting Loading Element
// ***********************

const DeleteTheLoadingElement = (id) => {
    document.getElementById(id).remove()
}

// ************************
// Overlay Div
// ************************

const activateTheOverlayDiv = () => {
    const theDiv = document.getElementById('overlay');
    theDiv.style.top = '0';
}

const callBackForTheCross = () => {
    const theDiv = document.getElementById('overlay');
    theDiv.style.top = '100%';
    const DataBody = document.getElementById('bodyOfOverlay');
    DataBody.innerHTML = '';
}

const connectTheCallback = () => {
    const TheCross = document.getElementById('cross');
    TheCross.onclick = callBackForTheCross;
}

const CreateTheData = (key,value) => {
    const newDataDiv = document.createElement('div');
    newDataDiv.innerText = `${key} - ${value}`;
    newDataDiv.classList.add('DataDiv');
    return newDataDiv;
}
const PlaceTheData = (id,dataDiv) => {
    const parentNode = document.getElementById(id);
    parentNode.appendChild(dataDiv);
}

const loopThroughTheData = (data) => {
    for(let key in data){
        PlaceTheData( 'bodyOfOverlay' ,CreateTheData(key,data[key]));
    }
}

// ***********************
// Callbacks
// ***********************

const generalCallback = async (code) => {
    const data = await getInfoAboutTheCountry(code);
    activateTheOverlayDiv();
    connectTheCallback();
    console.log(data);
    loopThroughTheData(data);
}

// ***********************
// Manipulation with the view of info
// ***********************

// setting the title of the info section to the name
const setTheTitleOfTheInfo = (element, idForTheTitle) => {
    const Title = document.getElementById(idForTheTitle);
    Title.innerText = `${element.name} - ${element.nativeName}`;
}

// creating buttons
const createButton = text => {
    const btn = document.createElement('button');
    btn.classList.add('button');
    btn.innerText = text;
    return btn;
}

// addingTheButtons
const placeTheButton = (idWhereToPLace, btn, callBack) => {
    const cont = document.getElementById(idWhereToPLace);
    btn.addEventListener('click', callBack);
    cont.appendChild(btn);
}

// Modifing info cont
const modifyInfoCont = (idOfInfoCont, classToBeRemoved, classToBeAdded) => {
    const cont = document.getElementById(idOfInfoCont);
    cont.innerText = '';
    cont.classList.remove(classToBeRemoved);
    cont.classList.add(classToBeAdded);
}

// 
const configureInfoSection = (code, element) => {
    setTheTitleOfTheInfo(element, 'infoTitle');
    modifyInfoCont('infoCont', 'infoDataCont', 'infoDataContActive');
    const arrOFCallback = [{ callback: generalCallback, text: 'General information' }];
    arrOFCallback.forEach((item) => {
        const btn = createButton(item.text);
        placeTheButton('infoCont', btn, () => { item.callback(code) });
    })
    // First Button

}

