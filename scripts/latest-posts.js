// Lists the three newest posts from the blog's RSS feed.
(function () {
  var list = document.getElementById('latest-posts');
  if (!list || !window.fetch || !window.DOMParser) return;

  function text(el, tag) {
    var n = el.querySelector(tag);
    return n ? n.textContent.trim() : '';
  }

  fetch('https://blog.thefarshad.com/feed.xml')
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    })
    .then(function (xml) {
      var doc = new DOMParser().parseFromString(xml, 'application/xml');
      var posts = Array.prototype.map.call(doc.querySelectorAll('item'), function (it) {
        return { title: text(it, 'title'), link: text(it, 'link'), date: new Date(text(it, 'pubDate')) };
      }).filter(function (p) {
        return p.title && p.link.indexOf('https://blog.thefarshad.com/') === 0 && !isNaN(p.date);
      });
      posts.sort(function (a, b) { return b.date - a.date; });
      posts.slice(0, 3).forEach(function (p) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        var date = document.createElement('span');
        var title = document.createElement('span');
        a.href = p.link;
        date.className = 'post-date';
        date.textContent = p.date.toISOString().slice(0, 10);
        title.className = 'post-title';
        title.textContent = p.title;
        a.appendChild(date);
        a.appendChild(title);
        li.appendChild(a);
        list.appendChild(li);
      });
    })
    .catch(function () { /* the "All posts" link below the list still works */ });
})();
