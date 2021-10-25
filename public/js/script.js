const list = document.querySelectorAll(".navigation li")
const toggle = document.querySelector(".toggle")
const navigation = document.querySelector(".navigation")
const main = document.querySelector(".main")

function tightSidebar(){
    navigation.classList.toggle("tight")
    main.classList.toggle("extent")
}

function activeLink(){
    list.forEach((item) => {
        item.classList.remove('active')
        this.classList.add('active')
    })
}

toggle.addEventListener("click", tightSidebar)

list.forEach((item) => {
    item.addEventListener('click', activeLink)
})

