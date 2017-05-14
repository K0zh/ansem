import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ListPage } from '../list/list';
import { EtcPage } from '../etc/etc';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root:Component = HomePage;
  tab2Root:Component = ListPage;
  tab3Root:Component = EtcPage;

  constructor() {

  }
}
