import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2'
import { SubCategoryService } from 'src/app/services/sub-category.service';
import { BlogService } from 'src/app/services/blog.service';
import { EditPostComponent } from 'src/app/modals/edit-post/edit-post.component';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss'],
})
export class ListPostComponent implements OnInit {

  modalRef: MdbModalRef<EditPostComponent>;

  displayedColumns: string[] = ['id','titlePost','imgPost','subCategory','categoryPost','creatorPost','dateEditPost','datePost','actions'];
  dataSource = new MatTableDataSource();
  isLoadingResults = true;
  isRateLimitReached = false;
  expandedElement:  | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  constructor(private postservices:BlogService, private modalService: MdbModalService) { }

  ngOnInit(): void {
    this.getPost();
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
        this.postservices.deletePost(data.id)
        this.getPost();
      }
    })
  }

  edit(data){
    this.modalRef = this.modalService.open(EditPostComponent,{
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
        this.getPost();
      }, 1500);
    });
  }

  getPost(){
    this.postservices.getPost().then(result=>{
      this.isLoadingResults = false;
      this.isRateLimitReached = result === null;
      this.dataSource.data = result;
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
