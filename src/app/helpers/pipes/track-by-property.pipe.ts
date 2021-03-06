import { Pipe, PipeTransform } from '@angular/core';

interface TrackByFunctionCache {
  [propertyName: string]: <T>(index: number, item: T) => any;
}

// Since the resultant TrackBy functions are based purely on a static property name, we
// can cache these Functions across the entire app. No need to generate more than one
// Function for the same property.
// link to source [ https://www.bennadel.com/blog/3579-using-pure-pipes-to-generate-ngfor-trackby-identity-functions-in-angular-7-2-7.htm ]
const cache: TrackByFunctionCache = Object.create(null);

@Pipe({
  name: 'trackByProperty',
})
export class TrackByPropertyPipe implements PipeTransform {
  // I return a TrackBy function that plucks the given property from the ngFor item.
  public transform(propertyName: string) {
    // Ensure cached function exists.
    if (!cache[propertyName]) {
      cache[propertyName] = function trackByProperty<T>(
        index: number,
        item: T
      ): any {
        return item[propertyName];
      };
    }
    return cache[propertyName];
  }
}
