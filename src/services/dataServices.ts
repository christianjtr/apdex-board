import data from '../data/host-app-data.json'
import CONFIG_CONSTANTS from '../configuration/constants.config'
import { Host, HostInterface } from '../models/host.model'
import { Application } from '../models/app.model'

export function _getHostData (): Array<HostInterface> {
  const preparedData: Array<HostInterface> = []
  const uniqueHostNames: string[] = Array.from(new Set(data
    .map(function (item) { return item.host })
    .reduce(function (accumulator, value) { return accumulator.concat(value) }, [])))

  uniqueHostNames.forEach(function (hostName) {
    preparedData.push(new Host({
      name: hostName,
      applicationList: data
        .filter(function (item) { return item.host.includes(hostName) })
        .map(function (item) {
          return new Application({
            _id: `application__${new Date().getTime()}__${Math.random()}`,
            ...item
          })
        })
    }))
  })
  return preparedData
}

export function _getTopAppsByHost (hostName: string, appsQuantity?: number): Array<Application> {
  const topAppsByHost = Object.assign(data)
    .filter(function (item: Application) { return item.host.includes(hostName) })
    .sort(function (a: Application, b: Application) { return b.apdex - a.apdex })
    .map(function (item: Application) { return new Application(item) })
    .slice(0, CONFIG_CONSTANTS.MAX_TOP_APPS_BY_HOST || appsQuantity)

  return topAppsByHost
}
