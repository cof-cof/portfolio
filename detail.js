class Artwork {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.artist = data.artist;
    this.image = data.image;
    this.tags = data.tags || [];
    this.description = data.description || '解説はありません。';
  }

  renderToDOM() {
    document.getElementById('detail-image').src = this.image;
    document.getElementById('detail-image').alt = this.title;
    document.getElementById('detail-title').textContent = this.title;
    document.getElementById('detail-artist').textContent = `Artist: ${this.artist}`;
    document.getElementById('detail-tags').textContent = `Tags: ${this.tags.join(', ') || 'なし'}`;
    document.getElementById('detail-description').textContent = this.description;
  }
}

// URLのパラメータ取得
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const index = parseInt(urlParams.get('index'));

fetch('artworks.json')
  .then(res => res.json())
  .then(data => {
    let rawData;

    if (id) {
      rawData = data.find(a => a.id === id);
    } else if (!isNaN(index)) {
      rawData = data[index];
    }

    if (!rawData) {
      document.body.innerHTML = '<p>作品が見つかりませんでした。</p>';
      return;
    }

    const artwork = new Artwork(rawData);
    artwork.renderToDOM();
  })
  .catch(err => {
    console.error('データの取得中にエラーが発生しました:', err);
    document.body.innerHTML = '<p>データの読み込みに失敗しました。</p>';
  });

  //python -m http.server 8000  