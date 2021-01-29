import CONFIG_CONSTANTS from '../../configuration/constants.config'
import { Host } from '../../models/host.model'
import AppListComponent from '../appList/appListComponent'

export default class HostCardComponent extends HTMLElement {
  host: Host
  constructor (host: Host) {
    super()
    this.host = host
  }

  private render (): string {
    const { name } = this.host
    return (`
      <article>
        <p class="host-card__title">${name}</p>
      </article>
    `)
  }

  public renderAppListWithinHostCard (appsQuantity?: number): void {
    const topAppsListByHost = Object.assign(this.host)
      .getAppsByTopRanked({ appsQuantity: CONFIG_CONSTANTS.MAX_TOP_APPS_BY_HOST_CARD || appsQuantity })

    const wrapperElement: HTMLElement | undefined = this.getElementsByTagName('article')[0]
    wrapperElement && wrapperElement.appendChild(<HTMLElement> new AppListComponent({
      applicationList: topAppsListByHost,
      hostName: this.host.name
    }))
  }

  private connectedCallback (): void {
    this.setAttribute('data-value', `host__${this.host.name.trim()}`)
    this.classList.add('host-card')
    this.innerHTML = this.render()
    this.renderAppListWithinHostCard()
  }
}

customElements.define('host-card', HostCardComponent)
