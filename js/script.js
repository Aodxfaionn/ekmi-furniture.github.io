// Бургерное меню
// const burger = document.querySelector(".burger"),
//   contacts = document.querySelector(".header__contacts"),
//   menu = document.querySelector(".header__menu");

// burger.addEventListener("click", () => {
//   contacts.classList.toggle("open");
//   menu.classList.toggle("open");
//   burger.classList.toggle("active");
// });


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

// Валидация форм
// function checkFormField(forma) {
//   if (forma.querySelector(".email")) {
//     const emailInput = forma.querySelector(".email");
//     const validateEmail = () => {
//       const email = forma.querySelector(".email").value;
//       const pattern = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
//       if (email.match(pattern)) emailInput.nextElementSibling.innerHTML = "";
//       else emailInput.nextElementSibling.innerHTML = "Вы ввели некорректный e-mail";
//       if (email == "") emailInput.nextElementSibling.innerHTML = "Поле, обязательное для заполнения";
//     };
//     emailInput.addEventListener("change", validateEmail);
//   }
//   if (forma.querySelector(".tel")) {
//     const telInput = forma.querySelector(".tel");
//     const validateTel = () => {
//       const telInputValue = telInput.value;
//       if (telInputValue.length < 17) telInput.nextElementSibling.innerHTML = "Вы ввели некорректный номер телефона";
//       else if (telInputValue.length < 4) telInput.nextElementSibling.innerHTML = "Поле, обязательное для заполнения";
//       else telInput.nextElementSibling.innerHTML = "";
//     };
//     telInput.addEventListener("change", validateTel);
//   }
//   if (forma.querySelector("textarea")) {
//     const area = forma.querySelector("textarea");
//     const validateTextarea = () => {
//       if (area.value == 0) area.nextElementSibling.innerHTML = "Поле, обязательное для заполнения";
//       else if (area.value.length >= 1000) area.nextElementSibling.innerHTML = "Число символов не должно превышать 1000";
//       else area.nextElementSibling.innerHTML = "";
//     };
//     area.addEventListener("change", validateTextarea);
//   }
//   const validateText = (input) => {
//     const patternLetter = /^[a-zA-ZА-Яа-яЁё]{3,20}$/u;
//     let val = input.value;
//     if (input.value.length == 0) input.nextElementSibling.innerHTML = "Поле, обязательное для заполнения";
//     else if (val.match(patternLetter) && val.length >= 3) input.nextElementSibling.innerHTML = "";
//     else if (val.length >= 20) input.nextElementSibling.innerHTML = "Число символов не должно превышать 20";
//     else if (val.length < 3) input.nextElementSibling.innerHTML = "Число символов не должно быть меньше 3";
//     else input.nextElementSibling.innerHTML = "Поле может содержать только буквы";
//     }
//   if (forma.querySelector(".name")) {
//     const name = forma.querySelector(".name");
//     name.addEventListener("change", () => validateText(name));
//   }
// };

// Проверка значений инпутов, форма не отправляется, если одно из них пустое
function checkFullField(forma) {
  const inputRequired = forma.querySelectorAll("[required]");
  for (input of inputRequired) {
    if (input.value == "") input.nextElementSibling.innerHTML = "Поле, обязательное для заполнения";
  }
}

// window.addEventListener("click", (e) => {
//   if(e.target.closest('.js-btn-modal')) startModal(modalEntry);
// });


function startForm(formClass, btnClass) {
  const forma = document.querySelector(formClass);
  const btn = forma.querySelector(btnClass);
  forma.addEventListener("change", () => checkFormField(forma));
  btn.addEventListener("change", () => checkFullField(forma));
};

function startModal(curModal, prevModal) {
  cleanForm(curModal);
  if (prevModal) prevModal.classList.remove("open");
  curModal.classList.add("open");
  closeModal(curModal);
}


function closeModal(modal) {
  modal.addEventListener("mousedown", function (e) {
    if (e.target == modal || e.target.closest(".closeBtn")) modal.classList.remove("open");
  });
}

