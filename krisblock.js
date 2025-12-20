(function() {
    if (!window.Entry) {
        console.error("❌ Entry가 로드되지 않았습니다");
        return;
    }

    /* ===============================
       Kris Full Special Blocks
       Category: 크리스
       Icon: hardware (내장)
       Color: Light Green
    ================================ */

    const krisBlocks = [
        "kris_iframe_open",
        "kris_open_window",
        "kris_iframe_close",
        "kris_block_version",

        "fetch",
        "array_number",
        "array_length",
        "json_key",
        "json_length",
        "post_commu",
        "post_qna",
        "get_browser",
        "toast",
        "console",
        "console_clear",
        "entry_console",
        "entry_console_clear",
        "change_var",
        "entry_console_writing",
        "finish",
        "likeList",
        "boost_mode",
        "mouse",
        "didScroll",
        "scrollHandle",
        "stop_button(click)_start",
        "open_win",
        "pc",
        "PromptConfirm",
        "user.username",
        "change(X)",
        "mypage",
        "asdf"
    ];

    // 카테고리 등록
    Entry.blockInfo.kris = {
        name: "크리스",
        color: "#7CFC00",
        icon: "hardware",
        blocks: krisBlocks
    };

    // UI에 카테고리 추가
    const updateCategory = (category, options) => {
        Entry.playground.mainWorkspace.blockMenu._generateCategoryView([
            { category: category, visible: true }
        ]);
        Entry.playground.blockMenu._categoryData = Entry.staticBlocks.concat({ category: category, blocks: krisBlocks });
        Entry.playground.blockMenu._generateCategoryCode(category);

        if (options) {
            if (options.background) {
                $(`#entryCategory${category}`).css('background-image', 'url(' + options.background + ')');
                $(`#entryCategory${category}`).css('background-repeat', 'no-repeat');
                if (options.backgroundSize) $(`#entryCategory${category}`).css('background-size', options.backgroundSize + 'px');
            }
            if (options.name) $(`#entryCategory${category}`)[0].innerText = options.name;
        }
    };

    updateCategory('kris', { name: '크리스', background: '/lib/entry-js/images/hardware.svg', backgroundSize: 32 });

    console.log("✅ 크리스 풀버전 블록 로드 완료");
    alert("크리스 블록 1.0 로드 완료!");
})();
