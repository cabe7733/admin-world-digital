import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CategoryService } from './../../services/category.service';
import Swal from 'sweetalert2'
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { EditCategoryComponent } from 'src/app/modals/edit-category/edit-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, AfterViewInit {

  modalRef: MdbModalRef<EditCategoryComponent>;

  displayedColumns: string[] = ['id','nameCategory','imgCategory','descCategory','dateCategory','dateCategoryEdit','actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel(true, []);
  checkboxData;
  isLoadingResults = true;
  isRateLimitReached = false;

  validationForm: FormGroup;

  constructor(private categoryServices:CategoryService, private modalService: MdbModalService) {}

  ngOnInit(): void {
    const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.validationForm = new FormGroup({
      nameCategory: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      imgCategory: new FormControl(null, [Validators.required, Validators.pattern(reg)]),
      descCategory: new FormControl(null, [Validators.required, Validators.minLength(14)]),
    });

    this.getCategoria();
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
    this.categoryServices.addCategory(data).then(result=>{
      this.getCategoria();
    });
    this.validationForm.reset();
  }

  getCategoria(){
    this.categoryServices.getCategory().then(result=>{
      this.isLoadingResults = false;
      this.isRateLimitReached = result === null;
      this.dataSource.data = result;
    })
  }

  edit(data){
      this.modalRef = this.modalService.open(EditCategoryComponent,{
        modalClass: 'modal-lg',
        data: {
          title: data.id,
          name: data.nameCategory,
          desc: data.descCategory,
          img: data.imgCategory
        }
      })
      this.modalRef.onClose.subscribe((message: any) => {
        setTimeout(()=>{
            this.getCategoria();
          }, 1000);
      });
  }

  delete(data){
    Swal.fire({
      title: 'Desea eliminar la categoria',
      text: data.nameCategory+' - '+data.id,
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminada',
          data.nameCategory+' - '+data.id,
          'success'
        )
        this.categoryServices.deleteCategory(data.id)
        this.getCategoria();
      }
    })
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
}
