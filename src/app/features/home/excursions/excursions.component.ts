import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExcursionService } from '../../../core/services/excursion.service';
import { Excursion } from '../../../core/models/excursion.model';

@Component({
  selector: 'app-excursions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './excursions.component.html',
  styleUrls: ['./excursions.component.scss']
})
export class ExcursionsComponent implements OnInit {
  excursions: Excursion[] = [];

  constructor(private excursionService: ExcursionService) {}

  ngOnInit(): void {
    this.excursionService.getAll().subscribe(res => {
      if (res.success) this.excursions = res.data;
    });
  }
}
