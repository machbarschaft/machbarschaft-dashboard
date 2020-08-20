import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {BreakPointObserverService} from '../../../../style-lib/src/lib/services/break-point-observer.service';

@Component({
  selector: 'mbs-ad-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

  constructor(public breakPointObserverService: BreakPointObserverService) {}

}
