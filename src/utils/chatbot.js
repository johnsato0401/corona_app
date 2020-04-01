import Axios from 'axios';

function getChatFlowFromData(data, type, id) {
    for (const flow of data) {
        if (flow.type === type && flow.question === id) {
            return flow;
        }
    }

    return;
}

function readChatFlow(data, type, id) {
    const flow = getChatFlowFromData(data, type, id);
    return {
        chat: flow.data[0],
        isLast: flow.data.length === 1 ? true : false
    }
}

function readChatThread(data, type, id, index) {
    const flow = getChatFlowFromData(data, type, id);
    return {
        chat: flow.data[index],
        isLast: flow.data.length - 1 <= index ? true : false
    }
}

export function callGenerator(type, id) {
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

export function callThreadGenerator(type, id, index) {
    return Axios.get(
        'bot.json'
    ).then(res => {
        const result = readChatThread(res.data, 0, 'first', index);
        return result;
    })
    .catch(err =>{
        throw err;
    });
}