Entry.block = {
    "kris_block": { // (1)
        "parent": "", // (2)
        "color": "7ef90f", // (3)
        "fontColor": "", // (4)
        "skeleton": "", // (5)
        "statement": [], // (6)
        "params": [], // (7)
        "events": {}, // (8)
        "def": {}, // (9)
        "paramsKeyMap": {}, // (10)
        "class": "", // (11)
        "isNotFor": [], // (12)
        "func": function() {} // (13)
    }
}
"kris_block": {
    "parent": "kris_mother_block",
    "def": {
        "params": [
            {
                type: 'number',
                params: ['10'],
            },
            null,
        ],
        "type": "kris_block",
    }
}
def: {
    "params": [
        {
            type: 'number',
            params: ['10'],
        },
        null,
    ],
    "type": "kris_block",
}
EntryStatic.getAllBlocks = function() {
    return [
        {
            category: 'kris',
            blocks: [
                'kris_code_gpt',
                // ...
            ]
        }
    ]
}
Entry.block = {
    gpt_api_block: {
        color: "#4A90E2",
        skeleton: "basic",
        template: "GPT에게 질문 보내기 %1",
        params: [
            {
                type: "Indicator",
                img: "block_icon/hardware_03.png",
                size: 12
            }
        ],
        events: {},
        def: {
            type: "gpt_api_block"
        },
        class: "ai",
        isNotFor: [],

        func: function (sprite, script) {

            const API_KEY = "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";

           
            const question = Entry.test?.USER_QUESTION || "안녕 GPT";

            fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + API_KEY
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "user", content: question }
                    ]
                })
            })
            .then(res => res.json())
            .then(data => {
                const answer =
                    data.choices?.[0]?.message?.content || "응답 실패";

                if (!Entry.test) Entry.test = {};
                Entry.test.GPT_ANSWER = answer;

                console.log("🤖 GPT 응답:", answer);
            })
            .catch(err => {
                console.error("❌ GPT API 오류:", err);
            });
        }
    }
};

// 블록 메뉴 갱신
Entry.playground.setBlockMenu();

console.log("✅ GPT API 블록 로드 완료");
