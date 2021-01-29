import { _getHostData, _getTopAppsByHost } from '../services/dataServices'
import { Host } from '../models/host.model'
import { Application } from '../models/app.model'

/**
 * TODO: @christianjtr: Implement a fully store management system.
 */

const isHost = function (hosts: Array<Host>, hostId: string): boolean {
  return hosts.some(function (host) { return host._id === hostId })
}

/**
 * TODO: @christianjtr: It's just a pseudo-solution for the assestment.
 */

export interface StoreInterface {
  state: {
    hosts: Array<Host>,
    hosDataIsPrepared: boolean,
  },
  getHostData(): Array<Host>,
  getTopAppsByHost(hostName: string, appsQuantity?: number | undefined): Array<Application>,
  addAppToHosts(hostId: string, application: Application): void,
  removeAppFromHosts(appId: string, hostId: string): void
}

export function Store (): StoreInterface {
  return {
    state: {
      hosts: [],
      hosDataIsPrepared: false
    },
    getHostData: function (): Array<Host> {
      try {
        if (!this.state.hosDataIsPrepared) {
          const data = _getHostData()
          this.state.hosts = data
          this.state.hosDataIsPrepared = true
        }
        return this.state.hosts
      } catch (error) {
        console.error('Error: Host data could not be retrieved')
        throw new Error(error)
      }
    },
    getTopAppsByHost: _getTopAppsByHost,
    addAppToHosts: function (hostId: string, application: Application): void {
      const hosts: Array<Host> = Object.assign(this.state.hosts)
      if (isHost(hosts, hostId)) {
          hosts
            .find(function (host) { return host._id === hostId })?.applicationList
            .push(new Application(application))
      } else {
        throw new Error('Error: Host does not exist')
      }
      this.state.hosts = hosts
    },
    removeAppFromHosts: function (appId: string, hostId: string): void {
      const hosts: Array<Host> = Object.assign(this.state.hosts)
      if (isHost(hosts, hostId)) {
        const appIndexToBeRemoved: number | undefined = hosts
          .find(function (hostItem) { return hostItem._id === hostId })
            ?.applicationList.findIndex(function (applicationItem) { return applicationItem._id === appId })

        if (appIndexToBeRemoved && appIndexToBeRemoved !== -1) {
            hosts.find(function (hostItem) { return hostItem._id === hostId })?.applicationList.splice(appIndexToBeRemoved, 1)
            this.state.hosts = hosts
        } else {
          throw new Error(`Error: Application does not exist for host ${hostId}`)
        }
      } else {
        throw new Error('Error: Host does not exist')
      }
    }
  }
}
