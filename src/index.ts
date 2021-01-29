import './styles/style.css'
import { App } from './app'
import { Store } from './store/store'

(function (): void {
  const element = <HTMLElement> document.getElementById('app')
  const app = new App({ renderElement: element, $store: Store })
  app.init()
})()
