(function () {
  const ckEl = document.getElementById('kurd-date-ck');
  const nkEl = document.getElementById('kurd-date-nk');
  if (!ckEl || !nkEl) return;

  const CK_MONTHS_AR = [
    'خاکەلێوە', 'گوڵان', 'جۆزەردان', 'پووشپەڕ',
    'گەلاوێژ', 'خەرمانان', 'ڕەزبەر', 'گەڵاڕێزان',
    'سەرماوەز', 'بەفرانبار', 'ڕێبەندان', 'ڕەشەمە',
  ];
  const NK_MONTHS = [
    'Çile', 'Sibat', 'Adar', 'Nîsan', 'Gulan', 'Hezîran',
    'Tîrmeh', 'Tebax', 'Îlon', 'Cotmeh', 'Mijdar', 'Berfanbar',
  ];
  const AR = { '0':'٠','1':'١','2':'٢','3':'٣','4':'٤','5':'٥','6':'٦','7':'٧','8':'٨','9':'٩' };
  const arDigits = s => String(s).replace(/\d/g, d => AR[d]);

  const persianFmt = new Intl.DateTimeFormat('en-u-ca-persian-nu-latn', {
    year: 'numeric', month: 'numeric', day: 'numeric',
  });

  function update() {
    const g = new Date();
    const date = new Date(Date.UTC(g.getFullYear(), g.getMonth(), g.getDate(), 12));
    const parts = persianFmt.formatToParts(date);
    const get = t => parseInt(parts.find(p => p.type === t).value, 10);
    const py = get('year'), pm = get('month'), pd = get('day');
    const ky = py + 1321;
    ckEl.textContent = arDigits(pd) + ' ' + CK_MONTHS_AR[pm - 1] + ' ' + arDigits(ky);
    nkEl.textContent = g.getDate() + ' ' + NK_MONTHS[g.getMonth()];
  }

  update();
})();
