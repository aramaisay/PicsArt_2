
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
            currencies: data.currencies,
            lang: data.languages,
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

// ***********************
// Callbacks
// ***********************

const generalCallback = async (code) => {
    const data = await getInfoAboutTheCountry(code);
    const genData = JSON.stringify(data);
    const createDataElement = document.createElement("div");
    createDataElement.setAttribute('class', 'infoDataEnd');
    createDataElement.setAttribute('id', 'infoDataContEnd');
    document.getElementById('infoCont').appendChild(createDataElement)
    document.getElementById("infoDataContEnd").innerHTML = genData;
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
    btn.setAttribute('class', 'button');
    btn.setAttribute('id', 'button');
    btn.innerText = text;
    return btn;
}

const deleteButton = () => {
    const element = document.getElementById('button');
    element.parentNode.removeChild(element)
}

// addingTheButtons
const placeTheButton = (idWhereToPLace, btn, callBack) => {
    const cont = document.getElementById(idWhereToPLace);
    btn.addEventListener('click', callBack);
    btn.addEventListener('click', deleteButton);
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

