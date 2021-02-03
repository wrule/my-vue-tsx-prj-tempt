
export class FormIn {
  public apiMethod: string;
  public apiPath: string;
  public rspJson: string;
  public reqJson: string;

  public constructor(form: any) {
    this.apiMethod = form.apiMethod;
    this.apiPath = form.apiPath;
    this.rspJson = form.rspJson;
    this.reqJson = form.reqJson;
  }
}
