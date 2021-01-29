import { Application, ApplicationInterface } from './app.model'

export interface HostInterface {
  _id: string
  name: string,
  applicationList: Array<ApplicationInterface>,
  getAppsByTopRanked (options: { appsQuantity: number }): Array<ApplicationInterface>,
}

export class Host implements HostInterface {
  _id: string
  name: string
  applicationList: Array<ApplicationInterface>
  constructor (host: {_id?:string, name: string, applicationList: Array<ApplicationInterface>}) {
    /**
     * TODO: @christianjtr: Implement an UUID Id like ::: The solution it's just for the assestment...
     */
    this._id = host._id || `host__${new Date().getTime()}__${Math.random()}`
    this.name = host.name
    this.applicationList = host.applicationList
  }

  public getAppsByTopRanked (options: { appsQuantity: number }): Array<ApplicationInterface> {
    const appsByTopRank = Object.assign(this.applicationList)
      .sort(function (a: Application, b: Application) { return b.apdex - a.apdex })
      .slice(0, options.appsQuantity)

    return appsByTopRank
  }
}
