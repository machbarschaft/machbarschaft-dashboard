import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class BreakPointObserverService implements OnDestroy {

  isMobile$: BehaviorSubject<boolean>;

  #states: { key: string, isMobile: boolean }[] = [
    {key: '"(max-width: 599.99px) and (orientation: portrait)":true', isMobile: true},
    {key: '"(max-width: 959.99px) and (orientation: landscape)":true', isMobile: true},
    {key: '"(min-width: 600px) and (max-width: 839.99px) and (orientation: portrait)":true', isMobile: true},
    {key: '"(min-width: 600px) and (max-width: 959.99px)":true', isMobile: true},
    {key: '"(min-width: 840px) and (orientation: portrait)":true', isMobile: true},
    {key: '"(min-width: 960px) and (max-width: 1279.99px)":true', isMobile: false},
    {key: '"(min-width: 960px) and (max-width: 1279.99px) and (orientation: landscape)":true', isMobile: false},
    {key: '"(min-width: 1280px) and (max-width: 1919.99px)":true', isMobile: false},
    {key: '"(min-width: 1280px) and (orientation: landscape)":true', isMobile: false}
  ];

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isMobile$ = new BehaviorSubject<boolean>(false);
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.Web])
      .subscribe((breakpointState: BreakpointState) => {
        const breakpoints = JSON.stringify(breakpointState.breakpoints);
        this.#states.forEach((state) => {
          if (breakpoints.indexOf(state.key) > -1) {
            this.isMobile$.next(state.isMobile);
          }
        });
      });
  }

  getIsMobile$(): Observable<boolean> {
    return this.isMobile$.asObservable();
  }

  ngOnDestroy(): void {
    this.isMobile$.complete();
  }

}
