const header = document.querySelector('.header')
window.addEventListener('scroll', fixNav)


function fixNav() {
    if(window.scrollY > header.offsetHeight + 150) {
        header.classList.add('active')
    } else {
        header.classList.remove('active')
    }
}


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('show')
        } else {
            entry.target.classList.remove('show')
        }
    })
})

const hiddenElements = document.querySelectorAll('.hidden')
hiddenElements.forEach((element) => observer.observe(element))


const panels = document.querySelectorAll('.panel')

panels.forEach(panel => {
  panel.addEventListener('click',() => {
    panel.classList.toggle('active')
  })
})

panels.forEach(panel => {
    panel.addEventListener('dblclick',() => {
      panel.classList.remove('active')
    })
  })


function removeActiveClasses() {
  panels.forEach(panel =>{
     panel.classList.remove('active')
    })
}

