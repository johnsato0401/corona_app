import Axios from 'axios';

function getChatFlowFromData(data, type, id) {
    for (const flow of data) {
        if (flow.type === type && flow.question === id) {
            return flow;
        }
    }

    return null;
}

function readChatFlow(data, type, id) {
    const flow = getChatFlowFromData(data, type, id);
    if (flow === null) {
        return null;
    }

    return {
        chat: flow.data[0],
        isLast: flow.data.length === 1 ? true : false
    }
}

function readChatThread(data, type, id, index) {
    const flow = getChatFlowFromData(data, type, id);
    if (flow === null) {
        return null;
    }
    
    return {
        chat: flow.data[index],
        isLast: flow.data.length - 1 <= index ? true : false
    }
}

export function callGenerator(type, id) {
    if (type === 0 && id === "Show me the numbers") {
        return Axios.get(
            'https://api.covid19api.com/summary'
        ).then(res => {
            const chat = "Here are the latest global numbers:\ncases: " + res.data.Global.TotalConfirmed + "\ndeaths: "+ res.data.Global.TotalDeaths + "\nrecovered: " + res.data.Global.TotalRecovered
            return {
                chat: chat,
                isLast: false
            };
        })
        .catch(err =>{
            throw err;
        });
    } else {
        return Axios.get(
            'bot.json'
        ).then(res => {
            const result = readChatFlow(res.data, type, id);
            return result;
        })
        .catch(err =>{
            throw err;
        });
    }
}

export function callThreadGenerator(type, id, index) {
    if (type === 0 && id === "welcome" && index === 1) {
        return Axios.get(
            'https://api.covid19api.com/summary'
        ).then(res => {
            const chat = "Here are the latest global numbers:\ncases: " + res.data.Global.TotalConfirmed + "\ndeaths: "+ res.data.Global.TotalDeaths + "\nrecovered: " + res.data.Global.TotalRecovered
            return {
                chat: chat,
                isLast: false
            };
        })
        .catch(err =>{
            throw err;
        });
    } else {
        return Axios.get(
            'bot.json'
        ).then(res => {
            const result = readChatThread(res.data, type, id, index);
            return result;
        })
        .catch(err =>{
            throw err;
        });
    }
    
}