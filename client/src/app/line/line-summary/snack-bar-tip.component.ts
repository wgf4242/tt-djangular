import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
@Component({
  template: `
    <span class="example-pizza-party">
      {{data}}
    </span>
    `,
  styles: [`.example-pizza-party { color: hotpink; }`],
})
export class SnackBarTipComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data: any) {
  }
}
