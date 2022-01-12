import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent {

  public statics:any[] = [];
  public courseCounts:any[] = [];
  public transactionPage:number = 1
  public totalTransactions:number = 0

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
    },
  };

  transactionSettings = {
    actions:{
      add: false,
      delete: false, 
      edit: false
    },
    pager: {
      display: false
    },
    columns: {
      userID: {
        title: 'Student',
        type: 'string',
        filter: false,
        valuePrepareFunction : (student) => {
          return student.name
        }
      },
      courseID: {
        title: 'Course',
        type: 'string',
        filter: false,
        valuePrepareFunction : (course) => {
          return course.course_title
        }
      },
      price: {
        title: 'Price',
        type: 'string',
        filter: false
      },
      instructorID: {
        title: 'Instructor',
        type: 'string',
        filter: false,
        valuePrepareFunction : (instructor) => {
          return instructor.name
        }
      },
      createdAt: {
        title: 'Date of purchase',
        type: 'number',
        filter: false,
        valuePrepareFunction : (date) =>{
          return new Date(date).toLocaleDateString()
        }
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  transactions: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private httpService: HttpService) {
    const data = this.service.getData();
    this.source.load(data);
  }

  ngOnInit(){
    this.getStatisticsCount();
    this.getCourseCounts();
    this.getTransactions()
  }

  getStatisticsCount = () => {
    this.httpService.getStatisticsCount().subscribe((res:any) => {
      this.statics = [
        {
          title: "Total Courses",
          value: res.msg.totalCourses
        },
        {
          title: "Total Therapists",
          value: res.msg.totalTherapist
        },
        {
          title: "Total Students",
          value: res.msg.totalUsers
        }
      ];
      
    })
  }

  getCourseCounts = () => {
    this.httpService.getCourseCount().subscribe((res:any) => {
      this.courseCounts = [
        {
          title: "Approved Courses",
          value: res.msg.totalApproved
        },
        {
          title: "Rejected courses",
          value: res.msg.totalrejected
        },
        {
          title: "Onhold courses",
          value: res.msg.totalOnhold
        }
      ];
      
    })
  }

  getTransactions = () => {
    this.httpService.getTransactions(this.transactionPage).subscribe((res:any) => {
      this.transactions.load(res.msg.courses)
      this.totalTransactions = res.msg.total
      console.log(res);
      
    })
  }

  onTransactionPageChange = (page:number) => {
    this.getTransactions()
  }
}
