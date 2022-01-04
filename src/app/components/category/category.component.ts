import { CategoryService } from './../../services/category.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AbstractControl, Form, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['select','id','nameCategory','imgCategory','descCategoty','dateCategory','editar','eliminar'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel(true, []);
  isLoadingResults = true;
  isRateLimitReached = false;

  validationForm: FormGroup;

  constructor(private categoryServices:CategoryService) {}

  ngOnInit(): void {
    const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.validationForm = new FormGroup({
      nameCategory: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      imgCategory: new FormControl(null, [Validators.required, Validators.pattern(reg)]),
      descCategory: new FormControl(null, [Validators.required, Validators.minLength(14)]),
    });
    this.categoryServices.dastaCategory().then(result=>{
      console.log(result);
      this.isLoadingResults = false;
      this.isRateLimitReached = result === null;
      this.dataSource.data = result;
    })
  }

  /* form */
  get nameCategory(): AbstractControl {
    return this.validationForm.get('nameCategory');
  }

  get imgCategory(): AbstractControl {
    return this.validationForm.get('imgCategory');
  }

  get descCategory(): AbstractControl {
    return this.validationForm.get('descCategory');
  }

  addCategory(value:FormGroup){
    const data = value.value;
    console.log(value.value);
    this.categoryServices.addCategory(data).then(result=>{
      console.log(result);
    });
    this.validationForm.reset();
    this.getCategoria();
  }

  getCategoria(){
    this.categoryServices.getCategory().then((resp) => {
      console.log(resp);
      this.dataSource.data = resp;
    });
  }

  /* DataTable */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
