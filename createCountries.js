// ***********************
// Getting Country Data
// ***********************

// gets all countries with code and flag
const getAllCountries = async () => {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const data = await response.json();
    return data;
}

// ***********************
// Creating Flag Elements
// ***********************

const createNewFlagElement = (element, className) => {
    const newFlag = document.createElement('div');
    newFlag.classList.add(className);
    newFlag.addEventListener('click', () => { configureInfoSection(element['alpha3Code'], element) })
    return newFlag;
}

const createNewFlagImgElement = (element, newFlag, className) => {
    const flagImg = document.createElement('img');
    flagImg.classList.add(className);
    flagImg.src = element.flag;
    newFlag.append(flagImg);
    return newFlag;
}

const createNewFlagElementDetail = (element, newFlag, className) => {
    const flagDetails = document.createElement('div');
    flagDetails.classList.add(className);
    flagDetails.innerText = `${element.name} (Click to get more info)`;
    newFlag.append(flagDetails);
    return newFlag;
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
        const newFlag = createNewFlagElement(element, 'flag');
        // Adding new flag image
        createNewFlagImgElement(element, newFlag, 'flagImg');
        // Adding the Details
        createNewFlagElementDetail(element, newFlag, 'flagDetails');

        const parentNode = document.getElementById(id);
        parentNode.append(newFlag);
    })
}

PlaceAllCountries('flags');