  // アニメーションを “いつ”・“どの要素に” 対して行うかを決める設定・仕組み
const faders = document.querySelectorAll('.fade-in');//.fade-in クラス(index.html内にある)を持つ要素全てをまとめて選択、fadersに置き換え
                                                     //「.fade-in」はcssにある。
const observer = new IntersectionObserver(entries => {//IntersectionObserver は ブラウザが最初から持っている組み込みオブジェクト（関数）。
  //entries(配列みたいなやつ)の中身を監視(forEachで順番に処理)→observerに代入
  entries.forEach(entry => {
    //entriesのentryを1つずつ処理↓
    if (entry.isIntersecting) {//.isIntersecting: 今その要素が画面に映っているか（true / false）
      //もし、entryが画面に映っていたらその要素に”visible”というクラスを追加(add)
      entry.target.classList.add('visible');//CSSの/* フェードイン効果 */の中にあるfade-in visibleをHTMLに追加する
    }
  });
}, 
{
  threshold: 0.1 //要素が10%画面の領域に来た時
  //threshold: 1.0 → 要素が完全に全部表示されたときのみ反応
  //threshold: 0 → 1ピクセルでも表示されたら反応
});

faders.forEach(el => observer.observe(el));//elをobserverで定義した内容でobserve(監視)する
//faders=HTML内で.fade-inクラスを持ってる要素全てを取得したもの(↑にあるconst faders = document.querySelectorAll('.fade-in');これ)
//el =「今処理している要素」1つのこと(※elはここでは.fade-inクラスが付いている要素)


//関数の定義↓



// truncateTextの定義。
function truncateText(text, maxLength) { //関数の定義。textは切り取る対象文字列。maxLengthは表示の限界値。
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
//もし、textの数がmaxLength(表示の限界値)より長ければsubstringで0文字目からmaxLengthまでを表示(カット)して、それに...をプラスする。
}

// observeArtworksの定義
function observeArtworks() {
  const observer = new IntersectionObserver(entries => { 
    //IntersectionObserver オブジェクトを作成し、entriesに入っている複数の要素が表示領域に入ったかどうかを監視する
    entries.forEach(entry => {//entriesの中に入っているものを順番に1つずつ以下のif文を使って処理する。
                                              //forEach=「配列の中に入っているものを、順番に1つずつ使って何か処理をしたいときに使う命令」。
      if (entry.isIntersecting) {
        //entry=entriesの中の1つの監視対象情報
        //isIntersecting=今、画面に一部でも見えているかを真偽値で表す
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.artwork').forEach(el => observer.observe(el));
  //.artworkのクラスを含んだ要素を監視対象にして監視する
  //関数の中で一回使って終わる用途(使いまわさない)のためここで指定
}


  // ドロップダウン開閉
document.querySelectorAll('.dropdown').forEach(drop => {
  const btn = drop.querySelector('.dropdown-toggle');
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
  });
});

// ドキュメント外をクリックしたら閉じる
document.addEventListener('click', () => {
  document.querySelectorAll('.dropdown-toggle[aria-expanded="true"]')
    .forEach(btn => btn.setAttribute('aria-expanded', 'false'));
});


/*constとは
意味：
  再代入させない変数を作るキーワード
例：
  const arr = [1, 2, 3];
  arr.p
なぜ使うのか：
  1.誤って、保存したデータの再代入をすることを防げる
  2.他の人にも「これは固定で使う値なんだな」と伝わる
 */