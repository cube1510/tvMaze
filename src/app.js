import { mapListToDOMElements, createDOMElem } from './domInteractions.js'
import { getShowsByKey } from './requests.js'
class TvMaze {
    constructor(){
        this.viewElemens = {}
        this.showNameButtons = {}
        this.selectedName = "harry"
        this.initializeApp();
        this.fetchAndDisplayShows();
    }

    initializeApp = () => {
        this.connectDOMElements();
        this.setupListeners();
    }

    connectDOMElements = () => {
        const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
        const listOfShowNames = Array.from(document.querySelectorAll('[data-show-name]')).map(elem => elem.dataset.showName);
        
        this.viewElemens = mapListToDOMElements(listOfIds, 'id');
        this.showNameButtons = mapListToDOMElements(listOfShowNames, 'data-show-name');

        // console.log(this.viewElemens);
        // console.log(this.showNameButtons);
    }

    setupListeners = () => {
        Object.keys(this.showNameButtons).forEach(showName => {
            this.showNameButtons[showName].addEventListener('click', this.setCurrentNameFilter);
        })
    }

    setCurrentNameFilter = () => {
        this.selectedName = event.target.dataset.showName;
    }

    fetchAndDisplayShows = () => {
        getShowsByKey(this.selectedName).then(shows => this.renderCards(shows));
    }

    renderCards = (shows) => {
        for(const { show } of shows){
            this.createShowCard(show);
        }

    }

    createShowCard = (show) => {
        const divCard = createDOMElem('div', 'card');
        const img = createDOMElem('img', 'card-img-top', null, show.image.medium);
        const divCardBody = createDOMElem('div', 'card-body');
        const h5 = createDOMElem('h5', 'card-name', show.name);
        const p = createDOMElem('p', 'card-text', show.summary);
        const btn = createDOMElem('btn', 'btn btn-primary', 'show details');

        divCard.appendChild(divCardBody);
        divCardBody.appendChild(img);
        divCardBody.appendChild(h5);
        divCardBody.appendChild(p);
        divCardBody.appendChild(btn);

        this.viewElemens.showsWrapper.appendChild(divCard);
    }

}

document.addEventListener('DOMContentLoaded', new TvMaze());