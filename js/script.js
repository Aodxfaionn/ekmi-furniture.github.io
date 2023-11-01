// Бургерное меню
const burger = document.querySelector(".mobileMenu");
menu = document.querySelector(".header__nav");

burger.addEventListener("click", () => {
  menu.classList.toggle("open");
  burger.classList.toggle("active");
});

// слайдер
const dots = document.querySelectorAll(".slider__toggle-dot");
  slides = document.querySelectorAll(".slider__slide");

function changeSlide(slideIndex) {
  for (let i = 0; i < dots.length; i++) dots[i].classList.remove('active');
  for (let i = 0; i < slides.length; i++) slides[i].classList.remove('active');
  slides[slideIndex].classList.add('active');
  dots[slideIndex].classList.add('active');
}

for (let i = 0; i < dots.length; i++) dots[i].addEventListener('click', () => changeSlide(i));

// скрипт для маски телефона, запускается при загрузке документа
window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll(".tel"), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i);
      }
      var reg = matrix
        .substr(0, this.value.length)
        .replace(/_+/g, function (a) {
          return "\\d{1," + a.length + "}";
        })
        .replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (
        !reg.test(this.value) ||
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      )
        this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = "";
    }
    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
  });
});

const modal = document.querySelector(".modal"),
  btnModal = document.querySelector("#modal");

btnModal.addEventListener("click", (e) => modal.classList.add("open"));

modal.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target == modal) modal.classList.remove("open");
});

const mainForm = document.querySelector(".forma__form");
const modalForm = document.querySelector(".modal__content.form");
checkForm(mainForm);
checkForm(modalForm);

function checkForm(forma) {
  const errorField = forma.querySelectorAll(".form__error"),
    btn = forma.querySelector("#validate");
  forma.addEventListener("click", () => checkFormField(forma));
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    checkFullField(forma);
    for (error of errorField) {
      if (error.textContent != "") return false;
      else btn.textContent = "Заявка отправлена";
    }
  });
}

// Валидация форм
function checkFormField(forma) {
  const emailInput = forma.querySelector(".email");
  const telInput = forma.querySelector(".tel");
  const name = forma.querySelector(".name");
  const area = forma.querySelector("textarea");

  const validateEmail = () => {
    const pattern = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
    if (emailInput.value.match(pattern))
      emailInput.nextElementSibling.innerHTML = "";
    else
      emailInput.nextElementSibling.innerHTML = "Вы ввели некорректный e-mail";
  };
  const validateTel = () => {
    const telInputValue = telInput.value;
    if (telInputValue.length < 17)
      telInput.nextElementSibling.innerHTML =
        "Вы ввели некорректный номер телефона";
    else if (telInputValue.length < 4)
      telInput.nextElementSibling.innerHTML =
        "Поле, обязательное для заполнения";
    else telInput.nextElementSibling.innerHTML = "";
  };
  const validateTextarea = () => {
    if (area.value.length >= 1000)
      area.nextElementSibling.innerHTML =
        "Число символов не должно превышать 1000";
    else area.nextElementSibling.innerHTML = "";
  };
  const validateText = () => {
    const patternLetter = /^[a-zA-ZА-Яа-яЁё]{3,20}$/u;
    if (name.value.length == 0)
      name.nextElementSibling.innerHTML = "Поле, обязательное для заполнения";
    else if (name.value.match(patternLetter) && name.value.length >= 3)
      name.nextElementSibling.innerHTML = "";
    else if (name.value.length >= 20)
      name.nextElementSibling.innerHTML =
        "Число символов не должно превышать 20";
    else if (name.value.length < 3)
      name.nextElementSibling.innerHTML =
        "Число символов не должно быть меньше 3";
    else
      name.nextElementSibling.innerHTML = "Поле может содержать только буквы";
  };
  emailInput.addEventListener("change", validateEmail);
  telInput.addEventListener("change", validateTel);
  name.addEventListener("change", validateText);
  area.addEventListener("change", validateTextarea);
}

// Проверка значений инпутов, форма не отправляется, если одно из них пустое
function checkFullField(forma) {
  const inputRequired = forma.querySelectorAll("[required]");
  for (input of inputRequired) {
    if (input.value == "") input.nextElementSibling.innerHTML = "Поле, обязательное для заполнения";
  }
}

// Якорные ссылки
const links = document.querySelectorAll('a[href^="#"]');
links.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Кнопка скролла
const scrollBtn = document.querySelector("#scroll");
function scrollFunction() {
  if (document.body.scrollTop > 550 || document.documentElement.scrollTop > 550) scrollBtn.classList.add("open");
  else scrollBtn.classList.remove("open");
}

function topFunction() {
  let scrollStep = -window.scrollY / (500 / 15);
  let scrollInterval = setInterval(() => {
    if (window.scrollY != 0) window.scrollBy(0, scrollStep);
    else clearInterval(scrollInterval);
  }, 15);
}

window.addEventListener("scroll", scrollFunction);
scrollBtn.addEventListener("click", topFunction);
