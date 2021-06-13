export class UserModel {
  public id: string = '';
  public email: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public userFullName: string = '';
  public assignedById: string = '';
  public assignedByName: string = '';
  public isAdmin: boolean = false;
  public sex: string = '';
  public age: string = '';
  public createdDate: any;
  public assigned_Dtos: assignedModel[] = [];
}

class assignedModel {
  public toBeReviewedId: string = '';
  public toBeReviewedFullName: string = '';
}
