import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'ngx-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  public therapists:any;
  public page:number  = 1
  public collectionSize:number = 0

  settings = {
    actions: {
      add: false,
      delete: false,
      edit: false,
      custom: [
        { name: "approve", title: '<i class="fas fa-check-circle text-success mr-5"></i>'},
        { name: "deny", title: '<i class="fas fa-times-circle text-danger ml-5"></i>'}
      ],
    },
    pager:{
      display: false
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string',
        filter: false
      },
      email: {
        title: 'Email',
        type: 'string',
        filter: false,
        valuePrepareFunction : (email) => {
          return email ? email : "No email"
        }
      },
      phone: {
        title: 'Mobile',
        type: 'string',
        filter: false,
        valuePrepareFunction: (phone) => {
          return phone ? phone : "No phone"
        }
      },
      created_at: {
        title: 'Date',
        type: 'string',
        filter: false,
        valuePrepareFunction: (date) =>{
          return new Date(date).toLocaleDateString()
        }
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private httpService: HttpService, private toastr: NbToastrService) {

  }


  ngOnInit() {
    this.getCourses()
  }

  getCourses = () => {
    this.httpService.getCourses(this.page).subscribe((res:any) => {
      if(res.status === "ok"){
        console.log(res);
        
        this.collectionSize = res.msg.total
        this.source.load(res.msg.courses)
        
      }
    })
  }

  onPageChange = (page:any) => {
    this.getCourses()
  }

  onCustomAction = (event:any) => {
    console.log(event.action);
    let confirm = window.confirm("Are you sure to change therapist status?")
    if(confirm){
      switch(event.action){
        case "approve":
          this.httpService.approveCourses(event.data._id).subscribe((res:any) => {
            this.getCourses()
            this.toastr.success(res.msg,"Message")
          })
          break;
        case "deny":
  
          break;
        default:
          break;
      }   
    }else{
      this.toastr.danger("Operation Cancelled","Cancellation")
    }
  }

}
