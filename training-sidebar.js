(function () {
  var SIDEBAR_WIDTH = 220;

  var MODULES = [
    {
      label: 'Day 1',
      subLabel: 'Foundations & Personal Value',
      color: '#4f9990',
      slidesFile: 'module-1-slides.html',
      lessons: [
        { file: '01-what-is-cowork.html',            title: 'What Is Cowork' },
        { file: '02-getting-set-up.html',            title: 'Get Set Up' },
        { file: '06-folder-access-walkthrough.html', title: 'Workshop Folder' },
        { file: '03-first-cowork-session.html',      title: 'Personalize & Verify', exercise: true }
      ]
    },
    {
      label: 'Day 2',
      subLabel: 'Skills & Everyday Workflows',
      color: '#c4b5fd',
      slidesFile: 'module-2-slides.html',
      lessons: [
        { file: '05-working-effectively.html',  title: 'Walk a Workflow' },
        { file: '09-anatomy-of-a-skill.html',   title: 'Skill Anatomy' }
      ]
    },
    {
      label: 'Day 3',
      subLabel: 'Use Cases + Governance',
      color: '#7dd3e8',
      slidesFile: 'module-3-slides.html',
      lessons: [
        { file: '04-use-cases-by-industry.html', title: 'Use-Case Ideation' },
        { file: '17-governance-snapshot.html',   title: 'Governance Snapshot' }
      ]
    }
  ];

  // Detect current file
  var pathParts = window.location.pathname.split('/').filter(Boolean);
  var currentFile = pathParts[pathParts.length - 1] || '';

  // Inject styles
  var style = document.createElement('style');
  style.textContent =
    // Sidebar shell
    '.tsb{position:fixed;top:84px;left:0;width:' + SIDEBAR_WIDTH + 'px;bottom:0;' +
    'background:#fff;border-right:1px solid var(--border);' +
    'overflow-y:auto;overflow-x:hidden;z-index:900;' +
    'display:flex;flex-direction:column;}' +

    // Home link
    '.tsb-home{display:flex;align-items:center;gap:8px;padding:14px 16px 10px;' +
    'text-decoration:none;color:var(--slatel);font-size:12px;font-weight:700;' +
    'letter-spacing:.08em;text-transform:uppercase;border-bottom:1px solid var(--border);' +
    'transition:color .15s;}' +
    '.tsb-home:hover{color:var(--teal);}' +
    '.tsb-home i{font-size:14px;}' +

    // Module group
    '.tsb-mod{padding:14px 0 4px;}' +
    '.tsb-mod-label{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;' +
    'color:var(--slatel);padding:0 16px 6px;display:flex;align-items:center;gap:6px;}' +
    '.tsb-mod-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}' +

    // Lesson links
    '.tsb-lesson{display:flex;align-items:baseline;gap:6px;' +
    'padding:6px 14px 6px 16px;text-decoration:none;' +
    'font-size:13px;color:var(--slate);line-height:1.35;' +
    'border-left:2px solid transparent;' +
    'transition:color .15s,border-color .15s,background .15s;}' +
    '.tsb-lesson:hover{color:var(--teal);background:var(--tealL);}' +
    '.tsb-lesson.tsb-active{color:var(--teal);border-left-color:var(--teal);background:var(--tealL);font-weight:600;}' +
    '.tsb-ex{font-size:10px;color:var(--amber);flex-shrink:0;}' +

    // Slides link
    '.tsb-slides{display:block;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;' +
    'color:var(--slatel);text-decoration:none;padding:0 16px 10px 28px;transition:color .15s;}' +
    '.tsb-slides:hover{color:var(--teal);}' +

    // Divider
    '.tsb-div{height:1px;background:var(--border);margin:4px 12px;}' +

    // Body offset — push content right
    'body.has-tsb{padding-left:' + SIDEBAR_WIDTH + 'px;}' +

    // Hide below 1024px
    '@media(max-width:1024px){.tsb{display:none;}body.has-tsb{padding-left:0;}}' +

    '';
  document.head.appendChild(style);

  // Build sidebar element
  var sb = document.createElement('nav');
  sb.className = 'tsb';
  sb.setAttribute('aria-label', 'Training navigation');

  // Home link
  var home = document.createElement('a');
  home.href = '../../index.html';
  home.className = 'tsb-home';
  home.innerHTML = '<span aria-hidden="true" style="margin-right:6px;">←</span>Workshop Home';
  sb.appendChild(home);

  MODULES.forEach(function (mod) {
    var group = document.createElement('div');
    group.className = 'tsb-mod';

    var label = document.createElement('div');
    label.className = 'tsb-mod-label';
    label.innerHTML =
      '<span class="tsb-mod-dot" style="background:' + mod.color + '"></span>' +
      mod.label + ' <span style="font-weight:400;opacity:.7;">' + mod.subLabel + '</span>';
    group.appendChild(label);

    if (mod.slidesFile) {
      var slidesLink = document.createElement('a');
      slidesLink.href = mod.slidesFile;
      slidesLink.className = 'tsb-slides';
      slidesLink.textContent = '⊞ Slides';
      group.appendChild(slidesLink);
    }

    mod.lessons.forEach(function (lesson) {
      var a = document.createElement('a');
      a.href = lesson.file;
      a.className = 'tsb-lesson' + (currentFile === lesson.file ? ' tsb-active' : '');
      a.innerHTML = lesson.title + (lesson.exercise ? ' <span class="tsb-ex">✦</span>' : '');
      group.appendChild(a);
    });

    sb.appendChild(group);

    var div = document.createElement('div');
    div.className = 'tsb-div';
    sb.appendChild(div);
  });

  // Insert sidebar and mark body
  document.body.insertBefore(sb, document.body.firstChild);
  document.body.classList.add('has-tsb');
})();
