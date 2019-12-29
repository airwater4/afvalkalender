const isDateCell = htmlElement => {
    if (htmlElement && htmlElement.classList) {
        const classList = htmlElement.classList

        return !classList.length ||
            classList.contains('gft') ||
            classList.contains('pmd') ||
            classList.contains('kerstbomen') ||
            classList.contains('paper')
    }

    return false
}

const scrollTop = htmlElement => {
    window.scrollTo({ top: htmlElement.offsetTop, behavior: 'smooth' })
}

const highlightToday = htmlElement => {
    htmlElement.classList.add('today')
}

const today = new Date()
const month = today.getMonth() + 1
const monthCell = document.querySelector(`[data-month="${month}"]`)

if (monthCell) {
    for (let cell of monthCell.children) {
        if (isDateCell(cell)) {
            const day = Number(cell.innerText.trim())
            if (day === today.getDate()) {
                highlightToday(cell)
                scrollTop(cell)
                break
            }
        }
    }
}
