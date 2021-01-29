import { Application } from '../../models/app.model'

/**
 * TODO: @christianjtr: Observe data changes in order to re-render the component when adding or removing host's apps...
 */

export default class ApplicationListComponent extends HTMLElement {
  applicationList: Array<Application>
  hostName: string
  constructor (payload: {applicationList: Array<Application>, hostName: string}) {
    super()
    this.applicationList = payload.applicationList
    this.hostName = payload.hostName
  }

  private addDOMEvents (): void {
    const applicationList: Array<Application> = this.applicationList
    const appLinks = document.querySelectorAll(`ul[data-value="host__${this.hostName}"] > li.app-list__item > a`)
    Array.from(appLinks).forEach(function (appLink, index) {
      appLink.addEventListener('click', function () {
        alert(applicationList[index].getReleaseVersion())
      }, false)
    })
  }

  private render (): string {
    return (`
      <ul class="app-list" data-value="host__${this.hostName}">
        ${this.applicationListItem()}
      </ul>
    `)
  }

  private applicationListItem (): string {
    const { hostName } = this
    const listItems: string = Object.assign(this.applicationList)
      .map(function (item: Application, index: number) {
        return (`
          <li class="app-list__item" data-value="host__${hostName}--app__${index}">
            <a 
              id="app-link__${index}" 
              title="Check release version">
                <span>${item.apdex}</span>
                <span>${item.name}</span>
            </a>
          </li>`)
      }).join('')

    return listItems
  }

  private connectedCallback (): void {
    this.setAttribute('data-value', `host-app-list__${this.hostName}`)
    this.innerHTML = this.render()
    this.addDOMEvents()
  }
}

customElements.define('application-list', ApplicationListComponent)
