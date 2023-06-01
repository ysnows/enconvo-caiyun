var utils = require('./utils.js');

function main(text, contextText, completion) {
    (async () => {
        console.log("main")
        var source_lang = 'en';
        var target_lang = 'zh';
        const translate_text = text || contextText.value || await Clipboard.readText();
        console.log("begin")

        if (translate_text !== '') {
            source_lang = await $Lang.detect(translate_text)
            console.log("source_lang : " + source_lang)
            // 如果是中文则翻译成英文，否则翻译成中文
            if (source_lang === 'zh-Hans') {
                target_lang = 'en'
            } else {
                target_lang = 'zh'
            }

            id = utils.getRandomNumber()
            const url = 'https://interpreter.cyapi.cn/v1/translator';
            const post_data = utils.init_data(source_lang, target_lang)
            post_data.source = translate_text
            post_data.request_id = utils.getRandomNumber()
            try {
                let response = await fetch(
                    url,
                    {
                        method: "POST",
                        header: {
                            'Content-Type': 'application/json',
                            'x-authorization': 'token ssdj273ksdiwi923bsd9',
                            'user-agent': 'caiyunInterpreter/5 CFNetwork/1404.0.5 Darwin/22.3.0'
                        },
                        body: post_data,
                    })

                // 等待延迟一秒
                let data = await response.json()
                console.log("data" + JSON.stringify(data))

                console.log("end")
                completion({
                    result: {
                        type: "text",
                        value: data.target || data.message
                    }
                })

            } catch (e) {
                console.log("error" + JSON.stringify(e))
                Object.assign(e, {
                    _type: 'network',
                    _message: '接口请求错误 - ' + JSON.stringify(e),
                });
                throw e;
            }
        }
    })().catch((err) => {
        completion({
            error: {
                type: err._type || 'unknown',
                message: err._message || '未知错误',
                addtion: err._addtion,
            },
        });
    });
}
