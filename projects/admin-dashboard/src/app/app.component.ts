import {Component, OnInit} from '@angular/core';
import {SodiumCryptoService} from './shared/services/sodium-crypto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'admin-dashboard';

  constructor(private cryptoService: SodiumCryptoService) {}

  ngOnInit(): void {
    const hashed = this.cryptoService.hash('Telekom123');
    console.log('hashed', hashed);
  }

}
