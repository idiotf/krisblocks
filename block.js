/* ================================
   Kris Entry Unofficial Blocks
   Category: 크리스 (kris)
   ================================ */

(function () {
    if (!window.Entry) {
        alert('엔트리가 로드되지 않았습니다');
        return;
    }

    /* ================================
       addBlock 함수
       ================================ */
    function addBlock(name, template, color, params, func, skeleton = 'basic') {
        Entry.block[name] = {
            color: color.color,
            outerLine: color.outerline,
            skeleton,
            statement: [],
            params,
            events: {},
            def: { params: [] },
            class: 'kris',
            func
        };
    }

    /* ================================
       색상 (연두 / 노랑 반복)
       ================================ */
    const green = { color: '#8EE000', outerline: '#5FA800' };
    const yellow = { color: '#FFD400', outerline: '#E6B800' };

    /* ================================
       iframe 생성
       ================================ */
    let krisIframe = null;

    function getIframe() {
        if (!krisIframe) {
            krisIframe = document.createElement('iframe');
            krisIframe.style.position = 'fixed';
            krisIframe.style.left = '0px';
            krisIframe.style.top = '0px';
            krisIframe.style.width = '400px';
            krisIframe.style.height = '300px';
            krisIframe.style.border = 'none';
            krisIframe.style.zIndex = '99999';
            document.body.appendChild(krisIframe);
        }
        return krisIframe;
    }

    /* ================================
       블록 정의
       ================================ */

    // iframe 이동
    addBlock(
        'kris_iframe_move',
        'iframe x %1 y %2 로 이동',
        green,
        [
            { type: 'number', default: 0 },
            { type: 'number', default: 0 }
        ],
        (sprite, script) => {
            const iframe = getIframe();
            iframe.style.left = script.getNumberValue('1') + 'px';
            iframe.style.top = script.getNumberValue('2') + 'px';
        }
    );

    // iframe 숨기기
    addBlock(
        'kris_iframe_hide',
        'iframe 숨기기',
        yellow,
        [],
        () => {
            const iframe = getIframe();
            iframe.style.display = 'none';
        }
    );

    // iframe 보이기
    addBlock(
        'kris_iframe_show',
        'iframe 보이기',
        green,
        [],
        () => {
            const iframe = getIframe();
            iframe.style.display = 'block';
        }
    );

    // iframe URL 열기
    addBlock(
        'kris_iframe_open',
        'iframe에 %1 열기',
        yellow,
        [{ type: 'string', default: 'https://playentry.org' }],
        (sprite, script) => {
            const iframe = getIframe();
            iframe.src = script.getStringValue('1');
        }
    );

    // iframe 투명도
    addBlock(
        'kris_iframe_opacity',
        'iframe 투명도 %1 %',
        green,
        [{ type: 'number', default: 100 }],
        (sprite, script) => {
            const iframe = getIframe();
            iframe.style.opacity = script.getNumberValue('1') / 100;
        }
    );

    // 작품 정지
    addBlock(
        'kris_project_stop',
        '작품 정지',
        yellow,
        [],
        () => {
            Entry.engine.stop();
        }
    );

    // 작품 재개
    addBlock(
        'kris_project_play',
        '작품 재개',
        green,
        [],
        () => {
            Entry.engine.play();
        }
    );

    // 유저 프로필 사진
    addBlock(
        'kris_user_profile_image',
        '내 프로필 사진',
        yellow,
        [],
        () => {
            return Entry.getUser()?.profileImage || '';
        },
        'basic'
    );

    // 블록 존재 확인
    addBlock(
        'kris_block_exists',
        '%1 블록 존재?',
        green,
        [{ type: 'string', default: 'kris_iframe_move' }],
        (sprite, script) => {
            return !!Entry.block[script.getStringValue('1')];
        }
    );

    /* ================================
       카테고리 등록
       ================================ */

    Entry.blockMenuBlocks = Entry.blockMenuBlocks || {};
    Entry.blockMenuBlocks.kris = {
        name: '크리스',
        icon: 'flow'
    };

    Entry.staticBlocks = (Entry.staticBlocks || []).filter(v => v.category !== 'kris');
    Entry.staticBlocks.push({
        category: 'kris',
        blocks: Object.keys(Entry.block).filter(v => v.startsWith('kris_'))
    });

    console.log('[KrisBlocks] 로드 완료');
})();
