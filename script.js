const inputText = document.getElementById('inputText');
const charCount = document.getElementById('charCount');
const resultUrl = document.getElementById('resultUrl');
const copyBtn = document.getElementById('copyBtn');
const testBtn = document.getElementById('testBtn');
const toast = document.getElementById('toast');

// 今のデフォルトのURL,'/post?=text='だとスマホで開いた場合、ブラウザが立ち上がってしまうため、'/tweet?=text='にした。tweet懐かしいね。
const BASE_URL = 'https://x.com/intent/tweet?text=';

// 入力するたびに呼ばれる
inputText.addEventListener('input', () => {
    const text = inputText.value;
    
    // 文字数のカウントと表示更新
    charCount.textContent = text.length;
    
    // テキストがある場合はURLを生成、ない場合は空にする
    if (text) {
        const encodedText = encodeURIComponent(text);
        resultUrl.value = BASE_URL + encodedText;
    } else {
        resultUrl.value = '';
    }
});

// コピーボタンの処理
copyBtn.addEventListener('click', () => {
    if (!resultUrl.value) {
        alert('テキストを入力してください。');
        return;
    }
    
    // クリップボードAPIを使用してコピー
    navigator.clipboard.writeText(resultUrl.value).then(() => {
        showToast();
    }).catch(err => {
        resultUrl.select();
        document.execCommand('copy');
        showToast();
    });
});

// テストボタンの処理
testBtn.addEventListener('click', () => {
    if (!resultUrl.value) {
        alert('テキストを入力してください。');
        return;
    }
    window.open(resultUrl.value, '_blank');
});

// コピー成功時のトースト通知
function showToast() {
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 2500);
}