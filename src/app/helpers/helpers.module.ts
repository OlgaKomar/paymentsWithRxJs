import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackByPropertyPipe } from './pipes/track-by-property.pipe';

@NgModule({
  declarations: [TrackByPropertyPipe],
  imports: [CommonModule],
  exports: [TrackByPropertyPipe],
})
export class HelpersModule {}
