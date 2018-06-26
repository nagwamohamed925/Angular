import { Component, OnInit, NgZone } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { CallapiService } from '../callapi.service';
import { ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { employee } from '../employee.module';
import { document } from '../document.module';
import { moderator } from '../moderator.module';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import 'rxjs/add/operator/takeWhile';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employees: employee[];
  documents: document[];
  moderators: moderator[];

  employeenumber:number;
  documentsnumber:number;
  moderatornumber:number;
  total:number;
  employeenumber1;
  documentsnumber1;
  moderatornumber1;
  interval: number;
  alive: boolean;
  ids:any=[];
  private onDestroy$ = new Subject<void>();
    public emailChartType: ChartType;
    public emailChartData: any;
    public emailChartLegendItems: LegendItem[];

    public hoursChartType: ChartType;
    public hoursChartData: any;
    public hoursChartOptions: any;
    public hoursChartResponsive: any[];
    public hoursChartLegendItems: LegendItem[];

    public activityChartType: ChartType;
    public activityChartData: any;
    public activityChartOptions: any;
    public activityChartResponsive: any[];
    public activityChartLegendItems: LegendItem[];

    custobservesubscrive:Subscription;
  constructor(private call:CallapiService, private cd: ChangeDetectorRef) {

   }


CallApi()
{
  this.call.getid().subscribe(
  result=>{ 
    this.ids=result;
    let index=0;
    for(let item of this.ids){
      this.emailChartData.labels[index]=item.id;
      this.emailChartData.series[index]=item.postId;
      this.hoursChartData.labels[index]=item.id;
      index++;
    }
    console.log (this.emailChartData);
    console.log (this.hoursChartData);
    this.cd.detectChanges();
    this.cd.markForCheck();
    console.log(this.cd)
  },err=>{

  },()=>{
    "Done";
  }

);
  }


CallemployeesApi()
{
  this.call.getemployees().subscribe(
  result=>{ 
    this.employees=result;
    this.employeenumber1=this.employees.length;

    console.log(this.cd);
    console.log(this.employees.length);
  this.cd.detectChanges();
  //  this.cd.markForCheck();
  },err=>{

  },()=>{
    "Done";
  }
);
}
CalldocumentsApi()
{
  this.call.getdocuments().subscribe(
  result=>{ 
    this.documents=result;
    this.documentsnumber1=this.documents.length;

    console.log(this.cd);
console.log(this.documents.length);
 this.cd.detectChanges();
//   this.cd.markForCheck();
  },err=>{

  },()=>{
    "Done";
  }
);
}
CallmoderatorsApi()
{
  this.call.getmoderators().subscribe(
  result=>{ 
 this.moderators=result;
  this.moderatornumber1=this.moderators.length;
    console.log(this.moderators);

    console.log(this.cd);
 
    console.log(this.moderators.length);
     this.cd.detectChanges();
  //  this.cd.markForCheck();
  },err=>{

  },()=>{
    "Done";
  }
);
}


callresult()
{

 this.CallemployeesApi();
 this.CalldocumentsApi();
 this.CallmoderatorsApi();

  this.total=this.employeenumber1+this.documentsnumber1+this.moderatornumber1;

  this.employeenumber=this.employeenumber1/this.total;
  this.documentsnumber=this.documentsnumber1/this.total;
  this.moderatornumber=this.moderatornumber1/this.total;
  this.emailChartData.labels=[Math.round(this.employeenumber * 100) / 100,Math.round(this.documentsnumber * 100) / 100,Math.round(this.moderatornumber * 100) / 100];
  this.emailChartData.series=[this.employeenumber*100,this.documentsnumber*100,this.moderatornumber*100];
  console.log(this.emailChartData);


}


ngOnDestroy(){
  this.alive = false; // switches your TimerObservable off
}

  ngOnInit() {

    this.emailChartType = ChartType.Pie;
    this.emailChartData = {
      labels: []
      ,
      series: []
    };
  

    setTimeout(() => {
      this.CallApi(); 
    }, 1000);

   this.cd.detach();
   
//    IntervalObservable.create(1000)
//       .takeUntil(this.onDestroy$)
//       .subscribe(() => {
//         this.CallApi(); 
//         this.cd.detectChanges();
//       });

//       const myobserve=Observable.create((observer:Observer<string>) =>
//       {
//         setTimeout(()=>{

// observer.next('ggg');

//         },1000);
        
//       });
//      this.custobservesubscrive= myobserve.subscribe((result:string)=>{this.CallApi();},
//       (error:string)=>{console.log(error);},
//       ()=>{console.log('complete');}
      
//       );
   
  
  
      this.emailChartLegendItems = [
        { title: 'Open', imageClass: 'fa fa-circle text-info' },
        { title: 'Bounce', imageClass: 'fa fa-circle text-danger' },
        { title: 'Unsubscribe', imageClass: 'fa fa-circle text-warning'}
      ];

      this.hoursChartType = ChartType.Line;
      this.hoursChartData = {
        labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
        series: [
          [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
          [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
          [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
        ]
      };
      this.hoursChartOptions = {
        low: 0,
        high: 800,
        showArea: true,
        height: '245px',
        axisX: {
          showGrid: false,
        },
        lineSmooth: Chartist.Interpolation.simple({
          divisor: 3
        }),
        showLine: false,
        showPoint: false,
      };
      this.hoursChartResponsive = [
        ['screen and (max-width: 640px)', {
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      this.hoursChartLegendItems = [
        { title: 'Open', imageClass: 'fa fa-circle text-info' },
        { title: 'Click', imageClass: 'fa fa-circle text-danger' },
        { title: 'Click Second Time', imageClass: 'fa fa-circle text-warning' }
      ];

      this.activityChartType = ChartType.Bar;
      this.activityChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
          [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
        ]
      };
      this.activityChartOptions = {
        seriesBarDistance: 10,
        axisX: {
          showGrid: false
        },
        height: '245px'
      };
      this.activityChartResponsive = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      this.activityChartLegendItems = [
        { title: 'Tesla Model S', imageClass: 'fa fa-circle text-info' },
        { title: 'BMW 5 Series', imageClass: 'fa fa-circle text-danger' }
      ];

    
    }

}
