let artworks = []; //作品データを格納する配列を作成artworks[]

fetch('artworks.json')//指定したjsonファイルを取得 非同期通信
  .then(res => res.json())//レスポンス(応答・要求)をjsonとして扱う

  .then(data => {//受け取ったjsonのデータを処理する
    artworks = data; //データをartworksへ代入
    console.log(data); //コンソールログを表示出来るようにする
    displayArtworks(artworks);//作品を表示
  });

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


const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.trim().toLowerCase();
  if (keyword === '') {
    displayArtworks(artworks); // 空欄なら全表示
    return;
  }


  const filtered = artworks.filter(a =>//.filterでartworksを条件で絞る
                                       //aは一件→つまり一件ずつ処理をする
                                       //filteredに置き換え

    a.title.toLowerCase().includes(keyword) || //toLowerCase()=小文字変換。厳密な検索をさせないため。
                                               //キーワードが含まれているか。照合
    a.artist.toLowerCase().includes(keyword) ||//同
    (a.tags && a.tags.some(tag => tag.toLowerCase().includes(keyword)))
    //↑tagが存在していて且つsome(...)の条件を満たすかどうか
    //some(条件を判定する関数)
    //「=>」アロー関数、長いコードを短く簡潔にまとめる
  );
  displayArtworks(filtered);//呼び出し・絞り込んだ作品を表示
});

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

//desplayArtworksの定義。
function displayArtworks(data) {
                                                    // dataは作品データの配列
  const gallery = document.getElementById('gallery');//indexのギャラリーセクションを持ってくる。
  // それを galleryに置き換えしてここで使えるようにする。
  gallery.innerHTML = '';//作品を更新できるようにギャラリーの中身をリセット(空に)する。
  //innerHTML=HTMLの中身を取得・書き換え可能にするプロパティ

  

  if (data.length === 0) {//もし、作品リストの要素数が空(0)なら
    gallery.innerHTML = '<p>該当する作品が見つかりませんでした。</p>';//表示するものがない、と書き換え
    return;//if文終了。返す
  }
  

data.forEach(a => {//data(配列)のa(各要素)を順番に1つずつ処理
  const encodedId = encodeURIComponent(a.id); //URLに日本語等が入る事を防ぐ
  /*gallery(HTMLの要素)にアート作品を追加する※つまり最初の一覧のページに作品を表示するためのパーツ
      このdiv要素にartworkというクラスとfade-inというクラスを同時に与えている
        a hrefでクリックをするとdetail.htmlに飛び、URLの後ろにidがくっ付く
        　画像を表示しタイトルをaltに入れ画像が表示されなければ代替テキストが出る


  */
  gallery.innerHTML += `  
    <div class="artwork fade-in">
      <a href="detail.html?id=${encodedId}">
        <img src="${a.image}" alt="${a.title}">
      </a>
      <p><strong>${a.title}</strong><br>by ${a.artist}</p>
      <p>Tags: ${a.tags ? a.tags.join(', ') : 'なし'}</p>
      ${a.description ? `<p class="description">${truncateText(a.description, 50)}</p>` : ''}

    </div>
  `;
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

});


  observeArtworks(); 
}

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