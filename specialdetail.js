class SpecialItem {
  constructor(data) {
    this.data = data;
  }
  render(container) {
    container.innerHTML = `
      <video controls playsinline poster="${this.data.thumbnail}" style="max-width:100%;">
        <source src="${this.data.specialcontent}" type="video/mp4">
        お使いのブラウザは動画をサポートしていません。
      </video>
      <div class="detail-info">
        <h2>${this.data.title}</h2>
        <p><em>Artist: ${this.data.artist}</em></p>
        <p>${this.data.description || '解説がありません。'}</p>
        <p><a href="special.html">← 一覧に戻る</a></p>
      </div>
    `;
    // fade-in on load
    setTimeout(() => container.classList.add('visible'), 100);
  }
}

// Get ID from URL
const params = new URLSearchParams(location.search);
const id = params.get('id');
const container = document.querySelector('.specialdetail-container');

fetch('special.json')
  .then(res => res.json())
  .then(data => {
    const itemData = data.find(item => item.id === id);
    if (!itemData) {
      container.innerHTML = '<p>作品が見つかりませんでした。</p>';
      return;
    }
    new SpecialItem(itemData).render(container);
  })
  .catch(err => {
    console.error('データの取得に失敗:', err);
    container.innerHTML = '<p>データの読み込みに失敗しました。</p>';
  });