import { Component } from '@angular/core';
import { Observable, interval, concat, merge } from 'rxjs';
import { skip, debounceTime, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="skipDebounceAndConcatValues()">Take, Skip, Merge, Debounce and Concat Values</button>
  `,
})
export class AppComponent {
  data$: Observable<number>;

  constructor() {
    this.data$ = interval(1000);
  }

  skipDebounceAndConcatValues(): void {
    const skipped$ = this.data$.pipe(skip(3),take(10)); 
     const debounced$ = skipped$.pipe(debounceTime(1100));

    concat(skipped$,debounced$).subscribe(
      value => {
        console.log(value);
      },
      error => {
        console.error(error);
      },
      () => {
        console.log('Completed');
      }
    );

    
    const merged$ = merge(debounced$, skipped$);
    concat(merged$).subscribe(
      value => {
        console.log(value);
      }
    );
  }
}
