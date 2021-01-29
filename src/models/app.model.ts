export interface ApplicationInterface {
  _id: string
  name: string,
  contributors: string[],
  version: number,
  apdex: number,
  host: string[],
  getReleaseVersion (): string,
  isDeployedOnHost (hostName: string): boolean
}

export class Application implements ApplicationInterface {
  _id: string
  name: string
  contributors: string[]
  version: number
  apdex: number
  host: string[]
  constructor (application: {
    _id: string,
    name: string,
    contributors: string[],
    version: number,
    apdex: number,
    host: string[] }) {
    /**
     * TODO: @christianjtr: Implement an UUID Id like ::: The solution it's just for the assestment...
     */
    this._id = application._id
    this.name = application.name
    this.contributors = application.contributors
    this.version = application.version
    this.apdex = application.apdex
    this.host = application.host
  }

  public getReleaseVersion (): string {
    return `Release version: ${this.version}`
  }

  public isDeployedOnHost (hostName: string): boolean {
    return this.host.includes(hostName)
  }
}
