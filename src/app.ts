import { Host } from './models/host.model'
import { StoreInterface } from './store/store'
import ContentComponent from './components/layout/contentComponent'
import HostCardComponent from './components/hostCard/hostCardComponent'

export class App {
  renderElement: HTMLElement
  $store: StoreInterface
  constructor (payload: {renderElement: HTMLElement, $store(): StoreInterface}) {
    this.renderElement = payload.renderElement
    this.$store = payload.$store()
  }

  private render (): void {
    try {
      const data = this.$store.getHostData()
      const contentContainer = <HTMLElement> document.getElementById('host-container')
      data.forEach(function (item: Host) {
        const hostCardComponent = <HTMLElement> new HostCardComponent(item)
        contentContainer.appendChild(hostCardComponent)
      })
    } catch (error) {
      console.error('Error: App could not be rendered.')
      throw new Error(error)
    }
  }

  public init (): void {
    const contentComponent = new ContentComponent()
    if (this.renderElement) {
      this.renderElement.appendChild(contentComponent)
      this.render()
    }
  }
}
