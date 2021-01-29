import CONFIG_CONSTANTS from '../../configuration/constants.config'

export default class ContentComponent extends HTMLElement {
  private addDOMEvents (): void {
    const contentContainer = <HTMLElement>document.getElementById('host-container')
    const DOMEventsListeners = {
      toggleLayout () {
        const checkboxElement = <HTMLInputElement>document.getElementById('toggle-list-ctrl')
        const checkboxLabel = <HTMLLabelElement>document.getElementById('toggle-list-ctrl-label')
        checkboxElement.addEventListener('click', function (): void {
          const isChecked: boolean = checkboxElement.checked
          contentContainer.classList.toggle('host__container--list-mode')
          checkboxLabel.innerText = isChecked
            ? CONFIG_CONSTANTS.TOGGLE_CTRL_LABEL.SHOW_AS_AWESOME_GRID
            : CONFIG_CONSTANTS.TOGGLE_CTRL_LABEL.SHOW_AS_LIST
        })
      }
    }

    DOMEventsListeners.toggleLayout()
  }

  private render (): string {
    return `
    <div class="app__container">
        <div class="app__top-bar">
          <h1 class="app__top-bar title">Apps by Host</h1>
          <h2 class="app__top-bar subtitle">
            for user averylongemailaddress@companyname.com
          </h2>
          <div class="app__top-bar toggle-ctrl-wrapper">
            <input class="checkbox" id="toggle-list-ctrl" name="toggle-list-ctrl" type="checkbox" />
            <label for="toggle-list-ctrl" id="toggle-list-ctrl-label" name="toggle-list-ctrl-label">
              ${CONFIG_CONSTANTS.TOGGLE_CTRL_LABEL.SHOW_AS_LIST}
            </label>
          </div>
        </div>
        <div id="host-container" class="host__container host__container--grid-mode"></div>
      </div>
    `
  }

  private connectedCallback (): void {
    this.innerHTML = this.render()
    this.addDOMEvents()
  }
}

customElements.define('content-component', ContentComponent)
