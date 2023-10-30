// Бургерное меню
const burger = document.querySelector(".mobileMenu")
  menu = document.querySelector(".header__nav");

burger.addEventListener("click", () => {
  menu.classList.toggle("open");
  burger.classList.toggle("active");
});

// При скролле наверх появляется хедер
// const headerMini = document.querySelector(".headerMini");
// let prevScrollpos = window.pageYOffset;
// window.onscroll = function () {
//   let currentScrollPos = window.pageYOffset;
//   if (prevScrollpos > currentScrollPos) headerMini.style.top = "0";
//   else headerMini.style.top = "-85px";
//   if (prevScrollpos < 850) headerMini.style.top = "-85px";
//   prevScrollpos = currentScrollPos;
// };

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

const mainForm = document.querySelector('.forma__form');
const modalForm = document.querySelector('.modal__content.form');
checkForm(mainForm);
checkForm(modalForm);


function checkForm(forma) {
  const errorField = forma.querySelectorAll('.form__error'),
  btn = forma.querySelector('#validate');
  forma.addEventListener("click", () => checkFormField(forma));
  btn.addEventListener('click', (e) => { 
  e.preventDefault();
    checkFullField(forma);
    for (error of errorField) {
      if(error.textContent == '') return false
      else btn.textContent = 'Заявка отправлена';
    } 
  });
};

// Валидация форм
function checkFormField(forma) {
    const emailInput = forma.querySelector(".email");
    const validateEmail = () => {
      const email = forma.querySelector(".email").value;
      const pattern = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
      if (email.match(pattern)) emailInput.nextElementSibling.innerHTML = "";
      else emailInput.nextElementSibling.innerHTML = "Вы ввели некорректный e-mail";
    };
    emailInput.addEventListener("change", validateEmail);
    const telInput = forma.querySelector(".tel");
    const validateTel = () => {
      const telInputValue = telInput.value;
      if (telInputValue.length < 17) telInput.nextElementSibling.innerHTML = "Вы ввели некорректный номер телефона";
      else if (telInputValue.length < 4) telInput.nextElementSibling.innerHTML = "Поле, обязательное для заполнения";
      else telInput.nextElementSibling.innerHTML = "";
    };
    telInput.addEventListener("change", validateTel);
    const area = forma.querySelector("textarea");
    const validateTextarea = () => {
    if (area.value.length >= 1000) area.nextElementSibling.innerHTML = "Число символов не должно превышать 1000";
      else area.nextElementSibling.innerHTML = "";
    };
    area.addEventListener("change", validateTextarea);
    const name = forma.querySelector(".name");
    const validateText = (input) => {
    const patternLetter = /^[a-zA-ZА-Яа-яЁё]{3,20}$/u;
    if (name.value.length == 0) name.nextElementSibling.innerHTML = "Поле, обязательное для заполнения";
    else if (name.value.match(patternLetter) && name.value.length >= 3) name.nextElementSibling.innerHTML = "";
    else if (name.value.length >= 20) name.nextElementSibling.innerHTML = "Число символов не должно превышать 20";
    else if (name.value.length < 3) name.nextElementSibling.innerHTML = "Число символов не должно быть меньше 3";
    else name.nextElementSibling.innerHTML = "Поле может содержать только буквы";
    }
    name.addEventListener("change", () => validateText(name));
};

// Проверка значений инпутов, форма не отправляется, если одно из них пустое
function checkFullField(forma) {
  const inputRequired = forma.querySelectorAll("[required]");
  for (input of inputRequired) {
    if (input.value == "") input.nextElementSibling.innerHTML = "Поле, обязательное для заполнения";
  }
}
