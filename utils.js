function init_data(source_lang, target_lang) {
    return {
        "source": "",
        "detect": true,
        "os_type": "ios",
        "device_id": "F1F902F7-1780-4C88-848D-71F35D88A602",
        "trans_type": 'auto2' + target_lang,
        "media": "text",
        "request_id": 424238335,
        "user_id": "",
        "dict": true
    };
}

function getRandomNumber() {
    const rand = Math.floor(Math.random() * 99999) + 100000;
    return rand * 1000;
}


exports.getRandomNumber = getRandomNumber;
exports.init_data = init_data;
