const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / (60 * 60))
  const minutes = Math.floor((seconds - hours * (60 * 60)) / 60)
  return hours.toString().padStart(2, '0') + ':' +
    minutes.toString().padStart(2, '0') + ':' +
    Math.floor(seconds % 60).toString().padStart(2, '0')
}

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  //Я БЫ СДЕЛАЛ ЗАМЫКАНИЕМ ДОБАВИВ secondsPassed перед return НО
  //при повторном нажатии start без обновления страницы таймер перестает
  //работать из-за того что secondsPassed изменен а функция в которой
  //я пишу комментарий уже создана
  return (seconds) => {
    let secondsPassed = 0
    timerEl.innerText = formatTime(seconds)
    let timerId = setInterval(() => {
      secondsPassed++
      timerEl.innerText = formatTime(seconds - secondsPassed)
      secondsPassed === seconds && clearInterval(timerId)
    }, 1000)
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  e.target.value = e.target.value.split('').filter(letter =>
    letter.match(/[0-9]/)).join('')
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
