$(".delbook").click(() => confirm('Really delete this book?'))

$(".delBookCollection").click(() => confirm('Really delete this book collection?'))

function renderCards() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('visible');
    }, index * 80); 
  });
}
renderCards();
