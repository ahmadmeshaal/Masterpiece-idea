
  function switchHeroTab(tab) {
    const tabDaily = document.getElementById('tab-daily');
    const tabJourney = document.getElementById('tab-journey');
    const contentDaily = document.getElementById('content-daily');
    const contentJourney = document.getElementById('content-journey');

    if (tab === 'daily') {
      tabDaily.className = 'px-3 py-1 rounded-lg bg-white text-brand-700 shadow-sm border border-[#ded5c2]';
      tabJourney.className = 'px-3 py-1 rounded-lg text-[#757264] hover:text-[#22221b] transition-colors';
      contentDaily.classList.remove('hidden');
      contentJourney.classList.add('hidden');
    } else {
      tabJourney.className = 'px-3 py-1 rounded-lg bg-white text-amber-800 shadow-sm border border-[#ded5c2]';
      tabDaily.className = 'px-3 py-1 rounded-lg text-[#757264] hover:text-[#22221b] transition-colors';
      contentDaily.classList.add('hidden');
      contentJourney.classList.remove('hidden');
    }
  }

  let simStreak = 24;
  let simXP = 620;

  function triggerSimulateHabit(btn, xpGain, title) {
    simStreak += 1;
    simXP += xpGain;

    const streakEl = document.getElementById('sim-streak-count');
    const xpEl = document.getElementById('sim-xp-count');
    const bannerEl = document.getElementById('sim-feedback-banner');
    const feedbackText = document.getElementById('sim-feedback-text');

    streakEl.innerText = simStreak + ' Days';
    xpEl.innerText = simXP + ' XP';

    streakEl.classList.add('scale-125', 'text-streak-600');
    setTimeout(() => {
      streakEl.classList.remove('scale-125', 'text-streak-600');
    }, 300);

    feedbackText.innerText = `Logged "${title}"! Streak extended to ${simStreak} days (+${xpGain} XP rewarded ✨)`;
    bannerEl.classList.add('bg-brand-100', 'border-brand-400');
    setTimeout(() => {
      bannerEl.classList.remove('bg-brand-100', 'border-brand-400');
    }, 400);
  }

  // Keep each FAQ answer collapsed until its question row is clicked.
  document.querySelectorAll('#faq .tactile-card-lg').forEach((card, index) => {
    const row = card.querySelector('.flex.items-center.justify-between.mb-2');
    const heading = row.querySelector('h3');
    const arrow = row.querySelector('.w-8.h-8');
    const answer = card.querySelector('p');
    const question = document.createElement('button');

    question.type = 'button';
    question.className = `faq-question ${heading.className}`;
    question.setAttribute('aria-expanded', 'false');
    question.setAttribute('aria-controls', `faq-answer-${index + 1}`);
    question.innerHTML = `${heading.innerHTML}${arrow.outerHTML}`;
    question.querySelector('.w-8.h-8').classList.add('faq-arrow');

    answer.id = `faq-answer-${index + 1}`;
    answer.classList.add('faq-answer');
    answer.hidden = true;
    row.replaceChildren(question);

    question.addEventListener('click', () => {
      const isOpen = question.getAttribute('aria-expanded') === 'true';
      question.setAttribute('aria-expanded', String(!isOpen));
      answer.hidden = isOpen;
    });
  });

