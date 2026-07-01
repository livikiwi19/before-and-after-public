(function () {
  'use strict';

  var frame   = document.getElementById('compareFrame');
  var handle  = document.getElementById('compareHandle');
  var before  = frame.querySelector('.compare__img--before');
  var compare = document.getElementById('compare');

  var isDragging = false;

  var initialPosition = parseFloat(compare.getAttribute('data-position')) || 65;

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
