import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2'
import { SubCategoryService } from 'src/app/services/sub-category.service';
import { EditSubCategoryComponent } from 'src/app/modals/edit-sub-category/edit-sub-category.component';


@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit, AfterViewInit {

  modalRef: MdbModalRef<EditSubCategoryComponent>;
  displayedColumns: string[] = ['id','nameSubCategory','nameCategorySubCategory','imgSubCategory','dateSubCategory','dateSubCategoryEdit','descSubCategory','actions'];
  dataSource = new MatTableDataSource();
  isLoadingResults = true;
  isRateLimitReached = false;
  expandedElement:  | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  namecategory;
  category;
  validationForm: FormGroup;

  constructor(private subCategoryService:SubCategoryService,  private modalService: MdbModalService) { }

  ngOnInit(): void {
    const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.validationForm = new FormGroup({
      Name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      descSubcategory: new FormControl(null, [Validators.required, Validators.minLength(44)]),
      imgSubcategory: new FormControl(null, [Validators.required, Validators.pattern(reg)]),
      categorySubcategory: new FormControl(null, [Validators.required]),
    });
    this.getcategory();
    this.getSubCategory();
  }

  get Name(): AbstractControl {
    return this.validationForm.get('Name');
  }

  get descSubcategory(): AbstractControl {
    return this.validationForm.get('descSubcategory');
  }

  get imgSubcategory(): AbstractControl {
    return this.validationForm.get('imgSubcategory');
  }

  get categorySubcategory(): AbstractControl {
    return this.validationForm.get('categorySubcategory');
  }

  addSubCategory(value:FormGroup){
    this.subCategoryService.addSubCategory(value.value).then(result=>{
      this.getSubCategory();
    })
    value.reset();
  }

  getSubCategory(){
    this.subCategoryService.getSubCategory().then(result=>{
      this.isLoadingResults = false;
      this.isRateLimitReached = result === null;
      this.dataSource.data = result;
    });
  }

  getcategory(){
    this.subCategoryService.getCategory().then(result=>{
      this.category = result;
    });
  }

  edit(data){
    this.modalRef = this.modalService.open(EditSubCategoryComponent,{
      modalClass: 'modal-lg',
      data: {
        title:data.id,
        desc:data.descSubCategory,
        img:data.imgSubCategory,
        namecat:data.nameCategorySubCategory,
        idnamecat:data.idCategorySubCategory,
        namesubcat:data.nameSubCategory,
      }
    })
    this.modalRef.onClose.subscribe((message: any) => {
      setTimeout(()=>{
        this.getSubCategory();
      }, 1500);
    });
  }

  delete(data){
    Swal.fire({
      title: 'Desea eliminar la sub-categoria',
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
        this.subCategoryService.deleteSubCategory(data.id)
        this.getSubCategory();
      }
    })
  }

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
