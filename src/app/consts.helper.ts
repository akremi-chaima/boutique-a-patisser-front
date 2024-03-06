import { Injectable } from '@angular/core';

@Injectable()
export class ConstsHelper {
  static readonly ROLE_ADMINISTRATOR = 'administrator';
  static readonly ROLE_CUSTOMER = 'client';
  static readonly ERROR_OCCURRED_RETRY_MESSAGE = 'Oups, nous avons rencontré un petit souci... Nous vous invitons à ré-essayer plus tard.';
  static readonly emailPattern: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
}
