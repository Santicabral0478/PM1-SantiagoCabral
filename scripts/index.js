// Clase Activity
class Activity {
    constructor(title, description, imgUrl) {
        this.id = Activity.getNextId();
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }

    static getNextId() {
        if (!Activity.counter) {
            Activity.counter = 1;
        } else {
            Activity.counter++;
        }
        return Activity.counter;
    }
}

// Clase Repository
class Repository {
    constructor() {
        this.activities = [];
    }

    getAllActivities() {
        return this.activities;
    }

    createActivity(title, description, imgUrl) {
        const newActivity = new Activity(title, description, imgUrl);
        this.activities.push(newActivity);
    }

    deleteActivity(id) {
        this.activities = this.activities.filter(activity => activity.id !== id);
    }
}

// Crear una instancia de la clase Repository
const activityRepository = new Repository();

function convertirActivityAElementoHTML(activity) {
    const { id, title, description, imgUrl } = activity;

    const actividadCard = document.createElement("div");
    actividadCard.className = "actividad-card";

    const elementosHTML = [
        { tag: "h3", content: title, className: "clase-css-titulo" },
        { tag: "p", content: description, className: "clase-css-descripcion" },
        { tag: "img", src: imgUrl, alt: title, className: "clase-css-imagen" }
    ];

    elementosHTML.forEach(elemento => {
        const el = document.createElement(elemento.tag);
        el.innerHTML = elemento.content || '';
        el.src = elemento.src || '';
        el.alt = elemento.alt || '';
        el.classList.add(elemento.className);
        actividadCard.appendChild(el);
    });

    actividadCard.classList.add("clase-css-actividad-card");

    return actividadCard;
}

function actualizarContenedorActividades() {
    const contenedorActividades = document.getElementById("actividades-container");
    const fragmento = document.createDocumentFragment();

    const listadoActividades = activityRepository.getAllActivities();
    const elementosHTML = listadoActividades.map(convertirActivityAElementoHTML);

    elementosHTML.forEach(elemento => fragmento.appendChild(elemento));
    contenedorActividades.innerHTML = '';
    contenedorActividades.appendChild(fragmento);
}

function handlerAgregarActividad() {
    const inputTitle = document.getElementById("titulo");
    const inputDescription = document.getElementById("descripcion");
    const inputImgUrl = document.getElementById("url-imagen");

    const title = inputTitle.value;
    const description = inputDescription.value;
    const imgUrl = inputImgUrl.value;

    if (!title || !description || !imgUrl) {
        alert("Completa todos los campos.");
        return;
    }

    activityRepository.createActivity(title, description, imgUrl);
    actualizarContenedorActividades();
}

const botonAgregarActividad = document.querySelector(".env-button");
botonAgregarActividad.addEventListener("click", handlerAgregarActividad);

function handlerEliminarActividad(id) {
    activityRepository.deleteActivity(id);
    actualizarContenedorActividades();
}
