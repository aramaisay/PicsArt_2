// ***********************
// Getting Country Data
// ***********************

// gets all countries with code and flag
const getAllCountries = async () => {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const data = await response.json();
    return data;
}

const getInfoAboutTheCountry = async (code) => {
    try{
        const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${code}`);
        const data = await response.json();
        return {
            name: data.name,
            capital: data.capital,
            altSpellings: data.altSpellings,
            continent: data.subregion,
            pop: data.population,
            x: data.latlng[0],
            y: data.latlng[1],
            area: data.area,
            currencies: data.currencies,
            lang: data.languages,
            flag: data.flag
        }
    }
    catch(err){
        console.log(err);
    }
}

// ***********************
// Creating Flag Elements
// ***********************

const createNewFlagElement = (element, className) => {
    const newFlag = document.createElement('div');
    newFlag.classList.add(className);
    newFlag.addEventListener('click',() => { configureInfoSection(element['alpha3Code'],element) })
    return newFlag;
}

const createNewFlagImgElement = (element,newFlag,className) => {
    const flagImg = document.createElement('img');
    flagImg.classList.add(className);
    flagImg.src = element.flag;
    newFlag.append(flagImg);
    return newFlag;
}

const createNewFlagElementDetail = (element,newFlag,className) => {
    const flagDetails = document.createElement('div');
    flagDetails.classList.add(className);
    flagDetails.innerText = `${element.name} click to get more info`;
    newFlag.append(flagDetails);
    return newFlag;
}

// ***********************
// Deleting Loading Element
// ***********************

const DeleteTheLoadingElement = (id) => {
    document.getElementById(id).remove()
}

// ***********************
// Placing the countries
// ***********************

// places all the flags as childs of the div with id of flags
const PlaceAllCountries = async (id) => {
    const data = await getAllCountries();
    // deleting the laoding
    DeleteTheLoadingElement('flagsLoading');
    data.forEach(element => {
        // Creating the flag container
        const newFlag = createNewFlagElement(element,'flag');
        // Adding new flag image
        createNewFlagImgElement(element,newFlag,'flagImg');
        // Adding the Details
        createNewFlagElementDetail(element,newFlag,'flagDetails');

        const parentNode = document.getElementById(id);
        parentNode.append(newFlag);
    })
}

PlaceAllCountries('flags');

// ***********************
// Callbacks
// ***********************

const generalCallback = async (code) => {
    const data = await getInfoAboutTheCountry(code);
    console.log(data);
}

// ***********************
// Manipulation with the view of info
// ***********************

// setting the title of the info section to the name
const  setTheTitleOfTheInfo = (element,idForTheTitle) => {
    const Title = document.getElementById(idForTheTitle);
    Title.innerText = `${element.name} - ${element.nativeName}`;
}

// creating buttons
const createButton = text => {
    const btn = document.createElement('button');
    btn.classList.add('Button');
    btn.innerText = text;
    return btn;
}

// addingTheButtons
const placeTheButton = (idWhereToPLace,btn,callBack) => {
    const cont = document.getElementById(idWhereToPLace);
    btn.addEventListener('click',callBack);
    cont.appendChild(btn);
}

// Modifing info cont
const modifyInfoCont = (idOfInfoCont,classToBeRemoved,classToBeAdded) => {
    const cont = document.getElementById(idOfInfoCont);
    cont.innerText = '';
    cont.classList.remove(classToBeRemoved);
    cont.classList.add(classToBeAdded);
}

// 
const configureInfoSection = (code,element) => {
    setTheTitleOfTheInfo(element,'infoTitle');
    modifyInfoCont('infoCont','infoDataCont','infoDataContActive');
    const arrOFCallback = [{callback:generalCallback,text:'General'}];
    arrOFCallback.forEach( (item) => {
        const btn = createButton(item.text);
        placeTheButton('infoCont',btn,()=>{item.callback(code)});
    })
    // First Button

}

