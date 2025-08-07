const postContainer = document.querySelector('.posts');
    const addBtn = document.getElementById('addBtn');
    const darkToggle = document.getElementById('darkToggle');

    // 게시글 삭제 이벤트 위임
    postContainer.addEventListener('click', e => {
      if (e.target.classList.contains('delete-btn')) {
        if (confirm('이 게시글을 삭제하시겠습니까?')) {
          const post = e.target.closest('.post-card');
          post.remove();
        }
      }
    });

    // 좋아요 버튼 클릭 이벤트
    postContainer.addEventListener('click', e => {
      if (e.target.classList.contains('like-btn')) {
        const likeCountEl = e.target.nextElementSibling;
        let count = parseInt(likeCountEl.textContent);
        likeCountEl.textContent = count + 1;
      }
    });

    // 댓글 추가 이벤트
    postContainer.addEventListener('click', e => {
      if (e.target.classList.contains('comment-add-btn')) {
        const postCard = e.target.closest('.post-card');
        const input = postCard.querySelector('.comment-input');
        const commentList = postCard.querySelector('.comment-list');
        const comment = input.value.trim();
        if (!comment) {
          alert('댓글을 입력해주세요.');
          return;
        }
        const li = document.createElement('li');
        li.textContent = comment;
        commentList.appendChild(li);
        input.value = '';
      }
    });

    // 게시글 추가 함수
    addBtn.addEventListener('click', () => {
      const title = document.getElementById('title').value.trim();
      const content = document.getElementById('content').value.trim();
      const image = document.getElementById('image').value.trim();

      if (!title || !content) {
        alert('제목과 내용을 모두 입력해주세요.');
        return;
      }

      const post = document.createElement('div');
      post.className = 'post-card';
      const htmlContent = marked.parse(content);

      post.innerHTML = `
        <button class="delete-btn" aria-label="게시글 삭제">삭제</button>
        <h4>${title}</h4>
        ${image ? `<img src="${image}" alt="게시글 이미지" />` : ''}
        <p>${htmlContent}</p>
        <button class="like-btn" aria-label="좋아요 버튼">👍 좋아요</button>
        <span class="like-count">0</span>
        <div class="comments-section">
          <input type="text" class="comment-input" placeholder="댓글을 입력하세요" />
          <button class="comment-add-btn">댓글 달기</button>
          <ul class="comment-list"></ul>
        </div>
      `;

      postContainer.appendChild(post);

      // 초기화
      document.getElementById('title').value = '';
      document.getElementById('content').value = '';
      document.getElementById('image').value = '';
    });

    // 다크모드 토글
    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      document.querySelector('header').classList.toggle('dark');
      if (document.body.classList.contains('dark')) {
        darkToggle.textContent = '라이트모드';
      } else {
        darkToggle.textContent = '다크모드';
      }
    });
