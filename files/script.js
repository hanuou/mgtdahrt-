const SPRINKLE_CHARS = Array.from('･:,｡ﾟ･:,｡★ﾟ:,｡★ﾟ･:,｡ﾟ･;');
const SPRINKLE_COUNT = 34;
let pageInitDone = false;

function getRandomSprinkleText() {
  const length = Math.floor(Math.random() * 5) + 5;
  return Array.from({ length }, () => {
    const index = Math.floor(Math.random() * SPRINKLE_CHARS.length);
    return SPRINKLE_CHARS[index];
  }).join('');
}

function createBackgroundSprinkles() {
  let container = document.getElementById('background-sprinkle');
  if (!container) {
    container = document.createElement('div');
    container.id = 'background-sprinkle';
    document.body.appendChild(container);
  }

  for (let i = 0; i < SPRINKLE_COUNT; i += 1) {
    const span = document.createElement('span');
    span.className = 'sprinkle';
    span.textContent = getRandomSprinkleText();
    span.style.left = `${Math.random() * 100}%`;
    span.style.top = `${Math.random() * 100}%`;
    span.style.fontSize = `${Math.random() * 1.2 + 0.8}rem`;
    span.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 60 - 30}deg)`;
    span.style.opacity = `${Math.random() * 0.18 + 0.32}`;
    container.appendChild(span);
  }
}

function showWorksWithoutFade(caption, works) {
  caption.style.transition = 'none';
  works.style.transition = 'none';
  caption.classList.add('hidden');
  works.classList.add('visible');
  requestAnimationFrame(() => {
    caption.style.transition = '';
    works.style.transition = '';
  });
}

function showWorksWithFade(caption, works) {
  sessionStorage.setItem('introSeen', 'true');
  setTimeout(() => {
    caption.classList.add('hidden');
    setTimeout(() => {
      works.classList.add('visible');
    }, 1000);
  }, 5000);
}

function initIntroPage() {
  const caption = document.getElementById('caption');
  const works = document.getElementById('works');
  const introSeen = sessionStorage.getItem('introSeen');

  createBackgroundSprinkles();

  if (introSeen) {
    showWorksWithoutFade(caption, works);
    return;
  }
  showWorksWithFade(caption, works);
}

function initWorkPage() {
  const works = {
    1: {
      caption: '「〇△市に局所的な異常気象が発生しました！」',
      title: '蹴る！',
      ytId: 'xzITQi99UI8'
    },
    2: {
      caption: ' 幼い頃、あの工場爆発事件―　たった一つの出来事で、その全てが変わってしまった。',
      title: 'すっかり追いついて',
      ytId: 't1Xhc87x5Wo'
    },
    3: {
      caption: '下校。ただ今日も歩くような速度で、なにもない日常を形作ってゆく。',
      title: 'ありふれたお話。',
      ytId: 'd3-rvt2TuZk'
    }
  };

  const params = new URLSearchParams(location.search);
  const id = params.get('id') || '1';
  const data = works[id] || works[1];

  document.getElementById('caption').textContent = data.caption;
  document.getElementById('title-main').textContent = data.title;
  document.getElementById('title-sub').textContent = data.sub || '';
  document.getElementById('yt-frame').src = `https://www.youtube.com/embed/${data.ytId}`;

  const caption = document.getElementById('caption');
  const wrap = document.getElementById('player-wrap');

  createBackgroundSprinkles();

  setTimeout(() => {
    caption.classList.add('hidden');
    setTimeout(() => {
      wrap.classList.add('visible');
      document.body.style.overflow = 'auto';
    }, 1000);
  }, 5000);
}

function initPage() {
  if (pageInitDone) {
    return;
  }
  pageInitDone = true;

  if (document.getElementById('works')) {
    initIntroPage();
    return;
  }

  if (document.getElementById('player-wrap')) {
    initWorkPage();
  }
}

window.addEventListener('DOMContentLoaded', initPage);
window.addEventListener('pageshow', initPage);
