/**
 * slides-engine.js
 * Fetches lesson pages for the current module, extracts headings and key
 * content via DOMParser, then builds and initialises a Reveal.js deck.
 *
 * Expects window.SLIDES_CFG to be defined before this script loads:
 *   window.SLIDES_CFG = {
 *     module: 1,
 *     label:  'Workshop 1',
 *     subLabel: 'Foundations',
 *     color:  '#4f9990',
 *     lessons: [
 *       { file: '01-what-is-cowork.html', title: 'What Is Cowork' },
 *       ...
 *     ]
 *   };
 */
(function () {
  'use strict';

  var cfg = window.SLIDES_CFG;
  if (!cfg) { console.error('slides-engine: SLIDES_CFG not defined'); return; }

  var deck = document.getElementById('deck');
  if (!deck) { console.error('slides-engine: #deck not found'); return; }

  /* ─── Text helpers ─────────────────────────────────────── */

  function textOf(el) {
    return el ? el.textContent.trim() : '';
  }

  /** Return innerHTML of el, preserving <em> but stripping nested scripts. */
  function innerOf(el) {
    if (!el) return '';
    var clone = el.cloneNode(true);
    clone.querySelectorAll('script, style').forEach(function (n) { n.remove(); });
    return clone.innerHTML;
  }

  /**
   * Index of the period that ends the first sentence of `text`, or -1 if
   * none is found. A period only counts as a sentence end when it's
   * followed by whitespace + a capital letter, or by the end of the string
   * — this keeps "e.g.", "v2.1", and "README.docx" from being mistaken for
   * sentence boundaries.
   */
  function firstSentenceEnd(text) {
    var m = /\.(?=\s+[A-Z]|\s*$)/.exec(text);
    return m ? m.index : -1;
  }

  /* ─── Extraction ────────────────────────────────────────── */

  /**
   * Parse one lesson HTML string and return an array of slide descriptor objects.
   * @param {string} html   Raw HTML text of the lesson page.
   * @param {string} lessonFile  Filename, e.g. "01-what-is-cowork.html"
   * @param {string} fallbackTitle  Used if page-header title not found.
   */
  function extractSlides(html, lessonFile, fallbackTitle) {
    var doc = (new DOMParser()).parseFromString(html, 'text/html');
    var slides = [];

    /* ── Lesson title slide ── */
    var hdr = doc.querySelector('.page-header');
    if (hdr) {
      var titleEl  = hdr.querySelector('h1.title, h1');
      var eyeEl    = hdr.querySelector('.eyebrow');
      var subEl    = hdr.querySelector('.subtitle, p');
      slides.push({
        type:     'lesson-title',
        file:     lessonFile,
        eyebrow:  textOf(eyeEl),
        title:    titleEl ? innerOf(titleEl) : fallbackTitle,
        subtitle: textOf(subEl)
      });
    }

    /* ── Section slides ── */
    doc.querySelectorAll('.section').forEach(function (sec) {
      var h2 = sec.querySelector('h2.sec-title, h2');
      if (!h2) return;

      /* Section-level eyebrow — direct child only, not from inside a card */
      var eyeEl = sec.querySelector(':scope > .sec-eyebrow');
      var subEl = sec.querySelector(':scope > p.sec-sub, :scope > p');

      var isDark = sec.classList.contains('section-dark');
      var bullets = [];
      /* Parallel to `bullets` — bulletSources[i] is the DOM element that
         produced bullets[i]. Only consulted when a section has step cards,
         to split bullets into "before the step list" / "after" without
         touching the bullet objects themselves (so step-free sections are
         byte-identical to before this array existed). */
      var bulletSources = [];
      var stepSlides = [];

      /* Insight cards */
      sec.querySelectorAll('.insight-card').forEach(function (card) {
        var head = card.querySelector('.sec-eyebrow, h3');
        var body = card.querySelector('p');
        if (head) {
          bullets.push({
            heading: textOf(head),
            body:    body ? textOf(body) : ''
          });
          bulletSources.push(card);
        }
      });

      /* Dev cards */
      sec.querySelectorAll('.dev-card').forEach(function (card) {
        var kicker = card.querySelector('.dev-kicker');
        var h3     = card.querySelector('h3');
        var body   = card.querySelector('p');
        var heading = kicker ? textOf(kicker) + (h3 ? ' — ' + textOf(h3) : '') : textOf(h3);
        if (heading) {
          bullets.push({
            heading: heading,
            body:    body ? textOf(body) : ''
          });
          bulletSources.push(card);
        }
      });

      /* Component cards (.comp-card) */
      sec.querySelectorAll('.comp-card').forEach(function (card) {
        var label = card.querySelector('.comp-label');
        var name  = card.querySelector('.comp-name');
        var body  = card.querySelector('.comp-body, p');
        var heading = (label ? textOf(label) + ': ' : '') + (name ? textOf(name) : '');
        if (heading.trim()) {
          bullets.push({
            heading: heading.trim(),
            body:    body ? textOf(body) : ''
          });
          bulletSources.push(card);
        }
      });

      /* Step cards (.step-card) — numbered "what → why" steps, onsite delivery.
         Each card is its own slide (not a chunked bullet): the client asked
         for steps presented one screen at a time, not four crowded onto one
         slide. Heading = "Step N — first sentence of .step-do"; the rest of
         .step-do plus .step-why becomes the slide subtitle; .step-verify (if
         present) rides along as that same slide's single isTip bullet — the
         engine's existing callout representation — so the check never
         separates from the step it verifies via bullet chunking. */
      sec.querySelectorAll('.step-card').forEach(function (card) {
        var num    = card.querySelector('.step-num');
        var doEl   = card.querySelector('.step-do');
        var why    = card.querySelector('.step-why');
        var verify = card.querySelector('.step-verify');
        if (!doEl) return;
        var doText = textOf(doEl);
        var endIdx = firstSentenceEnd(doText);
        var heading = 'Step ' + (num ? textOf(num) : '') + ' — ' +
                      (endIdx > 0 ? doText.slice(0, endIdx) : doText);
        var bodyBits = [];
        if (endIdx > 0 && endIdx < doText.length - 1) bodyBits.push(doText.slice(endIdx + 1).trim());
        if (why) bodyBits.push(textOf(why));
        stepSlides.push({
          type:     'content',
          dark:     isDark,
          eyebrow:  '',
          title:    heading,
          subtitle: bodyBits.join(' '),
          bullets:  verify ? [{ heading: 'Verify', body: textOf(verify), isTip: true }] : []
        });
      });

      /* Tip / trick boxes */
      sec.querySelectorAll('.tip-trick, .tip-box, .callout').forEach(function (tip) {
        var label = tip.querySelector('.tip-trick-label, .callout-label, strong');
        /* Prefer the <p> so the body doesn't swallow the label text again */
        var body  = tip.querySelector('p') || tip.querySelector('.tip-trick-copy');
        if (label) {
          bullets.push({
            heading: textOf(label),
            body:    body ? textOf(body) : '',
            isTip:   true
          });
          bulletSources.push(tip);
        }
      });

      /* Best-practice items (.bp-item) */
      sec.querySelectorAll('.bp-item').forEach(function (card) {
        var head = card.querySelector('.bp-title');
        var body = card.querySelector('.bp-body, p');
        if (head) {
          bullets.push({
            heading: textOf(head),
            body:    body ? textOf(body) : ''
          });
          bulletSources.push(card);
        }
      });

      /* Hygiene cards (.hy-card) */
      sec.querySelectorAll('.hy-card').forEach(function (card) {
        var label = card.querySelector('.hy-label');
        var title = card.querySelector('.hy-title');
        var body  = card.querySelector('.hy-body, p');
        var heading = (label ? textOf(label) + ': ' : '') + (title ? textOf(title) : '');
        if (heading.trim()) {
          bullets.push({
            heading: heading.trim(),
            body:    body ? textOf(body) : ''
          });
          bulletSources.push(card);
        }
      });

      /* Strategy cards (.sg-card) */
      sec.querySelectorAll('.sg-card').forEach(function (card) {
        var header = card.querySelector('.sg-header');
        var title  = card.querySelector('.sg-title');
        var body   = card.querySelector('p');
        var heading = header ? textOf(header).replace(/^[★-￿\s✅⚠️❌]+/u, '').trim() : (title ? textOf(title) : '');
        if (!heading && title) heading = textOf(title);
        if (heading) {
          bullets.push({
            heading: heading,
            body:    (title && header ? textOf(title) + (body ? ' — ' + textOf(body) : '') : (body ? textOf(body) : ''))
          });
          bulletSources.push(card);
        }
      });

      /* Reflection cards (.reflect-card) */
      sec.querySelectorAll('.reflect-card').forEach(function (card) {
        var q    = card.querySelector('.reflect-q');
        var hint = card.querySelector('.reflect-hint');
        if (q) {
          bullets.push({
            heading: textOf(q).replace(/^"|"$/g, ''),
            body:    hint ? textOf(hint) : ''
          });
          bulletSources.push(card);
        }
      });

      /* Numbered / comparison list items (qa-row, qa-card, etc.) — .step-card
         has its own dedicated extractor above and is deliberately excluded
         here so it isn't double-processed. */
      sec.querySelectorAll('.qa-card, .pro-con-card, .comparison-card').forEach(function (card) {
        var head = card.querySelector('h3, .card-label, strong');
        var body = card.querySelector('p');
        if (head) {
          bullets.push({
            heading: textOf(head),
            body:    body ? textOf(body) : ''
          });
          bulletSources.push(card);
        }
      });

      /* Nothing is truncated or dropped: overflow bullets continue onto
         follow-on slides instead of being cut at four per slide. */
      var PER_SLIDE = 4;
      function chunkBullets(list) {
        var out = [];
        for (var i = 0; i < list.length; i += PER_SLIDE) out.push(list.slice(i, i + PER_SLIDE));
        return out;
      }

      /* Split `bullets` into what came before vs. after the step list in the
         markup, so a section authored as intro-card → steps → closing-tip
         doesn't get its closing tip yanked in front of the steps it follows.
         Sections with no step cards skip this entirely and chunk `bullets`
         exactly as before — same array, same chunkBullets() call, same
         fallback — so their output is unchanged. This only resolves the
         step-list boundary; the fixed code-order in which the loops above
         collect .insight-card/.dev-card/etc. bullets is untouched. */
      var beforeBullets = bullets;
      var afterBullets  = [];
      if (stepSlides.length) {
        var firstStepCard = sec.querySelector('.step-card');
        beforeBullets = [];
        bullets.forEach(function (b, idx) {
          var src = bulletSources[idx];
          var isAfterSteps = firstStepCard && src &&
            !!(firstStepCard.compareDocumentPosition(src) & Node.DOCUMENT_POSITION_FOLLOWING);
          (isAfterSteps ? afterBullets : beforeBullets).push(b);
        });
      }

      var beforeChunks = chunkBullets(beforeBullets);
      /* The section always leads with its own slide (h2 + subtitle), even
         with zero bullets before the steps — matches the pre-step-card
         fallback that guaranteed every section produced at least one slide. */
      if (!beforeChunks.length) beforeChunks.push([]);
      var afterChunks = chunkBullets(afterBullets);

      var slideIdx = 0;
      function buildChunkSlides(chunkList) {
        return chunkList.map(function (chunk) {
          var s = {
            type:     'content',
            dark:     isDark,
            eyebrow:  textOf(eyeEl),
            title:    innerOf(h2) + (slideIdx > 0 ? ' <span class="sl-cont">(cont.)</span>' : ''),
            subtitle: slideIdx === 0 ? textOf(subEl) : '',
            bullets:  chunk
          };
          slideIdx++;
          return s;
        });
      }

      var beforeContentSlides = buildChunkSlides(beforeChunks);
      var afterContentSlides  = buildChunkSlides(afterChunks);

      beforeContentSlides.forEach(function (s) { slides.push(s); });
      stepSlides.forEach(function (s) { slides.push(s); });
      afterContentSlides.forEach(function (s) { slides.push(s); });
    });

    return slides;
  }

  /* ─── Slide builders ────────────────────────────────────── */

  function makeSection(className) {
    var s = document.createElement('section');
    s.className = className;
    return s;
  }

  function buildModuleCover() {
    var sec = makeSection('sl-mod-cover');
    sec.innerHTML =
      '<span class="sl-dot" style="background:' + cfg.color + '"></span>' +
      '<div class="sl-mod-num">' + cfg.label + '</div>' +
      '<h1 class="sl-mod-name">' + cfg.subLabel + '</h1>' +
      '<p class="sl-mod-topics">' +
        cfg.lessons.map(function (l) { return l.title; }).join('  ·  ') +
      '</p>' +
      '<a class="sl-home-link" href="../../index.html">← Workshop Home</a>';
    return sec;
  }

  function buildLessonTitle(slide) {
    var sec = makeSection('sl-lesson-cover');
    var html = '';
    if (slide.eyebrow) html += '<div class="sl-eyebrow">' + slide.eyebrow + '</div>';
    html += '<h1 class="sl-title">' + slide.title + '</h1>';
    if (slide.subtitle) html += '<p class="sl-subtitle">' + slide.subtitle + '</p>';
    if (slide.file)     html += '<a class="sl-lesson-open" href="' + slide.file + '">Open full lesson →</a>';
    sec.innerHTML = html;
    return sec;
  }

  function buildContent(slide) {
    var cls = 'sl-content' + (slide.dark ? ' sl-dark' : '');
    /* Long, untruncated slides get a density class so the full text
       scales down to fit rather than overflowing the 1280×720 frame. */
    var totalChars = slide.bullets.reduce(function (n, b) {
      return n + b.heading.length + b.body.length;
    }, slide.subtitle ? slide.subtitle.length : 0);
    if (totalChars > 900)      cls += ' sl-dense-2';
    else if (totalChars > 550) cls += ' sl-dense';
    var sec = makeSection(cls);
    var html = '';
    if (slide.eyebrow)  html += '<div class="sl-eyebrow">' + slide.eyebrow + '</div>';
    html += '<h2 class="sl-heading">' + slide.title + '</h2>';
    if (slide.subtitle) html += '<p class="sl-subtitle">' + slide.subtitle + '</p>';
    if (slide.bullets.length) {
      html += '<ul class="sl-bullets">';
      slide.bullets.forEach(function (b) {
        html +=
          '<li class="' + (b.isTip ? 'sl-tip' : '') + '">' +
          '<strong>' + b.heading + '</strong>' +
          (b.body ? '<span class="sl-bullet-body"> — ' + b.body + '</span>' : '') +
          '</li>';
      });
      html += '</ul>';
    }
    sec.innerHTML = html;
    return sec;
  }

  function buildEnd() {
    var sec = makeSection('sl-end');
    var firstFile = cfg.lessons.length ? cfg.lessons[0].file : '../../index.html';
    sec.innerHTML =
      '<span class="sl-dot" style="background:' + cfg.color + '"></span>' +
      '<h2>' + cfg.label + ' Complete</h2>' +
      '<div class="sl-end-links">' +
        '<a href="' + firstFile + '">Open Lessons →</a>' +
        '<a href="../../index.html">Workshop Home</a>' +
      '</div>';
    return sec;
  }

  /* ─── Fetch → extract → assemble → init ─────────────────── */

  var moduleCover = buildModuleCover();

  var promises = cfg.lessons.map(function (lesson) {
    return fetch(lesson.file)
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text();
      })
      .then(function (html) {
        return extractSlides(html, lesson.file, lesson.title);
      })
      .catch(function (err) {
        console.warn('slides-engine: could not load ' + lesson.file, err);
        return [{
          type:     'content',
          dark:     false,
          eyebrow:  'Load error',
          title:    lesson.title,
          subtitle: 'Could not fetch ' + lesson.file,
          bullets:  []
        }];
      });
  });

  Promise.all(promises).then(function (allSlides) {
    /* Rebuild deck */
    deck.innerHTML = '';
    deck.appendChild(moduleCover);

    allSlides.forEach(function (lessonSlides) {
      lessonSlides.forEach(function (slide) {
        deck.appendChild(
          slide.type === 'lesson-title' ? buildLessonTitle(slide) : buildContent(slide)
        );
      });
    });

    deck.appendChild(buildEnd());

    /* Init Reveal */
    if (typeof Reveal === 'undefined') {
      deck.innerHTML =
        '<section><h2>Slide engine did not load</h2>' +
        '<p>reveal.js is missing. It is vendored at ' +
        '<code>assets/vendor/reveal/</code> — check the file is present and that this deck is ' +
        'being served over HTTP (open it via <code>./serve</code>, not <code>file://</code>).</p>' +
        '<p>Fallback: present from the lesson pages directly.</p></section>';
      return;
    }
    Reveal.initialize({
      hash:            true,
      transition:      'fade',
      transitionSpeed: 'fast',
      controls:        true,
      progress:        true,
      slideNumber:     'c/t',
      center:          false,
      width:           1280,
      height:          720,
      margin:          0.04
    });
  });

})();
