// AOS
AOS.init()

// Ambil elemen musik
var music = document.querySelector('.music');

function mulai() {
  // back to top
  window.scrollTo(0, 0);

  // play sound door
  var soundDoor = document.querySelector('.sound-door');
  if (soundDoor) soundDoor.play();

  // door section
  var doorSection = $('#door-section');
  var doors = document.querySelectorAll('.door');

  // animasi pintu
  doors.forEach(function (door, index) {
    var direction = (index === 0) ? -1 : 1;
    door.style.transition = 'transform 0.8s ease';
    door.style.transform = 'rotateY(' + (70 * direction) + 'deg)';
  });

  // setelah pintu terbuka
  setTimeout(function () {
    if (music) music.play(); // play musik
    doorSection.css('transform', 'scale(6)');
  }, 600);

  // setelah transisi selesai
  setTimeout(function () {
    doorSection.css('opacity', '0');
    $('body').removeClass('overflow-hidden');
    $('body').addClass('transition');
    doorSection.css('display', 'none');
  }, 2000);
}


// button music
var isPlaying = true;
function toggleMusic(event) {
  event.preventDefault();
  const musicButton = document.getElementById('music-button');
  
  if (isPlaying) {
    musicButton.innerHTML = '<i class="fas fa-fw fa-pause"></i>';
    musicButton.classList.remove('rotate');
    musicButton.style.transform = 'translateY(0)';
    music.pause();
  } else {
    musicButton.innerHTML = '<i class="fas fa-fw fa-compact-disc"></i>';
    musicButton.classList.add('rotate');
    music.play();
  }
  
  isPlaying = !isPlaying;
}

// countdown wedding
var countdownDate = new Date("Feb 10, 2026 10:00:00").getTime();
var x = setInterval(function () {
  var now = new Date().getTime();
  var distance = countdownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

document.getElementById('countdown-wedding').innerHTML = `
  <div class="col-lg-1 col-3"><div class="countdown-box"><h5>${days}</h5><small>Hari</small></div></div>
  <div class="col-lg-1 col-3"><div class="countdown-box"><h5>${hours}</h5><small>Jam</small></div></div>
  <div class="col-lg-1 col-3"><div class="countdown-box"><h5>${minutes}</h5><small>Menit</small></div></div>
  <div class="col-lg-1 col-3"><div class="countdown-box"><h5>${seconds}</h5><small>Detik</small></div></div>
`;


  if (distance < 0) {
    clearInterval(x);
    document.getElementById('countdown-wedding').innerHTML =
      "<span class='text-center p-3 rounded text-dark m-2'><h2>Sudah dimulai!</h2></span>";
  }
}, 1000);

// nama sambutan
const urlParams = new URLSearchParams(window.location.search);
const panggilan = urlParams.get('p');
const nama = urlParams.get('n');
const namaSambutan = document.querySelector('#nama-sambutan');
namaSambutan.innerText = `${panggilan} ${nama}`;


// copy text
function copyText(el) {
  var content = jQuery(el).siblings('div.card-container').find('div.card-number').text().trim();
  var temp = document.createElement("textarea");
  document.body.appendChild(temp);
  temp.value = content.replace(/\s+/g, '');
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);

  jQuery(el).text('Berhasil di copy');
  setTimeout(function () {
    jQuery(el).html('<i class="fas fa-regular fa-copy"></i> Copy');
  }, 2000);
}

// form rsvp

window.addEventListener("load", function () {
  const form = document.getElementById('rsvp-form');
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const status = document.getElementById('status').value;
    const nama = document.getElementById('nama').value.trim();

    if (nama === "") {
      Swal.fire({
        icon: "error",
        text: "Nama harus diisi!"
      });
      return;
    }

    if (status == "0") {
      Swal.fire({
        icon: "error",
        text: "Pilih salah satu status terlebih dahulu!"
      });
      return;
    }

    const data = new FormData(form);
    const action = e.target.action;
    const input = form.querySelectorAll('input, select, button');
    input.forEach(input => {
      input.disabled = true;
    });

    fetch(action, {
      method: 'POST',
      body: data
    })
      .then(() => {
        Swal.fire({
          icon: "success",
          text: "Konfirmasi kehadiran Anda berhasil terkirim!"
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: error
        });
      })
      .finally(() => {
        input.forEach(input => {
          input.disabled = false;
        });
      });
  });
});

