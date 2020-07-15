// getts all countries with code and flag
const getAllCountries = async () => {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const data = await response.json();
    return data;
}

const PlaceAllCountries = async () => {
    const data = await getAllCountries();
    data.forEach(element => {
        const newFlag = document.createElement('div');
        newFlag.classList.add('flag');
        newFlag.addEventListener('click',() => { getDataAboutCountry(element['alpha2Code']) })
        const flagImg = document.createElement('img');
        flagImg.classList.add('flagImg');
        flagImg.src = element.flag;
        newFlag.append(flagImg);
        const flagDetails = document.createElement('div');
        flagDetails.classList.add('flagDetails');
        flagDetails.innerText = `${element.name} click to get more info`;
        newFlag.append(flagDetails);
        const parentNode = document.getElementById('flags');
        parentNode.append(newFlag);
    })
}

const getDataAboutCountry = (code) => {
    console.log(code)
}


PlaceAllCountries();