document.addEventListener('DOMContentLoaded', () => {
  let specialData = [];
  const gallery = document.getElementById('gallery');
  const searchInput = document.getElementById('search');

  if (!gallery || !searchInput) {
    console.error('ギャラリー要素または検索要素が見つかりません');
    return;
  }

  // IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  // JSON読み込み
  fetch('special.json')
    .then(res => res.json())
    .then(data => {
      specialData = data;
      console.log('JSON読み込み成功:', specialData);
      renderGallery(specialData);
    })
    .catch(err => console.error('JSON読み込みエラー:', err));

  // 検索機能
  searchInput.addEventListener('input', () => {
    const keyword = searchInput.value.trim().toLowerCase();
    const filtered = keyword
      ? specialData.filter(item =>
          item.title.toLowerCase().includes(keyword) ||
          item.artist.toLowerCase().includes(keyword) ||
          (item.tags && item.tags.some(tag => tag.toLowerCase().includes(keyword)))
        )
      : specialData;
    renderGallery(filtered);
  });

  // ギャラリー描画関数
  function renderGallery(data) {
    gallery.innerHTML = '';
    if (data.length === 0) {
      gallery.innerHTML = '<p>該当する作品がありません。</p>';
      return;
    }

    data.forEach(item => {
      const id = encodeURIComponent(item.id);
      const card = document.createElement('div');
      card.className = 'thumbnail';
      card.innerHTML = `
        <a href="specialdetail.html?id=${id}">
          <img src="${item.thumbnail}" alt="${item.title}" />
        </a>
        <p><strong>${item.title}</strong><br><small>by ${item.artist}</small></p>
      `;
      gallery.appendChild(card);
      observer.observe(card);
      setTimeout(() => card.classList.add('visible'), 100);
    });
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


}); 
