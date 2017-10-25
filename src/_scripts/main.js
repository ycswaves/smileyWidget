'use strict';

document.addEventListener('DOMContentLoaded', () => {

  !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="4.0.0";
  analytics.load("zMeUYb4r818qnnPj0q540zKhEhPGIz3s");
  analytics.page();
  }}();
  
  const feedbackContainer = document.createElement('div');
  feedbackContainer.setAttribute('class', 'feedback-container');

  const emojiNameList = ['love','smile','neutral','sad','angry'].reverse();

  const qnConfigs = [
    { display: 'Ease of use', name: 'easeOfUse' },
    { display: 'Clarity of presentation', name: 'clarityOfPresentation' },
    { display: 'Technical performance', name: 'techPerformance' }
  ];

  feedbackContainer.innerHTML = `
    <div class="feedback-btn">
      <ul id="emojiList" class="emoji-list">
        ${emojiNameList.map((name, i) => `<li><img data-value="${i+1}" src="images/emoji/${name}.svg" /></li>`).join('')}
      </ul>
      <img id="giveFeedback" src="images/emoji/wink.svg" />
    </div>
    <div id="feedbackDetail" class="feedback-detail" >
      <form id="detailForm" class="detail-form">
      ${qnConfigs.map(qn => `
        <div class="form-group">
          <div class="question">${qn.display}</div>
          
          <div class="emojis">
            ${emojiNameList.map((iconName, i) => `
            <label>
              <input type="radio" name="${qn.name}" value="${i+1}" />
              <object data="https://s3-ap-southeast-1.amazonaws.com/wogaa-smiley/images/emoji/${iconName}.svg" type="image/svg+xml"></object>
            </label>
            `).join('')}
          </div>  
        </div>
      `).join('')}
        <div class="form-group">
          <textarea name="tellUsMore" class="free-text" placeholder="Tell us more"></textarea>
        </div>  
        <button class="submit">Submit</button>
      </form>

      <div id="confirmationBox" class="confirmation-box">
        <h1>Thank you!</h1>
        <p>You feedback have been submitted successfully.</p>
      </div>
    </div>
  `;

  const docBody = document.querySelector('body');  
  docBody.appendChild(feedbackContainer);

  const emojiList = document.querySelector('#emojiList');
  const feedbackBtn = document.querySelector('#giveFeedback');
  const feedbackDetailContainer = document.querySelector('#feedbackDetail');
  const form = document.querySelector('#detailForm');
  const confirmationBox = document.querySelector('#confirmationBox');

  function hide(dom) {
    dom.classList.remove('show');
  }

  function show(dom) {
    dom.classList.add('show');
  }

  function isVisible(dom) {
    dom.classList.contains('show');
  }
  
  document.querySelector('html').addEventListener('click', e => {
    if (e.target == feedbackBtn) return;

    if (isVisible(emojiList)) {
      hide(emojiList);
    }
  });


  emojiList.addEventListener('click', e => {
    const overallRating = e.target.getAttribute('data-value');

    analytics.track('Rating', {
      rating: overallRating 
    });

    hide(emojiList);
    show(feedbackDetailContainer);
    show(form);
  });

  feedbackDetailContainer.addEventListener('click', e => {
    if (e.target === feedbackDetailContainer) {
      hide(feedbackDetailContainer);
      form.reset();
    }
  });

  feedbackBtn.addEventListener('click', () => {
    show(emojiList);
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const analyticsData = {}
    for(const [key, val] of formData.entries()) {
      analyticsData[key] = val;
      console.log(key+ ', '+ val); 
    }

    analytics.track('Detail Rating', analyticsData);

    console.log('sent', analyticsData);

    hide(form);
    form.reset();
    show(confirmationBox);
    debugger;
    setTimeout(() => {
      hide(feedbackDetailContainer);
      hide(confirmationBox);
    }, 3000);
  });

});


