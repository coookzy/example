/**
 * Archive page functionality
 * Handles post filtering, load more, and article counting for slop.html
 */

function countArticles() {
    const posts = document.querySelectorAll('.slop-post');
    const countEl = document.getElementById('article-count');
    if (countEl) countEl.textContent = posts.length;
}

function filterSlop(type) {
    const posts = document.querySelectorAll('.slop-post');

    if (type === 'all') {
        posts.forEach(post => post.style.display = 'block');
    } else if (type === 'recent') {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        posts.forEach(post => {
            const postDate = new Date(post.dataset.date);
            post.style.display = postDate > thirtyDaysAgo ? 'block' : 'none';
        });
    } else if (type === 'worst') {
        posts.forEach(post => {
            const quality = parseInt(post.dataset.quality);
            post.style.display = quality <= 3 ? 'block' : 'none';
        });
    } else if (type === 'random') {
        const postsArray = Array.from(posts);
        postsArray.forEach(post => post.style.display = 'none');
        const shuffled = postsArray.sort(() => 0.5 - Math.random());
        shuffled.slice(0, 5).forEach(post => post.style.display = 'block');
    }
}

function loadMoreSlop() {
    alert('ERROR: Cannot load more demonstrations.\n\nReason: You already have too much.\n\nRecommendation: Go BE THE EXAMPLE instead of reading about it.');
}

document.addEventListener('DOMContentLoaded', countArticles);
