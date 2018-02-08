import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable()
export class MetaTagsCreator {
  constructor(private meta: Meta) {}

  initMetaTags(metaTags) {
    this.meta.addTags(metaTags);
  }
}
