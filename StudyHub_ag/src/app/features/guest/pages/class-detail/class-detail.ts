import { Component, OnInit } from '@angular/core';
import { CourseOverviewInfo } from '../../../../_shared/course-overview-info/course-overview-info';
import { ClassOverviewInfo } from '../../../../_shared/class-overview-info/class-overview-info';
import { CourseDetailInfo } from '../../../../_shared/course-detail-info/course-detail-info';
import { ActivatedRoute } from '@angular/router';
import { GuestClassService } from '../../service/guest-class/guest-class.service';
import { initData } from '../../../../../utils/init-data';
import { SpinnerComponent } from '../../../../_shared/spinner/spinner.component';

@Component({
  selector: 'app-class-detail',
  imports: [
    CourseOverviewInfo,
    ClassOverviewInfo,
    CourseDetailInfo,
    SpinnerComponent,
  ],
  templateUrl: './class-detail.html',
  styleUrl: './class-detail.css',
})
export class ClassDetail implements OnInit {
  class?: ClassDetailLiteResponse;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly classService: GuestClassService,
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.initDetailClass(slug);
  }

  initDetailClass(slug: string | null) {
    if (!slug) return;
    initData<ClassDetailLiteResponse>(
      this.classService.getDetail(slug),
      (data) => {
        console.log(data);
        this.class = data;
      },
    );
  }
}
