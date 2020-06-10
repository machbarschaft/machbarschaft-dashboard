import {Pipe, PipeTransform} from '@angular/core';
import {ConstantsTranslatorService} from '../services/constants.translator.service';

@Pipe({ name: 'constantsTranslator' })
export class ConstantsTranslatorPipe implements PipeTransform {

  constructor(private constantsTranslatorService: ConstantsTranslatorService) {}

  transform(value: any, ...args): any {
    return this.constantsTranslatorService.getTranslationForKey(value);
  }

}
