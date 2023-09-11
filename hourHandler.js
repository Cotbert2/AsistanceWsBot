const date = new Date();

timeInfo = {
    'day' : `${date.getDay()}`,
    'hour' : `${date.getHours()}`,
}

const hour = () => {
    return {
        'day' : `${parseInt(date.getDay())}`,
        'hour' : `${parseInt(date.getHours())}`,
        'minutes' : `${parseInt(date.getMinutes())}`,
        'date': `${date.getDate()}`,
        'month': `${parseInt(date.getMonth() + 1)}`
    }
}


module.exports = { hour }