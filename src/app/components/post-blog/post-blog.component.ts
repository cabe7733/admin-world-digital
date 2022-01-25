import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2'
import { BlogService } from 'src/app/services/blog.service';
import { EditPostComponent } from 'src/app/modals/edit-post/edit-post.component';
import { CreatePostComponent } from 'src/app/modals/create-post/create-post.component';
@Component({
  selector: 'app-post-blog',
  templateUrl: './post-blog.component.html',
  styleUrls: ['./post-blog.component.scss']
})
export class PostBlogComponent implements OnInit {

  ckeditorContent: string;
  validationForm: FormGroup;

  modalRef: MdbModalRef<EditPostComponent>;

  displayedColumns: string[] = ['id','titlePost','imgPost','subCategory','categoryPost','creatorPost','dateEditPost','datePost','actions'];
  dataSource = new MatTableDataSource();
  isLoadingResults = true;
  isRateLimitReached = false;
  expandedElement:  | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private postservices:BlogService, private modalService: MdbModalService) {}

  ngOnInit(): void {
    this.getPost();
  }

  createPost(){
    this.modalRef = this.modalService.open(CreatePostComponent,{
      modalClass: 'modal-xl',
    })
    this.modalRef.onClose.subscribe((message: any) => {
      setTimeout(()=>{
        this.getPost();
      }, 1000);
    });
  }

  delete(data){
    Swal.fire({
      title: 'Desea eliminar la sub-categoria',
      text: data.titlePost+' - '+data.id,
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminada',
          data.titlePost+' - '+data.id,
          'success'
        )
        this.postservices.deletePost(data.id)
        this.getPost();
      }
    })
  }

  edit(data){
    this.modalRef = this.modalService.open(EditPostComponent,{
      modalClass: 'modal-xl',
      data: {
        data:data
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
