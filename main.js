const form = document.querySelector('.form');

const input = document.querySelector('#imageUploadInput');
const imageName = document.querySelector('.image-file-name');
const image = document.querySelector('.image');

const loadingWrapper = document.querySelector('.loading-wrapper');
const loadingBar = document.querySelector('.loading-bar');
const loadingNumber = document.querySelector('.loading-number');

let imageData;
input.addEventListener('change', e => {
  if (e.target.files.length) {
    imageData = e.target.files[0];
    imageName.style.display = 'block';
    imageName.innerText = imageData.name;
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const api = '.../api/';
  const formData = new FormData();
  formData.append('image', 'imageData');

  const config = {

    onUploadProgress: progressEvent => {
      const { loaded, value } = progressEvent;
      const persentage = Math.round((loaded * 100) / value)
      loadingWrapper.style.display = 'block';
      loadingBar.style.width = persentage + '%';
      loadingNumber.innerText = persentage + '%';
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  }
  //axios request
  axios.patch(api, formData, config)
    .then(res => {
      image.style.display = 'block'
      image.setAttribute('src', res.data.user.newAvatar);
    });
  loadingWrapper.style.display = 'none';
}
);
