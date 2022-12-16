const daysElements = [...document.querySelectorAll('.day')];
const daysWrapper = document.querySelector('.wrapper');
const daysOfWeekMap = {
    0: 'SUN', 
    1: 'MON', 
    2: 'TUES', 
    3: 'WED', 
    4: 'THUR', 
    5: 'FRI', 
    6: 'SAT'
}

const iconNameToSizeMap = {
    cloudy: { width: 264, height: 166},
    sunny: { width: 208, height: 213},
    stormy: { width: 246, height: 187},
    snowy: { width: 230, height: 196},
    'partly-cloudy': {width: 230, height:209},
    rainy: { width: 160, height: 222},
}

const getweatherData = async () => {
    try {
        const res = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=Austin,USA&appid=<APIKEY>&units=imperial');
        const data = await res.json();
        // as of Dec 2022, only the 5 day 3hr forecast is available on Open Weather free tier, must reduce to get daily forecast
        let prevDayIndex = -1;
        const returnVal = data.list.reduce((accumulator, currentValue) => {
                const currentDate = new Date(currentValue.dt * 1000);
                const currentDayIndex = currentDate.getDay();
                if (currentDayIndex != prevDayIndex) {
                    currentValue.currentDayIndex = currentDayIndex;
                    currentValue.currentDate = currentDate;
                    accumulator.push(currentValue);
                }
                prevDayIndex = currentDayIndex;
                return accumulator;
        }, []);
        return returnVal;
    } catch (err) {
        console.error(err);
    }
}

const updateUI = function(weatherData) {
    console.log(weatherData);
    const daysHTMLString = weatherData.map((element, index) => {
        const curDay = daysOfWeekMap[element.currentDayIndex];
        const curDate = element.currentDate.getDate();
        let weatherMain = 'sunny';
        if (element.weather[0].main.toLowerCase().includes('rain')) {
            weatherMain = 'rainy';
        } else if (element.weather[0].main.toLowerCase().includes('cloud')) {
            weatherMain = 'cloudy';
        } else if (element.weather[0].main.toLowerCase().includes('storm')) {
            weatherMain = 'stormy';
        } else if (element.weather[0].main.toLowerCase().includes('snow')) {
            weatherMain = 'snowy';
        } else if (element.weather[0].main.toLowerCase().includes('part')) {
            weatherMain = 'partly-cloudy';
        }
        const iconSize = iconNameToSizeMap[weatherMain];
        const temp = Math.round(element.main.temp_max);
        const pop = element.pop * 100;
        const minTemp = Math.round(element.main.temp_min);
        return `
            <div class="day">
                <div class="day-of-week">${curDay}</div>
                <div class="date">${curDate}</div>
        
                <div class="bar ${weatherMain}">
                <div class="weather">
                    <svg role="img" width="${iconSize.width}" height="${iconSize.height}" viewBox="0 0 ${iconSize.width} ${iconSize.height}">
                    <use xlink:href="#${weatherMain}"></use>
                    </svg>
                </div>
                <div class="temperature">
                    ${temp}<span class="degrees">&deg;</span>
                </div>
                <div class="content">
                    <div class="precipitation">
                    <svg role="img" class="icon">
                        <use xlink:href="#precipitation"></use>
                    </svg>
                    ${pop}%
                    </div>
                    <div class="low">
                    <svg role="img" class="icon">
                        <use xlink:href="#low"></use>
                    </svg>
                    ${minTemp}&deg;
                    </div>
                </div>
                </div>
            </div>
        `;
    }).join('');
    daysWrapper.innerHTML = daysHTMLString;
}
const loadItUp = async () => {
    const weatherData = await getweatherData();
    updateUI(weatherData);
}
loadItUp();
