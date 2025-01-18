const form = document.querySelector(".contacts__form");
const emailInput = document.querySelector(".contacts__form__input--email");
const emailError = document.querySelector(
  ".contacts__form__input-block--email .contacts__form__error"
);
const nameInput = document.querySelector(".contacts__form__input--text");
const nameError = document.querySelector(
  ".contacts__form__input-block--text .contacts__form__error"
);
const messageInput = document.querySelector(".contacts__form__input--textarea");
const messageInputError = document.querySelector(
  ".contacts__form__input-block--message .contacts__form__error"
);

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let isValid = true;

  if (!nameInput.value.trim()) {
    nameError.textContent = "Поле именя не может быть пустым.";
    isValid = false;
  } else if (nameInput.value.length < nameInput.minLength) {
    nameError.textContent = `Имя должно быть не короче ${nameInput.minLength} символов.`;
    isValid = false;
  } else {
    nameError.textContent = "";
  }
  if (!messageInput.value.trim()) {
    messageInputError.textContent = "Поле сообщение не может быть пустым.";
    isValid = false;
  } else {
    messageInputError.textContent = "";
  }

  if (!emailInput.value.trim()) {
    emailError.textContent = "Поле email не может быть пустым.";
    isValid = false;
  } else if (!emailInput.validity.valid) {
    emailError.textContent = "Введите корректный email.";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  if (!isValid) {
    return;
  } else {
    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value,
    };

    try {
      const response = await fetch(
        "https://678a62dadd587da7ac29f138.mockapi.io/api/form/test",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Форма успешно отправлена!");
        form.reset();
      } else {
        alert("Произошла ошибка при отправке формы. ");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Не удалось отправить форму.");
    }

    console.log("Форма успешно отправлена!");
  }
});
