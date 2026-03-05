import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExcursionService } from '../../../core/services/excursion.service';
import { Excursion } from '../../../core/models/excursion.model';

@Component({
  selector: 'app-admin-excursions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './excursions.component.html',
  styleUrls: ['./excursions.component.scss']
})
export class AdminExcursionsComponent implements OnInit {
  excursions: Excursion[] = [];
  showForm = false;
  editingExcursion: Excursion | null = null;
  form: any = {};

  constructor(private excursionService: ExcursionService) {}

  ngOnInit(): void { this.loadExcursions(); }

  loadExcursions(): void {
    this.excursionService.getAll().subscribe(res => {
      if (res.success) this.excursions = res.data;
    });
  }

  resetForm(): void {
    this.editingExcursion = null;
    this.form = { name: '', description: '', type: 'PACKAGED', zone: '', duration: '',
      maxParticipants: 20, price: 0, imageUrl: '', highlights: '', lunchIncluded: false,
      guideIncluded: true, active: true };
  }

  editExcursion(e: Excursion): void {
    this.editingExcursion = e;
    this.form = { ...e, highlights: e.highlights?.join(', ') || '' };
    this.showForm = true;
  }

  saveExcursion(): void {
    const data = { ...this.form, highlights: this.form.highlights?.split(',').map((s: string) => s.trim()).filter((s: string) => s) || [] };
    const obs = this.editingExcursion
      ? this.excursionService.update(this.editingExcursion.id, data)
      : this.excursionService.create(data);
    obs.subscribe(() => { this.showForm = false; this.loadExcursions(); });
  }

  deleteExcursion(e: Excursion): void {
    if (confirm(`Supprimer "${e.name}" ?`)) {
      this.excursionService.delete(e.id).subscribe(() => this.loadExcursions());
    }
  }
}
