import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../../shared-service.service';

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss']
})
export class TableComponentComponent implements OnInit {

  displayedColumns: string[] = ['name', 'weight', 'symbol'];
  dataSource: any;

  constructor(private sharedService: SharedServiceService) { }

  ngOnInit() {
    this.dataSource = this.sharedService.getLog()
  }

}
