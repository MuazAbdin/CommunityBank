export class HTTPError extends Error {
  status: number;
  statusText: string;
  data?: string;
  response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.status = response.status;
    this.statusText = response.statusText;
    // this.data = response.data ?? "";
    this.response = response;

    Object.setPrototypeOf(this, HTTPError.prototype);
  }

  async setMessage() {
    const { msg } = await this.response.json();
    this.message = msg;
  }
}
