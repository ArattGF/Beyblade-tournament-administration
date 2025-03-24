import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'array',
  standalone: true
})
export class ArrayPipe implements PipeTransform {
  transform(value: number): number[] {
    return Array(value).fill(0).map((_, i) => i + 1);
  }
}