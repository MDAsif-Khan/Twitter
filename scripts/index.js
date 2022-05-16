// Follower Buttons
let flw1 = document.getElementsByClassName('follow')[0];
let flw2 = document.getElementsByClassName('follow')[1];
let flw3 = document.getElementsByClassName('follow')[2];

function followBtnChange(e) {
  e.classList.toggle('clicked');
}

// Pop-Ups
let body = document.getElementsByTagName('body')[0];
let main = document.getElementsByTagName('main')[0];
let postW = document.getElementsByClassName('pop-up')[0];
let imgInput = document.getElementById('img');
let videoInput = document.getElementById('video');
let postImg = document.getElementById('post-img');
let postVideo = document.getElementById('post-video');
let caption = document.getElementById('caption');
let postBtn = document.getElementsByClassName('post')[0];
let imgInputIcon = document.getElementsByClassName('icon-for-select')[0];
let videoInputIcon = document.getElementsByClassName('icon-for-select')[1];
function post(e) {
  e.classList.toggle('pop-show');
  main.classList.toggle('main-block');
  // body.classList.toggle('body-hidden');

  postImg.setAttribute('src', '');
  postVideo.setAttribute('src', '');
  postImg.style.display = 'none';
  postVideo.style.display = 'none';
  imgInput.value = '';
  videoInput.value = '';
  videoInput.removeAttribute('disabled');
  imgInput.removeAttribute('disabled');
  videoInputIcon.style.cssText = "opacity: 100%; pointer-events: auto;"
  imgInputIcon.style.cssText = "opacity: 100%; pointer-events: auto;"
}

caption.addEventListener('keyup', function () {
  if (caption.value) {
    postBtn.classList.add('post-valued');
  } else {
    postBtn.classList.remove('post-valued');
  }
});


// Input Field img
function readURL(input) {
  if (input.files && input.files[0]) {

    let reader = new FileReader();
    reader.onload = function (e) {
      postImg.style.display = 'block';
      postImg.setAttribute("src", e.target.result);
      videoInput.disabled = 'true';
      videoInputIcon.style.cssText = "opacity: 60%; pointer-events: none;"
    };

    reader.readAsDataURL(input.files[0]);
  }
}

// Input Field Video
document.getElementById("video").onchange = function (event) {
  let file = event.target.files[0];
  let blobURL = URL.createObjectURL(file);
  postVideo.style.display = 'block';
  postVideo.src = blobURL;
  imgInput.disabled = 'true';
  imgInputIcon.style.cssText = "opacity: 60%; pointer-events: none;"
}

function linky(text) {
  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return text.replace(urlRegex, function(url,b,c) {
      var url2 = (c == 'www.') ?  'http://' +url : url;
      return '<a href="' +url2+ '" target="_blank">' + url + '</a>';
  }) 
}

let pstForm = document.getElementById('post-form');
function posted() {
  let text = linky(caption.value);
  let img = postImg.getAttribute('src');
  let video = postVideo.getAttribute('src');

  let imgStyle;
  let videoStyle;

  pstForm.reset();
  postBtn.classList.remove('post-valued');

  if (img !== "") {
    imgStyle = 'style="display: block !important;"';
  } else {
    videoStyle= 'style="display: block !important;"';
  }

  let postContainer = '\
<div class="post-container">\
<div class="post-header">\
    <img class="post-profile-img" src="images/profile-img/elon.jpg" alt="Elon Musk">\
    <div class="post-info">\
        <div class="post-title flex"><span>Elon Musk</span> added a post on <div\
                class="time">' + time + '</div>\
        </div>\
        <div class="profile-name">@elonmusk</div>\
    </div>\
</div>\
<div class="post-body">\
    <pre class="caption-text">' + text + '</pre>\
    <img class="post-content" src=' + img + ' ' + imgStyle + '>\
    <video class="post-content" src=' + video + ' ' + videoStyle + ' controls controlsList="nodownload">Your browser does not support video tag.</video>\
</div>\
<div class="post-bottom flex">\
    <div class="post-icons">\
        <svg role="img" xmlns="http://www.w3.org/2000/svg" class="post-icon" fill="none" viewBox="0 0 24 24" aria-label="Like icon"\
            stroke="currentColor" stroke-width="2">\
            <path stroke-linecap="round" stroke-linejoin="round"\
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />\
                <title>Like</title>\
        </svg>\
    </div>\
    <div class="post-icons">\
        <svg role="img" xmlns="http://www.w3.org/2000/svg" class="post-icon" fill="none" viewBox="0 0 24 24" aria-label="Share icon"\
            stroke="currentColor" stroke-width="2">\
            <path stroke-linecap="round" stroke-linejoin="round"\
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />\
              <title>Share</title>\
        </svg>\
    </div>\
</div>\
</div>\
'
  document.getElementsByClassName('mid-col')[0].innerHTML += postContainer;
}

let current = new Date();
let time = current.toLocaleTimeString();
document.getElementsByClassName('time')[0].innerHTML = time;