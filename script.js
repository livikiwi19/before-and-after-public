(function () {
  'use strict';

  var frame    = document.getElementById('compareFrame');
  var handle   = document.getElementById('compareHandle');
  var before   = frame.querySelector('.compare__img--before');
  var after    = frame.querySelector('.compare__img--after');
  var compare  = document.getElementById('compare');
  var labelBefore = document.querySelector('.compare__label--before');
  var labelAfter  = document.querySelector('.compare__label--after');

  var isDragging = false;

  /* ---------------------------------------------------------------
     Multi-project support
     -------------------------------------------------------------
     This single file can power the widget on any number of pages.
     Instead of duplicating index.html/style.css/script.js per
     project, host ONE copy and pass each project's images in via
     URL query parameters on the iframe embed, e.g.:

     https://YOUR_USERNAME.github.io/YOUR_REPO/
       ?before=images/proiect-1/before.jpg
       &after=images/proiect-1/after.jpg
       &position=65

     Supported parameters (all optional):
       before        - path/URL to the "before" image
       after         - path/URL to the "after" image
       position      - initial handle position, 0-100 (default 65)
       ratio         - frame aspect ratio, e.g. "16/9" or "4/3"
       labelBefore   - overrides the left-side label text
       labelAfter    - overrides the right-side label text

     If a parameter is omitted, the widget falls back to the
     placeholder images/defaults already set in index.html, so the
     file is still safe to open directly during development.
  --------------------------------------------------------------- */
  var params = new URLSearchParams(window.location.search);

  var beforeSrc = params.get('before');
  var afterSrc  = params.get('after');
  if (beforeSrc) before.setAttribute('src', beforeSrc);
  if (afterSrc)  after.setAttribute('src', afterSrc);

  var ratio = params.get('ratio');
  if (ratio) {
    frame.style.aspectRatio = ratio.replace(':', '/');
  }

  var labelBeforeText = params.get('labelBefore');
  var labelAfterText  = params.get('labelAfter');
  if (labelBeforeText) labelBefore.textContent = labelBeforeText;
  if (labelAfterText)  labelAfter.textContent = labelAfterText;

  var initialPosition =
    parseFloat(params.get('position')) ||
    parseFloat(compare.getAttribute('data-position')) ||
    65;

  function setPosition(percent) {
    percent = Math.min(100, Math.max(0, percent));
    handle.style.left = percent + '%';
    before.style.clipPath = 'inset(0 ' + (100 - percent) + '% 0 0)';
    handle.setAttribute('aria-valuenow', Math.round(percent));
  }

  function percentFromClientX(clientX) {
    var rect = frame.getBoundingClientRect();
    var x = clientX - rect.left;
    return (x / rect.width) * 100;
  }

  function startDrag(clientX) {
    isDragging = true;
    handle.classList.add('dragging');
    setPosition(percentFromClientX(clientX));
  }

  function moveDrag(clientX) {
    if (!isDragging) return;
    setPosition(percentFromClientX(clientX));
  }

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    handle.classList.remove('dragging');
  }

  /* Pointer Events cover mouse, touch and pen in one unified API */
  frame.addEventListener('pointerdown', function (e) {
    frame.setPointerCapture(e.pointerId);
    startDrag(e.clientX);
  });

  frame.addEventListener('pointermove', function (e) {
    moveDrag(e.clientX);
  });

  frame.addEventListener('pointerup', endDrag);
  frame.addEventListener('pointercancel', endDrag);
  frame.addEventListener('pointerleave', function (e) {
    /* Only end if the pointer capture was released (safety net) */
    if (e.buttons === 0) endDrag();
  });

  /* Keyboard accessibility: arrow keys move the handle */
  handle.addEventListener('keydown', function (e) {
    var current = parseFloat(handle.style.left) || initialPosition;
    var step = e.shiftKey ? 10 : 2;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPosition(current - step);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPosition(current + step);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setPosition(100);
    }
  });

  /* Initialize at the requested starting position */
  setPosition(initialPosition);
})();
