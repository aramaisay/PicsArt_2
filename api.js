// getts all countries with code and flag
const getAllCountries = async () => {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const data = await response.json();
    return data;
}

const PlaceAllCountries = async () => {
    const data = await getAllCountries();
    data.forEach(element => {
        // Creating the flag container
        const newFlag = createNewFlagElement(element,'flag');
        // Adding new flag image
        createNewFlagImgElement(element,newFlag,'flagImg');
        // Adding theDetails
        createNewFlagElementDetail(element,newFlag,'flagDetails');

        const parentNode = document.getElementById('flags');
        parentNode.append(newFlag);
    })
}

const createNewFlagElement = (element, className) => {
    const newFlag = document.createElement('div');
    newFlag.classList.add(className);
    newFlag.addEventListener('click',() => { getDataAboutCountry(element['alpha2Code']) })
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

const getDataAboutCountry = (code) => {
    console.log(code)
}


PlaceAllCountries();