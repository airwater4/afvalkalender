const today = new Date();
const month = today.getMonth() + 1;
const monthString = month.toFixed(0).padStart(2, 0);
const monthCell = document.querySelector(`[data-month="${monthString}"]`);

if (monthCell) {
  for (let cell of monthCell.children) {
    if (isDateCell(cell)) {
      const day = Number(cell.innerText.trim());
      if (day === today.getDate()) {
        highlightToday(cell);
        scrollTop(cell);
        break;
      }
    }
  }
}

function isDateCell(htmlElement) {
  if (htmlElement && htmlElement.classList) {
    const classList = htmlElement.classList;
    const hasNoClasses = !classList.length;
    return (
      hasNoClasses ||
      classList.contains("gft") ||
      classList.contains("pmd") ||
      classList.contains("kerstbomen") ||
      classList.contains("paper")
    );
  }

  return false;
}

function scrollTop(htmlElement) {
  window.scrollTo({ top: htmlElement.offsetTop, behavior: "smooth" });
}

function highlightToday(htmlElement) {
  htmlElement.classList.add("today");
}
